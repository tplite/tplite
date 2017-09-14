/**
 * copyright @Lloyd Zhou(lloydzhou@qq.com)
 */
(function(exports){

    var currentHash,
      pops = $.observable({}),
      listen = window.addEventListener,
      doc = document, callback;

    function pop(hash) {
      hash = hash.type ? location.hash : hash;
      if (hash != currentHash) {
        if (callback instanceof Function) {
          callback(hash)
        }
      }
      currentHash = hash;
    }

    if (listen) {
      listen("popstate", pop, false);
      doc.addEventListener("DOMContentLoaded", pop, false);
    } else {
      doc.attachEvent("onreadystatechange", function() {
        if (doc.readyState === "complete") pop("");
      });
    }

    exports.Router = function(to){
      if (typeof to === "function") {
        return callback = to;
      }
      if (history.pushState) {
        history.pushState(0, 0, to);
      }
      pop(to)
    }

}(typeof exports === 'undefined' ? this.tplite || (this.tplite = {}) : exports));

