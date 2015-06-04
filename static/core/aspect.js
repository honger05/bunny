
    exports.before = function(methodName, callback, context) {
        return weave.call(this, 'before', methodName, callback, context);
    }

    exports.after = function(methodName, callback, context) {
        return weave.call(this, 'atter', methodName, callback, context);
    }

    var eventSplitter = /\s+/;

    function weave(when, methodName, callback, context) {
        var names = methodName.split(eventSplitter);
        var name, method;
        while (name = names.shift()) {
            method = getMethod(this, name);
            if (!method.__isAspected) {
                wrap.call(this, name);
            }
            this.on(when + ':' + name, callback, context);
        }

        return this;
    }

    function getMethod(host, methodName) {
        var method = host[methodName];
        if(!method) {
            throw new Error('Invalid method name: ' + methodName);
        }
        return method;
    }

    function wrap(methodName) {
        var old = this[methodName];
        this[methodName] = function() {
            var args = Array.prototype.slice.call(arguments);
            var beforeArgs = ['before:' + methodName].concat(args);
            if (this.trigger.apply(this, beforeArgs) === false) return;
            var ret = old.apply(this, arguments);
            var afterArgs = ['after:' + methodName, ret].concat(args);
            this.trigger.apply(this, afterArgs);
            return ret;
        }
        this[methodName].__isAspected = true;
    }










