export default {
    getSessionStorage: function (item) {
        return JSON.parse(sessionStorage.getItem(item));
    },
    setSessionStorage: function (item, obj) {
        sessionStorage.setItem(item, JSON.stringify(obj));
    },
    getLocalStorage: function (item) {
        return JSON.parse(localStorage.getItem(item));
    },
    removeSessionStorage: function (item) {
        sessionStorage.removeItem(item);
    },
    setLocalStorage: function (item, obj) {
        return JSON.parse(localStorage.getItem(item));
    },

    classNames: function () {
        var hasOwn = {}.hasOwnProperty;
        var classes = [];
        for (var i = 0; i < arguments.length; i++) {
            var arg = arguments[i];
            if (!arg)
                continue;
            var argType = typeof arg;
            if (argType === 'string' || argType === 'number') {
                classes.push(arg);
            } else if (Array.isArray(arg)) {
                classes.push(classNames.apply(null, arg));
            } else if (argType === 'object') {
                for (var key in arg) {
                    if (hasOwn.call(arg, key) && arg[key]) {
                        classes.push(key);
                    }
                }
            }
        }
        return classes.join(' ');
    },
    getQueryStringArgs: function () {
        var qs = (location.search.length > 0 ? location.search.substring(1) : ""),
            args = {},
            items = qs.length ? qs.split("&") : [],
            item = null,
            name = null,
            value = null,
            i = 0,
            len = items.length;
        for (i = 0; i < len; i++) {
            item = items[i].split("=");
            name = item[0];
            value = item[1];
            if (name.length) {
                args[name] = value;
            }
        }
        return args;
    },
    serialize: function (obj) {
        var parts = [];
        for (var i in obj) {
            parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
        }
        return parts.join("&");
    },
    dateFormat: function (day1) {
        var year = day1.getFullYear();
        var month = day1.getMonth() + 1;
        var day = day1.getDate();
        return year + "-" + (month >= 10 ? month : "0" + month) + "-" + (day >= 10 ? day : "0" + day);
    },
    dateDiff: function (date, days) {
        return date.valueOf() - days * 24 * 60 * 60 * 1000;
    },
    extend: function (a, obj) {
        if (typeof a !== 'object')
            return a;
        for (var i in obj) {
            a[i] = obj[i];
        }
    },
    getFormData: function (form) {
        var parts = {},
            field = null,
            i,
            len,
            j,
            optLen,
            option,
            optValue;
        for (i = 0, len = form.elements.length; i < len; i++) {
            field = form.elements[i];
            switch (field.type) {
                case "select-one":
                case "select-multiple":
                    if (field.name.length) {
                        for (j = 0, optLen = field.options.length; j < optLen; j++) {
                            option = field.options[j];
                            if (option.selected) {
                                optValue = "";
                                if (option.hasAttribute) {
                                    optValue = (option.hasAttribute("value") ? option.value : option.text);
                                } else {
                                    optValue = (option.attributes["value"].specified ? option.value : option.text);
                                }
                                //parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
                                parts[encodeURIComponent(field.name)] = encodeURIComponent(field.value);
                            }
                        }
                    }
                    break;
                case undefined:
                case "file":
                case "submit":
                case "reset":
                case "button":
                    break;
                case "radio":
                case "checkbox":
                    if (!field.checked) {
                        break;
                    }
                default:
                    if (field.name.length) {
                        parts[encodeURIComponent(field.name)] = encodeURIComponent(field.value);
                        //parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
                    }
            }
        }
        return parts;
    },
    delHTML: function (html, len, str) {
        var title = (html || "").replace(/<[^>]+>/g, "").replace(/\n/g, " "); //去掉所有的html标记
        if (title.length > len) {
            title = title.substring(0, len);
            if (str) {
                title = title + str;
            }
        }
        return title;
    }
};