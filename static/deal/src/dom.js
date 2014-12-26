define(function(require,exports,module){

  function dom(){};

  /*** @param selector {String} 传入的CSS选择器。
   * * @return {Array}
   * */
  dom.query = function(selector){
    var reg = /^(#)?(\.)?(\w+)$/img;
    //#demo [0:#demo,1:#,2:undefined,3:demo]
    //.demo [0:#demo,1:undefined,2:.,3:demo]
    var regRet = reg.exec(selector);
    // ID选择器
    if(regRet[1] && regRet[3]){
      return document.getElementById(regRet[3]);
    }
    // class选择器
    if(regRet[2] && regRet[3]){
      if(typeof document.getElementsByClassName === "function"){
        return document.getElementsByClassName(regRet[3]);
      }
      else{
        var allDoms = document.getElementsByTagName("*"),ret = [];
        for(var i=0,l=allDoms.length;i<l;i++){
          var r = new RegExp("(^| )"+regRet[3]+"( |$)");
          if(allDoms[i].className.search(r) > -1) {
            ret.push(allDoms[i]);
          }
        }
        return ret;
      }
    }
    // 标签选择器
    if(!regRet[1] && !regRet[2] && regRet[3]){
      return document.getElementsByTagName(regRet[3]);
    }

  };

  dom.addClass = function(node,str){
    if(!new RegExp("(^|\\s+)"+str).test(node.className)){
      node.className += " " + str;
    }
  };

  dom.removeClass = function(node,str){
    node.className = node.className.replace(new RegExp("(^|\\s+)"+str),"");
  };

  return dom;

});