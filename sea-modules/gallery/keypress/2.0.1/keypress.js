define("gallery/keypress/2.0.1/keypress",[],function(a,b,c){var d;!function(){var a,b,c,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v={}.hasOwnProperty,w=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};i={is_unordered:!1,is_counting:!1,is_exclusive:!1,is_solitary:!1,prevent_default:!1,prevent_repeat:!1},t=["meta","alt","option","ctrl","shift","cmd"],r="ctrl",d={},d.debug=!1,a=function(){function a(a){var b,c;for(b in a)v.call(a,b)&&(c=a[b],c!==!1&&(this[b]=c));this.keys=this.keys||[],this.count=this.count||0}return a.prototype.allows_key_repeat=function(){return!this.prevent_repeat&&"function"==typeof this.on_keydown},a.prototype.reset=function(){return this.count=0,this.keyup_fired=null},a}(),d.Listener=function(){function b(a,b){var c,d,e,f=this;this.should_suppress_event_defaults=!1,this.should_force_event_defaults=!1,this.sequence_delay=800,this._registered_combos=[],this._keys_down=[],this._active_combos=[],this._sequence=[],this._sequence_timer=null,this._prevent_capture=!1,this._defaults=b||{};for(d in i)v.call(i,d)&&(e=i[d],this._defaults[d]=this._defaults[d]||e);a=a||document.body,c=function(a,b,c){return a.addEventListener?a.addEventListener(b,c):a.attachEvent?a.attachEvent("on"+b,c):void 0},c(a,"keydown",function(a){return a=a||window.event,f._receive_input(a,!0),f._bug_catcher(a)}),c(a,"keyup",function(a){return a=a||window.event,f._receive_input(a,!1)}),c(window,"blur",function(){var a,b,c,d;for(d=f._keys_down,b=0,c=d.length;c>b;b++)a=d[b],f._key_up(a,{});return f._keys_down=[]})}return b.prototype._bug_catcher=function(a){var b;return"cmd"===r&&w.call(this._keys_down,"cmd")>=0&&"cmd"!==(b=f(a.keyCode))&&"shift"!==b&&"alt"!==b&&"caps"!==b&&"tab"!==b?this._receive_input(a,!1):void 0},b.prototype._cmd_bug_check=function(a){return"cmd"===r&&w.call(this._keys_down,"cmd")>=0&&w.call(a,"cmd")<0?!1:!0},b.prototype._prevent_default=function(a,b){return(b||this.should_suppress_event_defaults)&&!this.should_force_event_defaults&&(a.preventDefault?a.preventDefault():a.returnValue=!1,a.stopPropagation)?a.stopPropagation():void 0},b.prototype._get_active_combos=function(a){var b,c,d=this;return b=[],c=j(this._keys_down,function(b){return b!==a}),c.push(a),this._match_combo_arrays(c,function(a){return d._cmd_bug_check(a.keys)?b.push(a):void 0}),this._fuzzy_match_combo_arrays(c,function(a){return w.call(b,a)>=0?void 0:!a.is_solitary&&d._cmd_bug_check(a.keys)?b.push(a):void 0}),b},b.prototype._get_potential_combos=function(a){var b,c,d,e,f;for(c=[],f=this._registered_combos,d=0,e=f.length;e>d;d++)b=f[d],b.is_sequence||w.call(b.keys,a)>=0&&this._cmd_bug_check(b.keys)&&c.push(b);return c},b.prototype._add_to_active_combos=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p;if(i=!1,h=!0,e=!1,w.call(this._active_combos,a)>=0)return!0;if(this._active_combos.length)for(g=j=0,o=this._active_combos.length;o>=0?o>j:j>o;g=o>=0?++j:--j)if(b=this._active_combos[g],b&&b.is_exclusive&&a.is_exclusive){if(d=b.keys,!i)for(k=0,m=d.length;m>k;k++)if(c=d[k],i=!0,w.call(a.keys,c)<0){i=!1;break}if(h&&!i)for(p=a.keys,l=0,n=p.length;n>l;l++)if(f=p[l],h=!1,w.call(d,f)<0){h=!0;break}i&&(e?(b=this._active_combos.splice(g,1)[0],null!=b&&b.reset()):(b=this._active_combos.splice(g,1,a)[0],null!=b&&b.reset(),e=!0),h=!1)}return h&&this._active_combos.unshift(a),i||h},b.prototype._remove_from_active_combos=function(a){var b,c,d,e;for(c=d=0,e=this._active_combos.length;e>=0?e>d:d>e;c=e>=0?++d:--d)if(b=this._active_combos[c],b===a){a=this._active_combos.splice(c,1)[0],a.reset();break}},b.prototype._get_possible_sequences=function(){var a,b,c,d,e,f,g,h,i,k,l,m,n;for(e=[],l=this._registered_combos,g=0,k=l.length;k>g;g++)for(a=l[g],c=h=1,m=this._sequence.length;m>=1?m>=h:h>=m;c=m>=1?++h:--h)if(f=this._sequence.slice(-c),a.is_sequence&&(!(w.call(a.keys,"shift")<0)||(f=j(f,function(a){return"shift"!==a}),f.length))){for(b=i=0,n=f.length;n>=0?n>i:i>n;b=n>=0?++i:--i){if(a.keys[b]!==f[b]){d=!1;break}d=!0}d&&e.push(a)}return e},b.prototype._add_key_to_sequence=function(a,b){var c,d,e,f;if(this._sequence.push(a),d=this._get_possible_sequences(),d.length){for(e=0,f=d.length;f>e;e++)c=d[e],this._prevent_default(b,c.prevent_default);this._sequence_timer&&clearTimeout(this._sequence_timer),this.sequence_delay>-1&&(this._sequence_timer=setTimeout(function(){return this._sequence=[]},this.sequence_delay))}else this._sequence=[]},b.prototype._get_sequence=function(a){var b,c,d,e,f,g,h,i,k,l,m,n,o;for(m=this._registered_combos,h=0,l=m.length;l>h;h++)if(b=m[h],b.is_sequence){for(d=i=1,n=this._sequence.length;n>=1?n>=i:i>=n;d=n>=1?++i:--i)if(g=j(this._sequence,function(a){return w.call(b.keys,"shift")>=0?!0:"shift"!==a}).slice(-d),b.keys.length===g.length)for(c=k=0,o=g.length;o>=0?o>k:k>o;c=o>=0?++k:--k)if(f=g[c],!((w.call(b.keys,"shift")<0?"shift"===f:0)||"shift"===a&&w.call(b.keys,"shift")<0)){if(b.keys[c]!==f){e=!1;break}e=!0}if(e)return b}return!1},b.prototype._receive_input=function(a,b){var c;return this._prevent_capture?(this._keys_down.length&&(this._keys_down=[]),void 0):(c=f(a.keyCode),(b||this._keys_down.length||"alt"!==c&&c!==r)&&c?b?this._key_down(c,a):this._key_up(c,a):void 0)},b.prototype._fire=function(a,b,c,d){return"function"==typeof b["on_"+a]&&this._prevent_default(c,b["on_"+a].call(b["this"],c,b.count,d)!==!0),"release"===a&&(b.count=0),"keyup"===a?b.keyup_fired=!0:void 0},b.prototype._match_combo_arrays=function(a,b){var d,f,g,h;for(h=this._registered_combos,f=0,g=h.length;g>f;f++)d=h[f],(!d.is_unordered&&e(a,d.keys)||d.is_unordered&&c(a,d.keys))&&b(d)},b.prototype._fuzzy_match_combo_arrays=function(a,b){var c,d,e,f;for(f=this._registered_combos,d=0,e=f.length;e>d;d++)c=f[d],(!c.is_unordered&&l(c.keys,a)||c.is_unordered&&k(c.keys,a))&&b(c)},b.prototype._keys_remain=function(a){var b,c,d,e,f;for(f=a.keys,d=0,e=f.length;e>d;d++)if(b=f[d],w.call(this._keys_down,b)>=0){c=!0;break}return c},b.prototype._key_down=function(a,b){var c,d,e,f,h,i,j,k,l,m,n,o,p,q,t;l=g(a,b),l&&(a=l),this._add_key_to_sequence(a,b),k=this._get_sequence(a),k&&this._fire("keydown",k,b);for(h in s)e=s[h],b[e]&&(h===a||w.call(this._keys_down,h)>=0||this._keys_down.push(h));for(h in s)if(e=s[h],h!==a&&w.call(this._keys_down,h)>=0&&!b[e]){if("cmd"===h&&"cmd"!==r)continue;for(f=m=0,t=this._keys_down.length;t>=0?t>m:m>t;f=t>=0?++m:--m)this._keys_down[f]===h&&this._keys_down.splice(f,1)}for(d=this._get_active_combos(a),j=this._get_potential_combos(a),n=0,p=d.length;p>n;n++)c=d[n],this._handle_combo_down(c,j,a,b);if(j.length)for(o=0,q=j.length;q>o;o++)i=j[o],this._prevent_default(b,i.prevent_default);w.call(this._keys_down,a)<0&&this._keys_down.push(a)},b.prototype._handle_combo_down=function(a,b,c,d){var e,f,g,h,i,j;if(w.call(a.keys,c)<0)return!1;if(this._prevent_default(d,a&&a.prevent_default),e=!1,w.call(this._keys_down,c)>=0&&(e=!0,!a.allows_key_repeat()))return!1;if(h=this._add_to_active_combos(a,c),a.keyup_fired=!1,f=!1,a.is_exclusive)for(i=0,j=b.length;j>i;i++)if(g=b[i],g.is_exclusive&&g.keys.length>a.keys.length){f=!0;break}return!f&&(a.is_counting&&"function"==typeof a.on_keydown&&(a.count+=1),h)?this._fire("keydown",a,d,e):void 0},b.prototype._key_up=function(a,b){var c,d,e,f,h,i,j,k,l,m,n,o,q,r,s,t,u,v,x;if(k=a,j=g(a,b),j&&(a=j),j=p[k],b.shiftKey?j&&w.call(this._keys_down,j)>=0||(a=k):k&&w.call(this._keys_down,k)>=0||(a=j),i=this._get_sequence(a),i&&this._fire("keyup",i,b),w.call(this._keys_down,a)<0)return!1;for(h=l=0,t=this._keys_down.length;t>=0?t>l:l>t;h=t>=0?++l:--l)if((u=this._keys_down[h])===a||u===j||u===k){this._keys_down.splice(h,1);break}for(d=this._active_combos.length,f=[],v=this._active_combos,m=0,q=v.length;q>m;m++)c=v[m],w.call(c.keys,a)>=0&&f.push(c);for(n=0,r=f.length;r>n;n++)e=f[n],this._handle_combo_up(e,b,a);if(d>1)for(x=this._active_combos,o=0,s=x.length;s>o;o++)c=x[o],void 0===c||w.call(f,c)>=0||this._keys_remain(c)||this._remove_from_active_combos(c)},b.prototype._handle_combo_up=function(a,b,d){var e,f;this._prevent_default(b,a&&a.prevent_default),f=this._keys_remain(a),a.keyup_fired||(e=this._keys_down.slice(),e.push(d),(!a.is_solitary||c(e,a.keys))&&(this._fire("keyup",a,b),a.is_counting&&"function"==typeof a.on_keyup&&"function"!=typeof a.on_keydown&&(a.count+=1))),f||(this._fire("release",a,b),this._remove_from_active_combos(a))},b.prototype.simple_combo=function(a,b){return this.register_combo({keys:a,on_keydown:b})},b.prototype.counting_combo=function(a,b){return this.register_combo({keys:a,is_counting:!0,is_unordered:!1,on_keydown:b})},b.prototype.sequence_combo=function(a,b){return this.register_combo({keys:a,on_keydown:b,is_sequence:!0})},b.prototype.register_combo=function(b){var c,d,e,f;"string"==typeof b.keys&&(b.keys=b.keys.split(" ")),f=this._defaults;for(d in f)v.call(f,d)&&(e=f[d],void 0===b[d]&&(b[d]=e));return c=new a(b),u(c)?(this._registered_combos.push(c),!0):void 0},b.prototype.register_many=function(a){var b,c,d,e;for(e=[],c=0,d=a.length;d>c;c++)b=a[c],e.push(this.register_combo(b));return e},b.prototype.unregister_combo=function(a){var b,d,f,g,h,i=this;if(!a)return!1;if(d=function(a){var b,c,d,e;for(e=[],b=c=0,d=i._registered_combos.length;d>=0?d>c:c>d;b=d>=0?++c:--c){if(a===i._registered_combos[b]){i._registered_combos.splice(b,1);break}e.push(void 0)}return e},a.keys)return d(a);for(h=this._registered_combos,f=0,g=h.length;g>f;f++){b=h[f]}return"string"==typeof a&&(a=a.split(" ")),b.is_unordered&&c(a,b.keys)||!b.is_unordered&&e(a,b.keys)?d(b):void 0},b.prototype.unregister_many=function(a){var b,c,d,e;for(e=[],c=0,d=a.length;d>c;c++)b=a[c],e.push(this.unregister_combo(b));return e},b.prototype.get_registered_combos=function(){return this._registered_combos},b.prototype.reset=function(){return this._registered_combos=[]},b.prototype.listen=function(){return this._prevent_capture=!1},b.prototype.stop_listening=function(){return this._prevent_capture=!0},b.prototype.get_meta_key=function(){return r},b}(),h=function(){-1!==navigator.userAgent.indexOf("Mac OS X")&&(r="cmd")},b=function(){-1!==navigator.userAgent.indexOf("Opera")&&(o["17"]="cmd")},f=function(a){return o[a]},j=function(a,b){var c;return a.filter?a.filter(b):function(){var d,e,f;for(f=[],d=0,e=a.length;e>d;d++)c=a[d],b(c)&&f.push(c);return f}()},c=function(a,b){var c,d,e;if(a.length!==b.length)return!1;for(d=0,e=a.length;e>d;d++)if(c=a[d],!(w.call(b,c)>=0))return!1;return!0},e=function(a,b){var c,d,e;if(a.length!==b.length)return!1;for(c=d=0,e=a.length;e>=0?e>d:d>e;c=e>=0?++d:--d)if(a[c]!==b[c])return!1;return!0},k=function(a,b){var c,d,e;for(d=0,e=a.length;e>d;d++)if(c=a[d],w.call(b,c)<0)return!1;return!0},l=function(a,b){var c,d,e,f,g;for(e=0,f=0,g=a.length;g>f;f++){if(d=a[f],c=b.indexOf(d),!(c>=e))return!1;e=c}return!0},q=function(){return d.debug?console.log.apply(console,arguments):void 0},m=function(a){var b,c,d;b=!1;for(d in o)if(c=o[d],a===c){b=!0;break}if(!b)for(d in p)if(c=p[d],a===c){b=!0;break}return b},u=function(a){var b,c,d,e,f,g,h,j,k,l,o,p,s,u,v;for(h=!0,a.keys.length||q("You're trying to bind a combo with no keys:",a),c=k=0,u=a.keys.length;u>=0?u>k:k>u;c=u>=0?++k:--k)d=a.keys[c],b=n[d],b&&(d=a.keys[c]=b),"meta"===d&&a.keys.splice(c,1,r),"cmd"===d&&q('Warning: use the "meta" key rather than "cmd" for Windows compatibility');for(v=a.keys,l=0,p=v.length;p>l;l++)d=v[l],m(d)||(q('Do not recognize the key "'+d+'"'),h=!1);if(w.call(a.keys,"meta")>=0||w.call(a.keys,"cmd")>=0){for(f=a.keys.slice(),o=0,s=t.length;s>o;o++)e=t[o],(c=f.indexOf(e))>-1&&f.splice(c,1);f.length>1&&(q("META and CMD key combos cannot have more than 1 non-modifier keys",a,f),h=!1)}for(g in a)j=a[g],"undefined"===i[g]&&q("The property "+g+" is not a valid combo property. Your combo has still been registered.");return h},g=function(a,b){var c;return b.shiftKey?(c=p[a],null!=c?c:!1):!1},s={cmd:"metaKey",ctrl:"ctrlKey",shift:"shiftKey",alt:"altKey"},n={escape:"esc",control:"ctrl",command:"cmd","break":"pause",windows:"cmd",option:"alt",caps_lock:"caps",apostrophe:"'",semicolon:";",tilde:"~",accent:"`",scroll_lock:"scroll",num_lock:"num"},p={"/":"?",".":">",",":"<","'":'"',";":":","[":"{","]":"}","\\":"|","`":"~","=":"+","-":"_",1:"!",2:"@",3:"#",4:"$",5:"%",6:"^",7:"&",8:"*",9:"(",0:")"},o={0:"\\",8:"backspace",9:"tab",12:"num",13:"enter",16:"shift",17:"ctrl",18:"alt",19:"pause",20:"caps",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",44:"print",45:"insert",46:"delete",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",91:"cmd",92:"cmd",93:"cmd",96:"num_0",97:"num_1",98:"num_2",99:"num_3",100:"num_4",101:"num_5",102:"num_6",103:"num_7",104:"num_8",105:"num_9",106:"num_multiply",107:"num_add",108:"num_enter",109:"num_subtract",110:"num_decimal",111:"num_divide",124:"print",144:"num",145:"scroll",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'",223:"`",224:"cmd",225:"alt",57392:"ctrl",63289:"num"},h(),b()}.call(this),c.exports=d});
