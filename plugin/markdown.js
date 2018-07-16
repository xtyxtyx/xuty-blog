// Based on: https://github.com/segmentio/metalsmith-markdown/tree/master/lib
// Using:    https://github.com/markdown-it/markdown-it
// With      https://www.npmjs.com/package/markdown-it-anchor
// Adding:   https://github.com/knsv/mermaid


const basename = require('path').basename;
const debug = require('debug')('metalsmith-markdown');
const dirname = require('path').dirname;
const extname = require('path').extname;
const hljs = require('highlight.js');
const mdit = require('markdown-it');
const mdit_anchor = require('markdown-it-anchor');
/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin to convert markdown files.
 *
 * @param {Object} options (optional)
 *   @property {Array} keys
 * @return {Function}
 */

function plugin(options){
    options = options || {};

    options.highlight = function (str, lang) {
        if (!lang) return;

        if (lang === 'graph') {
            return '<pre class="graph"><div class="mermaid">' + str + '</div></pre>';
        }
        
        if (lang === 'graph-center') {
            return '<pre class="graph"><div class="mermaid" align="center">' + str + '</div></pre>';
        }

        if (hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (__) {}
        }

        return ''; // use external default escaping
    }

    const md = mdit(options)
        .use(mdit_anchor, {});

    // var keys = options.keys || [];

    return function(files, metalsmith, done){
        setImmediate(done);
        Object.keys(files).forEach(function(file){
            debug('checking file: %s', file);
            if (!markdown(file)) return;
            var data = files[file];
            var dir = dirname(file);
            var html = basename(file, extname(file)) + '.html';
            if ('.' != dir) html = dir + '/' + html;

            debug('converting file: %s', file);
            var str = md.render(data.contents.toString(), options);
            data.contents = new Buffer(str);
            // keys.forEach(function(key) {
            //     data[key] = marked(data[key], options);
            // });

            delete files[file];
            files[html] = data;
        });
    };
}

/**
 * Check if a `file` is markdown.
 *
 * @param {String} file
 * @return {Boolean}
 */

function markdown(file){
  return /\.md|\.markdown/.test(extname(file));
}