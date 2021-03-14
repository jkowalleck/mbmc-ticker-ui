class BinaryString extends String {
    static fromBuffer(buffer) {
        const bytes = new Uint8Array(buffer);
        const firstZero = bytes.findIndex(b => b === 0);
        const charcodes = bytes.slice(0, firstZero);
        return BinaryString.fromCharCode.apply(null, charcodes);
    }
}
