const BinaryString = {

    /**
     * @param {ArrayBuffer} buffer
     * @param {integer} [offset]
     * @param {integer} [length]
     * @returns BinaryString
     */
    fromBuffer: function (buffer, offset, length) {
        const bytes = new Uint8Array(buffer, offset, length);
        const firstZero = bytes.findIndex(b => b === 0);
        const charcodes = bytes.slice(0, firstZero);
        return String.fromCharCode.apply(null, charcodes);
    },

    /**
     * @param {string} string
     * @param {ArrayBuffer} buffer
     * @param {integer} [offset]
     * @param {integer} [length]
     * @returns {ArrayBuffer}
     */
    toBuffer: function (string, buffer, offset, length) {
        var dv = new DataView(buffer, offset, length);
        for (let c = 0; c < dv.byteLength && c < string.length; ++c) {
            dv.setUint8(c, string.charCodeAt(c));
        }
        for (let filler = string.length; filler < dv.byteLength; ++filler) {
            dv.setUint8(filler, 0);
        }
        return buffer;
    }

}
