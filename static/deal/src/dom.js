define(function(){

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

  dom.cookie = {
    read: function(name){
      if(document.cookie.length > 0){
        var c_start = document.cookie.indexOf(name+"=");
        if(c_start !== -1){
          c_start = c_start + name.length + 1;
          var c_end = document.cookie.indexOf(";",c_start);
          if(c_end === -1) c_end = document.cookie.length;
          return unescape(document.cookie.substring(c_start,c_end))
        }
      }
      return "";
    },
    set: function(name,value,expiresDays){
      var expDate = new Date();
      expDate.setDate(expDate.getDate()+expiresDays);
      var expStr = expiresDays ? "; expires="+expDate.toGMTString() : "";
      var pathStr = "; path=/";
      document.cookie = name + "=" + escape(value) + expStr + pathStr;
    },
    del: function(name){
      var expDate = new Date();
      expDate.setDate(expDate.getDate()-1);
      var expStr = "; expires="+expDate.toGMTString();
      var pathStr = "; path=/";
      var value = this.read(name);
      if(value !== ""){
        document.cookie = name + "=" + escape(value) + expStr + pathStr;
      }
    }
  };

  return dom;

});