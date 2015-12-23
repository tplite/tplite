/**
 * copyright @Lloyd Zhou(lloydzhou@qq.com)
 */
;(function (window) {
    var FN = {},t = {"\\": "\\\\", "\n": "\\n", "\r": "\\r", "'": "\\'"},
        r = {'&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;'};
    var escape = function(s) {
        return (s+'').replace(/[&\"<>]/g, function(c) {return r[c];});
    }
    
    window.render = function(tpl, data) {
        tpl = tpl || '';
        FN[tpl] = FN[tpl] || new Function("_", "e", "with(_){return '" + 
            tpl.replace(/[\\\n\r']/g, function(c) {return t[c];}).replace(/{([\@\/\-\?\!\&]?)([^}]+)}/g, function(_, c, p){
                switch(c) {
                    case '@': // {@index, message in messages}
                        var a = p.replace(/(in|,)/g, ' ').trim().split(/\s+/);
                        if (a.length == 2) a.unshift('_')
                        return "' + " + a[2] + ".map(function(" + a[1] + "," + a[0] + "){ return '";
                    case '?': return "' + [" + p + "].map(function(" + p + "){ return !" + p + " ? '' : '";
                    case '!': return "' + [" + p + "].map(function(" + p + "){ return  "+ p + " ? '' : '";
                    case '/': return "'}).join('') + '";
                    case '&': return "' + " + p + " + '";
                    default: return "' + e(" + p + ") + '";
                }
            }) + "'}")
        try{ return data ? FN[tpl](data, escape) : FN[tpl];}catch(e){ return e.toString(); }
    };
})(window)
