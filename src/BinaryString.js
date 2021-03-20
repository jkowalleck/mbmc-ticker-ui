export default {

    /**
     * @param {ArrayBuffer} buffer
     * @param {number} [offset] integer
     * @param {number} [length] integer
     * @returns String
     */
    fromBuffer: function (buffer, offset, length) {
        const bytes = new Uint8Array(buffer, offset, length);
        const firstZero = bytes.findIndex(b => b === 0);
        const charCodes = bytes.slice(0, firstZero);
        return String.fromCharCode.apply(null, charCodes);
    },

    /**
     * @param {string} string
     * @param {ArrayBuffer} buffer
     * @param {number} [offset]
     * @param {number} [length] integer
     * @returns {ArrayBuffer}
     */
    toBuffer: function (string, buffer, offset, length) {
        const dv = new DataView(buffer, offset, length);
        for (let c = 0; c < dv.byteLength && c < string.length; ++c) {
            dv.setUint8(c, string.charCodeAt(c));
        }
        for (let filler = string.length; filler < dv.byteLength; ++filler) {
            dv.setUint8(filler, 0);
        }
        return buffer;
    }

}
