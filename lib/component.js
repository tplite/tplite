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
    exports.Component = function(compile, methods, state, root){
      if (!(compile instanceof Function)){
        var template = new exports.Template();
        compile = template(compile);
      }
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
        function traverse(node, cb){
          if (node.nodeType === 1) {
            for (var attr in node) {
              if (attr.substr(0, 2) == 'on'){
                const eventName = attr.substr(2)
                const value = node.getAttribute(attr)
                const params = typeof(value) == 'string' ? value.match(/(\d+), (\d+)/) : null
                const func = function(event){
                  return exports.Event(event, params[1], params[2])
                }
                if (node.addEventListener) {
                  node.addEventListener(eventName, func, false);
                } else if (el.attachEvent)  {
                  node.attachEvent(attr, func);
                }
                node.removeAttribute(attr)
              }
            }
            if (node.hasChildNodes()) {
              for (var n of node.childNodes){
                traverse(n)
              }
            }
          }
        }
        function render (){
          var out = new exports.StringBuffer()
          compile(assign({self: componet}, state, wrapEvents), out);
          if (root){
            root.innerHTML = out.toString();
            return traverse(root)
          }
          return out.toString()
        }
        function mount (to){
          root = to
          return setState()
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

