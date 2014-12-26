define(function(require,exports,module){

  var dom = require("./dom");

  function event(){};

  event.on = function(node,eventType,handler,scope){
    node = typeof node === "string" ? dom.query(node) : node;
    scope = scope || node;
    if(window.event){
      node.attachEvent("on"+eventType,function(){
        handler.apply(scope,arguments);
      });
    }else{
      node.addEventListener(eventType,function(){
        handler.apply(scope,arguments);
      });
    }
  };

  event.stopPropagation = function(e){
    e = window.event || e;
    if(window.event){
      e.cancelBubble = true;
    }else{
      e.stopPropagation();
    }
  };

  event.getEventTarget = function(e){
    e = window.event || e;
    return e.srcElement || e.target;
  };

  return event;

});