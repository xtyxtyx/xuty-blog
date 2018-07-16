const Metalsmith  = require('metalsmith');
const markdown    = require('metalsmith-markdown');
const layouts     = require('metalsmith-layouts');
const pug         = require('metalsmith-in-place');
const permalinks  = require('metalsmith-permalinks');
const debug       = require('metalsmith-debug');
const collections = require('metalsmith-collections');
const autotoc     = require('metalsmith-autotoc');
const drafts      = require('metalsmith-drafts');
const conv_time   = require('./plugin/conv_time');

Metalsmith(__dirname)

  .metadata({
    meta_title: "xuty的博客 ﾉ(=ﾟωﾟ)ﾉ",
    meta_subtitle: "xuty's blog",
    description: "It's about saying »Hello« to the World.",
    generator: "Metalsmith",
    url: "http://www.metalsmith.io/"
  })

  .source('./src')
  .destination('./build')

  .clean(true)

  // draft: true
  .use(drafts())

  // conv string -> Date() obj
  .use(conv_time())

  // markdown -> html
  .use(markdown())

  // gen toc for html
  .use(autotoc({selector: 'h2, h3, h4'}))
  
  // '.md': {} -> '.md': {collections: 'posts'}
  .use(collections({
    posts: {
      pattern: 'posts/*.html',
      sortBy: 'date',
      reverse: true
    }
  }))

  // 'relative_to_sourcepath/my-file.html' -> 
  // 'relative_to_sourcepath/my-file/index.html'
  .use(permalinks())

  // render template
  .use(pug())
  
  // layout: layout.pug
  .use(layouts({
    engine: 'pug'
  }))

  // DEBUG=metalsmith:* node index.js
  .use(debug())

  // Persona!!!
  .build(function(err, files) {
    if (err) { throw err; }
  });
