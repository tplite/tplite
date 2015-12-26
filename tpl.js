/**
 * copyright @Lloyd Zhou(lloydzhou@qq.com)
 */
;(function (window) {
    var FN = {}, replace_templae = {"\\": "\\\\", "\n": "\\n", "\r": "\\r",
        "{{": "');o.push(", "}}": ");o.push('", "{%": "');", "%}": "\no.push('"}

    window.render = function(tmpl, data) {
        FN[tmpl = tmpl || ''] = FN[tmpl] || new Function("_", "var o=[];with(_){" +
            ("%}" + tmpl + "{%").replace(/([\\\n\r]|{{|}}|{%|%})/g, function(tag) {
              return replace_templae[tag]
            }) + "}return o.join('')")

        try{ return data ? FN[tmpl](data) : FN[tmpl];}catch(e){ return e; }
    };
})(window)
