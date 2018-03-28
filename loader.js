var t = require('./lib/tpl');

var template = new t.Template();

module.exports = function(content) {
  var compile = template(content);
	return "module.exports = " + compile.toString().replace('anonymous', '') + ";\n";
}
