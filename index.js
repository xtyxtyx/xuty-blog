const Metalsmith  = require('metalsmith');
const markdown    = require('metalsmith-markdown');
const layouts     = require('metalsmith-layouts');
const pug         = require('metalsmith-in-place');
const permalinks  = require('metalsmith-permalinks');
const debug       = require('metalsmith-debug');
const collections = require('metalsmith-collections');
const drafts      = require('metalsmith-drafts');

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

  // markdown -> html
  .use(markdown())

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
