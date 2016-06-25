'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Configurable base64 encoder and decoder.
 */

var Base64 = function () {
    /**
     * Construct a new Base64 decode/encoder using a list of codes and the size of each code in bytes.
     *
     * @param {Array.<string>} codes List of codes, should have 65 items the last being the padding code
     * @param {number} codeSize Size of codes in bytes to support unicode and ASCII.
     */

    function Base64() {
        var codes = arguments.length <= 0 || arguments[0] === undefined ? Base64.base64Codes : arguments[0];
        var codeSize = arguments.length <= 1 || arguments[1] === undefined ? Base64.base64CodeSize : arguments[1];

        _classCallCheck(this, Base64);

        this._codes = codes;
        this._codeSize = codeSize;

        // Map of code points (Number representing the code) to codes
        this._codesInv = {};
        for (var i = 0; i < this._codes.length; i++) {
            this._codesInv[this._codes[i].codePointAt()] = i;
        }
    }

    /**
     * Decode an string
     *
     * @param {string} input string to decode
     * @returns {string} decoded string
     */


    _createClass(Base64, [{
        key: 'decode',
        value: function decode(input) {
            // Get size of padding
            var padding = input.codePointAt(input.length - 1 * this._codeSize) == this._codes[this._codes.length - 1].codePointAt() ? input.codePointAt(input.length - 2 * this._codeSize) == this._codes[this._codes.length - 1].codePointAt() ? 2 : 1 : 0;
            // Process 4 characters at a time
            var result = '';
            for (var c = 0; c < input.length; c += 4 * this._codeSize) {
                // Create 24-bit number from 4 6-bit numbers
                var n = (this._codesInv[input.codePointAt(c)] << 18) + (this._codesInv[input.codePointAt(c + 1 * this._codeSize)] << 12) + (this._codesInv[input.codePointAt(c + 2 * this._codeSize)] << 6) + this._codesInv[input.codePointAt(c + 3 * this._codeSize)];

                // Split the 24-bit number into the original 8-bit character codes
                result += String.fromCharCode(n >>> 16 & 255, n >>> 8 & 255, n & 255);
            }

            // Remove padding
            return result.substring(0, result.length - padding);
        }

        /**
         * Encode a string
         *
         * @param {string} input string to encode
         * @returns {string} encoded string
         */

    }, {
        key: 'encode',
        value: function encode(input) {
            // Make evenly divisible by 3
            var padding = '';
            var newInput = input;
            while (newInput.length % 3 > 0) {
                padding += this._codes[this._codes.length - 1];
                newInput += '=';
            }

            // Process 3 at a time
            var result = '';
            for (var i = 0; i < newInput.length; i += 3) {
                // Create a 24-bit number from 3 8-bit numbers
                var n = (newInput.codePointAt(i) << 16) + (newInput.codePointAt(i + 1) << 8) + newInput.codePointAt(i + 2);

                // Separate 24-bit number to 4 6-bit numbers
                n = [n >>> 18 & 63, n >>> 12 & 63, n >>> 6 & 63, n & 63];

                // Get codes for 6-bit numbers
                result += this._codes[n[0]] + this._codes[n[1]] + this._codes[n[2]] + this._codes[n[3]];
            }

            // Add padding
            return result.substring(0, result.length - padding.length) + padding;
        }
    }]);

    return Base64;
}();

exports.default = Base64;


Base64.emojiCodes = [];
for (var i = 0; i < 65; i++) {
    Base64.emojiCodes.push(String.fromCodePoint(0x1F600 + i));
}
Base64.emojiCodeSize = 2;

Base64.base64Codes = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.split('');
Base64.base64CodeSize = 1;