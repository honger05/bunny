define("bunny/iframe-shim/1.0.0/iframe-shim",["$","bunny/position/1.0.0/position"],function(a,b,c){function d(a){this.target=g(a).eq(0)}function e(){}function f(a){var b={display:"none",border:"none",opacity:0,position:"absolute"},c=a.css("zIndex");return c&&c>0&&(b.zIndex=c-1),g("<iframe>",{src:"javascript:''",frameborder:0,css:b}).insertBefore(a)}var g=a("$"),h=a("bunny/position/1.0.0/position"),i=-1!==(window.navigator.userAgent||"").toLowerCase().indexOf("msie 6");d.prototype.sync=function(){var a=this.target,b=this.iframe;if(!a.length)return this;var c=a.outerHeight(),d=a.outerWidth();return c&&d&&!a.is(":hidden")?(b||(b=this.iframe=f(a)),b.css({height:c,width:d}),h.pin(b[0],a[0]),b.show()):b&&b.hide(),this},d.prototype.destroy=function(){this.iframe&&(this.iframe.remove(),delete this.iframe),delete this.target},i?c.exports=d:(e.prototype.sync=function(){return this},e.prototype.destroy=e,c.exports=e)});
