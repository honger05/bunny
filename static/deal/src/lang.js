define(function(){

  function lang(){};

  lang.trim = function(s){
    return s.replace(/^\s+|\s+$/g,"");
  };

  lang.isNumber = function(n){
    return !isNaN(n) && isFinite(n);
  };

  lang.isArray = function(obj){
    return Object.prototype.toString.call(obj) === "[object Array]";
  };

  lang.isIE = function(){
    return window.navigator.userAgent.indexOf("ie") > -1 ? true : false;
  };

  /** 在特点范围【min，max】 内取整数*/
  lang.random = function(min,max){
    min = min || 0;
    max = max || 100;
    return Math.floor(Math.random()*(max-min+1))
  };

  /** 在items数组中随机获取一个值*/
  lang.randomItem = function(items){
    return items[Math.floor(Math.random()*items.length)];
  };

  /** 在items数组中取最大值*/
  lang.maxItem = function(items){
    return Math.max.apply(Math,items);
  };

  /** 在items数组中取最小值*/
  lang.minItem = function(items){
    return Math.min.apply(Math,items);
  };

  /** 把arr数组添加到items数组之后*/
  lang.addItems = function(items,arr){
    Array.prototype.push.apply(items,arr);
  };

  /** 将items数组中重复的项去掉*/
  lang.unique = function(items){
    var ret = [], hash = {};
    for(var i in items){
      if(hash[items[i]]){
        ret.push(items[i]);
        hash[items[i]] = true;
      }
    }
  };

  /** 获取items数组中重复数最多的项*/
  lang.maxAppearItem = function(items){

  };

  /** 将items数组快速排序*/
  lang.fastSort = function(items){

  };

  return lang;
});