import chai from 'chai';
let expect = chai.expect;
import Base64 from '../src/Base64';

describe('Base64', () => {
    it('Encode Base64', () => {
        let base64 = new Base64();
        expect(base64.encode('abcdefg')).to.equal('YWJjZGVmZz==');
    });

    it('Encode Emoji', () => {
        let emoji64 = new Base64(Base64.emojiCodes, Base64.emojiCodeSize);
        expect(emoji64.encode('abcdefg')).to.equal('😘😖😉😣😙😆😕😦😙😳🙀🙀');
    });

    it('Decode Base64', () => {
        let base64 = new Base64();
        expect(base64.decode('YWJjZGVmZz==')).to.equal('abcdefg');
    });

    it('Decode Emoji', () => {
        let emoji64 = new Base64(Base64.emojiCodes, Base64.emojiCodeSize);
        expect(emoji64.decode('😘😖😉😣😙😆😕😦😙😳🙀🙀')).to.equal('abcdefg');
    });
});
