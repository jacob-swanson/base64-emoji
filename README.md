# base64-emoji
ES6 base64 implementation that can use unicode (targeted towards emoji)

Installation:
```bash
npm install --save @jacob-swanson/base64-emoji
```

Sample code:
```javascript
import Base64 from '@jacob-swanson/base64-emoji';

let base64 = new Base64();
console.log(base64.encode('abcdefg')); // YWJjZGVmZz==
console.log(base64.decode('YWJjZGVmZz==')); // abcdefg

let emoji64 = new Base64(Base64.emojiCodes, Base64.emojiCodeSize);
console.log(emoji64.encode('abcdefg')); // 😘😖😉😣😙😆😕😦😙😳🙀🙀
console.log(emoji64.decode('😘😖😉😣😙😆😕😦😙😳🙀🙀')); // abcdefg
```

The set of codes can be any set of 65 characters of the same size.
