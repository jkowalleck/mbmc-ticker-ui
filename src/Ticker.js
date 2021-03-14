const _TickerByteLength = 20;
const _TickerBinaryLittleEndian = true;

class Ticker {
    constructor() {
        this.text = ''; // 10 chars
        this.days = 0; // enum
        this.active = false; // bool
        this.startTime = 0; // minutes since midnight
        this.endTime = 0; // minutes since midnight
        // this.placeHolder = undefined; // placeholder for later data
    }

    /* binary representation as of C++ code
    struct TickerConfig
    {
        char ticker[10];              //Byte 0-9
        byte days;                    //Byte 10
        bool active;                  //Byte 11
        unsigned short int startTime; //Byte 12-13
        unsigned short int endTime;   //Byte 14-15
        unsigned int placeHolder;     //Byte 16-19
    };
    */

    /**
     *
     * @param {ArrayBuffer} buffer
     * @throws Error when buffer has invalid length
     * @returns {Ticker}
     */
    static fromArrayBuffer(buffer) {
        if (_TickerByteLength !== buffer.byteLength) {
            throw Error('invalid buffer');
        }
        const ticker = new Ticker();
        ticker.text = BinaryString.fromBuffer(buffer, 0, 10);
        const dv = new DataView(buffer);
        ticker.days = dv.getUint8(10);
        ticker.active = 0 !== dv.getUint8(11);
        ticker.startTime = dv.getUint16(12, _TickerBinaryLittleEndian);
        ticker.endTime = dv.getUint16(14, _TickerBinaryLittleEndian);
        return ticker;
    }

    /**
     * @returns {ArrayBuffer}
     */
    arrayBuffer() {
        const buffer = new ArrayBuffer(_TickerByteLength);
        BinaryString.toBuffer(this.text, buffer, 0, 10);
        const dv = new DataView(buffer);
        dv.setInt8(10, this.days);
        dv.setUint8(11, this.active ? 1 : 0);
        dv.setUint16(12, this.startTime, _TickerBinaryLittleEndian);
        dv.setUint16(14, this.endTime, _TickerBinaryLittleEndian);
        return buffer;
    }

}

class TickerArray extends Array {

    /**
     *
     * @param {ArrayBuffer} buffer
     * @returns {TickerArray}
     */
    static fromArrayBuffer(buffer) {
        const tickers = new TickerArray();
        for (let begin = 0; begin < buffer.byteLength; begin += _TickerByteLength) {
            tickers.push(
                Ticker.fromArrayBuffer(
                    buffer.slice(begin, begin + _TickerByteLength)));
        }
        return tickers;
    }

    /**
     * @returns {ArrayBuffer}
     */
    arrayBuffer() {
        const data = new Uint8Array(this.length * _TickerByteLength);
        for (let i = 0; i < this.length; ++i) {
            data.set(
                new Uint8Array(this[i].arrayBuffer()),
                i * _TickerByteLength, _TickerByteLength
            );
        }
        return data.buffer;
    }

}
