var coder = {
    encode: function (x) {
        var bin, that, pad = this.pad;

        x = ~~x; // floor
        x = 8192 + x; // make positive
        if (x > 16383) {
            throw new TypeError('Bad Input'); // too high
        } else {
            bin = x.toString(2);
            that = pad(bin, 16 - bin.length, 'array');
            that.splice(8, 0, '0');
            that = parseInt(that.join(''), 2).toString(16);
            that = pad(that, 4 - that.length).toUpperCase();
        }


        return that;
    },

    decode: function (upper, lower) {
        var hex, that, pad = this.pad;

        upper = pad(upper, 2 - upper.length);
        lower = pad(lower, 2 - lower.length);
        that = upper + lower;
        if (this.check(that)) {
            hex = parseInt(that, 16);
            that = hex.toString(2);
            that = pad(that, 14 - that.length, 'array');
            that.splice(7, 1);
            that = parseInt(that.join(''), 2) - 8192;
        } else {
            throw new RangeError('Bad Input'); // not valid
        }

        return that;
    },

    pad: function (arrOrStr, count, rtnType) {
        var i = 0;

        if (!(arrOrStr instanceof Array)) {
            arrOrStr = arrOrStr.split('');
            rtnType = rtnType || 'string';
        } else {
            rtnType = rtnType || 'array';
        }

        if (count) {
            for (i; i < count; ++i) {
                arrOrStr.unshift('0');
            }
        }

        return rtnType === 'string' ? arrOrStr.join('') : arrOrStr;
    },

    check: function (n) {
        return /^[0-9A-Fa-f]+$/.test(n);
    }
};
