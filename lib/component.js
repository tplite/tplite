/**
 * copyright @Lloyd Zhou(lloydzhou@qq.com)
 */
(function(exports){

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
              bind: function(name, cb){
                eventOrComponent[name] = cb
                return 'tplite.Event(event, ' + name + ', ' + index + ')'
              },
              remove: function(){
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
    exports.Component = function(tmpl, callbacks, state, root){
        var index = ++count;
        var isMount = false;
        var template = new exports.Template();
        var compile = template(tmpl);
        var componet = {
          state: state, render: render, mount: mount, setState: setState, trigger: trigger, root: root, _index: index,
        };
        var e = exports.Event(componet);
        function trigger (name){
          var args = [].slice.call(arguments, 1)
          return !callbacks[name] || callfunction(callbacks[name], componet, args)
        }
        function setState (newState){
          componet.state = state = Object.assign({}, state||{}, newState||{});
          if (root && state && trigger('shouldUpdate')){
            e.remove();
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
          compile(state, out);
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
        setState({
          bind: function(name) {
            var args = [].slice.call(arguments, 1)
            return e.bind(++count, function(e){
              return callfunction(callbacks[name], componet, args.concat(e))
            })
          }
        })
        trigger('onInit')
        return componet;
    }

}(typeof exports === 'undefined' ? this.tplite || (this.tplite = {}) : exports));

