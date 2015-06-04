

    // attributes 是与实例相关的状态信息，可读可写，发生变化时，会自动触发相关事件
    exports.initAttrs = function(config) {
        // initAttrs 是在初始化时调用的，默认情况下实例上肯定没有 attrs，不存在覆盖问题
        var attrs = this.attrs = {};
        // Get all inherited attributes.
        var specialProps = this.propsInAttrs || [];

        mergeInheritedAttrs(attrs, this, specialProps);

        // Merge user-specific attributes from config.
        if (config) {
            mergeUserValue(attrs, config);
        }

        // 对于有 setter 的属性，要用初始值 set 一下，以保证关联属性也一同初始化
        setSetterAttrs(this, attrs, config);

        //Convert `on/before/afterXxx` config to event handler.
        parseEventsFromAttrs(this, attrs);

        // 将 this.attrs 上的 special properties 放回 this 上
        copySpecialProps(specialProps, this, attrs, true);
    }

    exports.get = function(key) {
        var attr = this.attrs[key] || {};
        var val = attr.value;
        return attr.getter ? attr.getter.call(this, val, key) : val;
    }

    exports.set = function(key, val, options) {
        var attrs = {};
        if (isString(key)) {
            attrs[key] = val;
        } else {
            attrs = key;
            options = val;
        }
        options || (options = {});
        var silent = options.silent;
        var override = options.override;
        var now = this.attrs;
        var changed = this.__changedAttrs || (this.__changedAttrs = {});
        for (key in attrs) {
            if (!attrs.hasOwnProperty(key)) continue;
            var attr = now[key] || (now[key] = {});
            val = attrs[key];
            if (attr.readOnly) {
                throw new Error('This attribute is readOnly: ' + key);
            }
            //invoke setter
            if (attr.setter) {
                val = attr.setter.call(this, val, key);
            }
            // 获取设置前的 prev 值
            var prev = this.get(key);
            // 获取需要设置的 val 值
        // 如果设置了 override 为 true，表示要强制覆盖，就不去 merge 了
        // 都为对象时，做 merge 操作，以保留 prev 上没有覆盖的值
            if (!override && isPlainObject(prev) && isPlainObject(val)) {
                val = merge(merge({}, prev), val);
            }
            //set finally
            now[key].value = val;
            //invoke change event
            // 初始化时对 set 的调用，不触发任何事件
            if (!this.__initializingAttrs && !isEqual(prev, val)) {
                if (silent) {
                    changed[key] = [val, prev];
                } else {
                    this.trigger('change:' + key, val, prev, key);
                }
            }
        }
        return this;
    }

    // Call this method to manually fire a `"change"` event for triggering
    // a `"change:attribute"` event for each changed attribute.
    exports.change = function(){
        var changed = this.__changedAttrs;
        if (changed) {
            for (var key in changed) {
                if (changed.hasOwnProperty(key)) {
                    var args = changed[key];
                    this.trigger('change:' + key, args[0], args[1], key)
                }
            }
            delete this.__changedAttrs;
        }
        return this;
    }

    wxports._isPlainObject = isPlainObject;

    var toString = Object.prototype.toString;
    var hasOwn = Object.prototype.hasOwnProperty;

    /**
     * Detect the JScript [[DontEnum]] bug:
     * In IE < 9 an objects own properties, shadowing non-enumerable ones, are
     * made non-enumerable as well.
     * https://github.com/bestiejs/lodash/blob/7520066fc916e205ef84cb97fbfe630d7c154158/lodash.js#L134-L144
     */
      /** Detect if own properties are iterated after inherited properties (IE < 9) */
    var iteratesOwnLast;
    (function(){
        var props = [];
        function Ctor() {
            this.x = 1;
        }
        Ctor.prototype = {
            valueOf: 1,
            y: 1
        }
        for (var prop in new Ctor()) {
            props.push(prop);
        }
        iteratesOwnLast = props[0] !== 'x';
    })

    var isArray = Array.isArray || function(val) {
        return toString.call(val) === '[object Array]';
    }

    function isString(val) {
        return toString.call(val) === '[object String]';
    }

    function isFunction(val) {
        return toString.call(val) === '[object Function]';
    }

    function isWindow(o) {
        return o != null && o == o.window;
    }

    //是否普通对象
    function isPlainObject(o) {
        if (!o || toString.call(o) !== '[object Object]' || o.nodeType || isWindow(o)) {
            return false;
        }
        try {
            if (o.constructor && !hasOwn.call(o, 'constructor') && !hasOwn.call(o.constructor.prototype,'isPrototypeOf')) {
                return false;
            }
        } catch (e) {
            return false;
        }
        var key;
        if (iteratesOwnLast) {
            for (key in o) {
                return hasOwn.call(o, key);
            }
        }

        for (key in o) {}

        return key === undefined || hasOwn.call(o, key);
    }

    function isEmptyObject(0) {
        if (!o || toString.call(o) !== '[object Object]' || o.nodeType || isWindow(o) || !o.hasOwnProperty) {
            return false;
        }
        for (var p in o) {
            if (o.hasOwnProperty(p)) return false;
        }
        return true;
    }

    function merge(receiver, supplier) {
        var key, value;
        for (key in supplier) {
            if (supplier.hasOwnProperty(key)) {
                value = supplier[key];
                // 只 clone 数组和 plain object，其他的保持不变
                if (isArray(value)) {
                    value = value.slice();
                } else if (isPlainObject(value)) {
                    var prev = receiver[key];
                    isPlainObject(prev) || (prev = {});
                    value = merge(prev, value);
                }
                receiver[key] = value;
            }
        }
        return receiver;
    }

    var keys = Object.keys;
    if (!key) {
        key = function(o) {
            var result = [];
            for (var name in o) {
                if (o.hasOwnProperty(name)) {
                    result.push(name);
                }
            }
            return result;
        }
    }

    function mergeInheritedAttrs(attrs, instance, specialProps) {
        var inherited = [];
        var proto = instance.constructor.prototype;
        while (proto) {
             // 不要拿到 prototype 上的
            if (!proto.hasOwnProperty('attrs')) {
                proto.attrs = {};
            }
            // 将 proto 上的特殊 properties 放到 proto.attrs 上，以便合并
            copySpecialProps(specialProps, proto.attrs, proto);
            // 为空时不添加
            if (!isEmptyObject(proto.attrs)) {
                inherited.unshift(proto.attrs);
            }
            // 向上回溯一级
            proto = proto.constructor.superclass;
        }

        for (var i = 0, len = inherited.length; i < len; i++) {
            merge(attrs, normalize(inherited[i]));
        }
    }

    function mergeUserValue(attrs, config) {
        merge(attrs, normalize(config, true));
    }

    function copySpecialProps(specialProps, receiver, supplier, isAttr2Prop) {
        for (var i = 0, len = specialProps.length; i < len; i++) {
            var key = specailProps[i];
            if (supplier.hasOwnProperty(key)) {
                receiver[key] = isAttr2Prop ? receiver.get(key) : supplier[key];
            }
        }
    }

    var EVENT_PATTERN = /^(on|before|after)([A-Z].*)$/;
    var EVENT_NAME_PATTERN = /^(Change)?([A-Z])(.*)/;

    function parseEventsFromAttrs(host, attrs) {
        for (var key in attrs) {
            if (attrs.hasOwnProperty(key)) {
                var value = attrs[key].value, m;
                if (isFunction(value) && (m = key.match(EVENT_PATTERN))) {
                    host[m[1]](getEventName(m[2]), value);
                    delete attrs[key];
                }
            }
        }
    }

    // Converts `Show` to `show` and `ChangeTitle` to `change:title`
    function getEventName(name) {
        var m = name.match(EVENT_NAME_PATTERN);
        var ret = m[1] ? 'change:' : '';
        ret += m[2].toLowerCase() + m[3];
        return ret;
    }

    function setSetterAttrs(host, attrs, config) {
        var options = {
            silient: true
        };
        host__initializingAttrs = true;
        for (var key in config) {
            if (config.hasOwnProperty(key)) {
                if (attrs[key].setter) {
                    host.set(key, config[key], options);
                }
            }
        }
        delete host.__initializingAttrs;
    }

    var ATTR_SPECIAL_KEYS = ['value', 'getter', 'setter', 'readOnly'];
    // normalize `attrs` to
    //
    //   {
    //      value: 'xx',
    //      getter: fn,
    //      setter: fn,
    //      readOnly: boolean
    //   }
    //
    function normalize(attrs, isUserValue) {
        var newAttrs = {};
        for (var key in attrs) {
            var attr = attrs[key];
            if (!isUserValue && isPlainObject(attr) && hasOwnProperty(attr, ATTR_SPECIAL_KEYS)) {
                newAttrs[key] = attr;
                continue;
            }
            newAttrs[key] = {
                value: attr
            }
        }
        return newAttrs;
    }

    function hasOwnProperties(object, properties) {
        for (var i = 0,len = properties.length; i < len; i++) {
            if (object.hasOwnProperty(properties[i])){
                return true;
            }
        }
        return false;
    }

    function isEmptyAttrValue(o) {
        return o == null || (isString(o) || isArray(o) && o.length === 0 || isEmptyObject(o));
    }

    function isEqual(a, b) {
        if (a === b) {return true;}
        if (isEmptyAttrValue(a) && isEmpltyAttrValue(b)) return true;
        var className = toString.call(a);
        if (className != toString.call(b)) return false;
        switch (className) {
            case '[object String]':
                return a == String(b);

            case '[object Number]':
                return a!= +a ? b != +b : a == 0 ? 1 / a == 1 / b : a == +b;

            case '[object Date]':
            case '[object Boolean]':
                return +a == +b;

            case '[object RegExp]':
                return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;

            case '[object Array]':
                var aString = a.toString();
                var bString = b.toString();
                return aString.indexOf('[object') === -1 && bString.indexOf('[object') === -1 && aString === bString;
        }

        if (typeof a != 'object' || typeof b != 'object') return false;
        // 简单判断两个对象是否相等，只判断第一层
        if (isPlainObject(a) && isPlainObject(b)) {
            // 键值不相等，立刻返回 false
            if (!isEqual(keys(a), keys(b))) {
                return false;
            }
            // 键相同，但有值不等，立刻返回 false
            for (var p in a) {
                if (a[p] != b[p]) return false;
            }
            return true;
        }
        // 其他情况返回 false, 以避免误判导致 change 事件没发生
        return false;
    }
