# base64-emoji
ES6 base64 implementation that can use emoji

Sample code:
```
let base64 = new Base64();
console.log(base64.encode('abcdefg')); // YWJjZGVmZz==
console.log(base64.decode('YWJjZGVmZz==')); // abcdefg

let emoji64 = new Base64(Base64.emojiCodes, Base64.emojiCodeSize);
console.log(emoji64.encode('abcdefg')); // 😘😖😉😣😙😆😕😦😙😳🙀🙀
console.log(emoji64.decode('😘😖😉😣😙😆😕😦😙😳🙀🙀')); // abcdefg

```
