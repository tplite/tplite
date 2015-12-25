/**
 * copyright @Lloyd Zhou(lloydzhou@qq.com)
 */
;(function (window) {
    var FN = {}, t = {"\\": "\\\\", "\n": "\\n", "\r": "\\r",
        "{{": "');o.push(", "}}": ");o.push('", "{%": "'); ", "%}": "\no.push('"}
    window.render = function(tmpl, data) {
        FN[tpl = tmpl || ''] = FN[tpl] || new Function("_", "var o = [];with(_){ \no.push('" + 
            tmpl.replace(/([\\\n\r]|{{|}}|{%|%})/g, function(c) {return t[c]}) + "');} return o.join('')")
        try{ return data ? FN[tmpl](data) : FN[tmpl];}catch(e){ return e.toString(); }
    };
})(window)
