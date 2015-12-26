var StringBuffer = function(){
    var data = [], callback = function(s){data.push(s)};
    callback.toString = function(){return data.join('')}
    return callback
}
