/**
 * copyright @Lloyd Zhou(lloydzhou@qq.com)
 */
(function(exports){

    exports.Template = function(){
        var FN = {}, replace_templae = {"\\": "\\\\", "\n": "\\n", "\r": "\\r",
            "{{": "');cb(", "}}": ");cb('", "{%": "');", "%}": "\ncb('"}

        return function(tmpl, data, cb) {
            FN[tmpl = tmpl || ''] = FN[tmpl] || new Function("_", "cb", "with(_){" +
                ("%}" + tmpl + "{%").replace(/([\\\n\r]|{{|}}|{%|%})/g, function(tag) {
                  return replace_templae[tag]
                }) + "}return cb")

            try{
                return data ? FN[tmpl](data, cb) : FN[tmpl];
            }catch(e){
                return e;
            }
        };
    }

    exports.StringBuffer = function(){
        var data = [], callback = function(s){data.push(s)};
        callback.toString = function(){return data.join('')}
        return callback
    }

}(typeof exports === 'undefined' ? this.tplite || (this.tplite = {}) : exports));
