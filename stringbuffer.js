/**
 * copyright @Lloyd Zhou(lloydzhou@qq.com)
 */
(function(exports){

    exports.StringBuffer = function(){
        var data = [], callback = function(s){data.push(s)};
        callback.toString = function(){return data.join('')}
        return callback
    }

}(typeof exports === 'undefined' ? this.tplite || (this.tplite = {}) : exports));
