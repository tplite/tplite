/**
 * copyright @Lloyd Zhou(lloydzhou@qq.com)
 */
(function(exports){

    var unshift = [].unshift, slice = [].slice, assign = Object.assign;
    function callfunction(func, context, args){
      return func instanceof Function && func.apply(context, args)
    }
    var events = {}
    exports.Event = function(eventOrComponent, name, index){
      if(eventOrComponent instanceof Event){
        var componet = events[index]
        return componet && callfunction(componet[name], componet, [eventOrComponent])
      }else{
        index = eventOrComponent._index
        if(index){
          events[index] = eventOrComponent
          return {
            on: function(name, cb){
              eventOrComponent[name] = cb
              return 'tplite.Event(event, ' + name + ', ' + index + ')'
            },
            off: function(){
              Object.keys(eventOrComponent).map(function(n){
                if (n > 0){
                  delete eventOrComponent[n];
                }
              })
            }
          }
        }
      }
    }
    var count = 0;
    exports.Component = function(tmpl, methods, state, root){
      var template = new exports.Template();
      var compile = template(tmpl);
      function construct (state, root){
        var index = ++count;
        function bind (name) {
          var args = slice.call(arguments, 1)
          return e.on(++count, function(e){
            return callfunction(methods[name], componet, args.concat(e))
          })
        }
        function trigger (name){
          var args = slice.call(arguments, 1)
          return !methods[name] || callfunction(methods[name], componet, args)
        }
        function setState (newState){
          componet.state = state = assign({}, state, newState);
          if (root && state && trigger('shouldUpdate')){
            e.off();
            render();
            requestAnimationFrame(function(){
              trigger('onUpdate')
              if (!isMount){
                trigger('onMount')
                isMount = true
              }
            })
          }
          return componet;
        }
        function render (){
          var out = new exports.StringBuffer()
          compile(assign({self: componet}, state, wrapEvents), out);
          if (root){
            return root.innerHTML = out.toString();
          }
          return out.toString()
        }
        function mount (to){
          root = to
          setState()
          return componet;
        }
        var isMount = false;
        var componet = {
          state: state, render: render, toString: render, mount: mount, setState: setState, trigger: trigger, root: root, _index: index,
        };
        var e = exports.Event(componet);
        var wrapEvents = Object.keys(methods).reduce(function(res, methodName){
          res[methodName] = function() {
            unshift.call(arguments, methodName)
            return bind.apply(componet, arguments)
          }
          return res
        }, {bind: bind})
        trigger('onInit')
        return mount(root);
      }
      return state ? construct(state, root) : construct;
    }

}(typeof exports === 'undefined' ? this.tplite || (this.tplite = {}) : exports));

