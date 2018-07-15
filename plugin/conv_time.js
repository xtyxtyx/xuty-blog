
/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin to hide drafts from the output.
 *
 * @return {Function}
 */

function plugin(){
  return function(files, metalsmith, done){
    setImmediate(done);
    Object.keys(files).forEach(function(file){
      const data = files[file];

      if (typeof(data.date) == 'string') {
        data.date = new Date(data.date);
      }
    });
  };
}