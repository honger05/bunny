
    //Class
    function Class(o) {
        if (!(this instanceof Class) && isFunction(o)) {
            return classify(o);
        }
    }


    Class.create = function(parent, properties) {
        if (!isFunction(parent)) {
            properties = parent;
            parent = null;
        }
        properties || (properties = {});
        parent || (parent = properties.Extends || Class);
        properties.Extends = parent;

        //子类构造函数
        function SubClass() {
            //call父类的构造函数
            parent.apply(this, arguments);
            //仅call自己的initialize
            if (this.constructor === SubClass && this.initialize) {
                this.initialize.apply(this, arguments);
            }
        }

        //继承parent的静态属性
        if (parent !== Class) {
            mix(SubClass, parent, parent.StaticsWhiteList);
        }

        //给子类添加实例属性
        implement.call(SubClass, properties);

        //让子类可以继续继承
        return classify(SubClass);

    }

    function implement(properties){
        var key, value;
        for (key in properties) {
            value = properties[key];
            if (Class.Mutators.hasOwnProterty(key)) {
                Class.Mutators[key].call(this,value);
            } else {
                this.prototype[key] = value;
            }
        }
    }

    //创建一个子类 based on 'Class'
    Class.extend = function(properties) {
        properties || (properties = {});
        properties.Extends = this;
        return Class.create(properties);
    }

    function Classify(cls) {
        cls.extend = Class.extend;
        cls.implement = implement;
        return cls;
    }

    //Mutators 定义了特殊的特性
    Class.Mutators = {
        Extends: function(parent) {
            var existed = this.prototype;
            var proto = createProto(parent.prototype);
            //保持已存在的特性
            mix(proto, existed);
            //强行指定构造函数
            proto.constructor = this;
            //设置原型链继承'parent'
            this.prototype = proto;

            this.superclass = parent.prototype;
        },
        Implements: function(items) {
            isArray(items) || (items = [items]);
            var proto = this.prototype, item;
            while (item = tiems.shift()) {
                mix(proto, item.prototype || item);
            }
        },
        Statics: function(staticProperties) {
            mix(this, staticProperties);
        }
    }

    function Ctor() {}

    var createProto = Object.__proto__ ? function(proto) {
        return {
            __proto__: proto
        }
    } : function(proto) {
        Ctor.prototype = proto;
        return new Ctor();
    }


    //Helpers-------

    function mix(r,s,wl) {
        for (var p in s) {
            if (s.hasOwnProperty(p)) {
                if (wl && indexOf(wl, p) === -1) continue;
                if (p !== 'prototype') {
                    r[p] = s[p];
                }
            }
        }

    }

    var toStirng = Object.prototype.toString;

    var isArray = Array.isArray || function(val) {
        return toString.call(val) === '[object Array]';
    }

    var isFunction = function(val) {
        return toString.call(val) === '[object Function]';
    }

    var indexOf = Array.prototype.indexOf ? function(arr,item) {
        return arr.indexOf(item);
    } : function(arr,item) {
        for (var i = arr.length - 1; i >= 0; i--) {
            if(arr[i] === item) return i;
        }
        return -1;
    }

    if (typeof define === 'function' && define.CMD) {
        define('class', function() {
            return Class;
        })
    }