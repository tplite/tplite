/**
 * copyright @Lloyd Zhou(lloydzhou@qq.com)
 */
(function(exports){

    var i = 0;
    exports.Component = function(root, tmpl, state, callbacks){
        var index = ++i;
        var template = new tplite.Template();
        var compile = template(tmpl);
        var componet = {
          state: state, render: render, setState: setState, trigger: trigger, root: root, index: index,
        };
        function trigger (name){
          var args = [].slice.call(arguments, 1)
          return !callbacks[name] || (typeof callbacks[name] == 'function' && callbacks[name].apply(componet, args))
        }
        function setState (newState){
          state = Object.assign({}, state||{}, newState||{});
          if (trigger('shouldUpdate')){
            Object.keys(exports).filter(function(n){return n.indexOf('_' + index + '_') != -1}).map(function(n){delete exports[n]});
            render();
            requestAnimationFrame(function(){
              trigger('onUpdate')
            })
          }
          return state;
        }
        function render (){
          var out = new tplite.StringBuffer()
          compile(state, out);
          if (root){
            return root.innerHTML = out.toString();
          }
          return out.toString()
        }
        setState({
          bind: function(name) {
            var cbname = Math.random().toString().replace('0.', '_' + index + '_')
            var args = [].slice.call(arguments, 1)
            exports[cbname] = function(e){
              return typeof callbacks[name] == 'function' && callbacks[name].apply(componet, args.concat(e))
            }
            return 'tplite.' + cbname + '(event)'
          }
        })
        trigger('onInit')
        return componet;
    }

}(typeof exports === 'undefined' ? this.tplite || (this.tplite = {}) : exports));

