const _TickerByteLength = 20;
const _TickerBinaryLittleEndian = true;


class Ticker {
    constructor() {
        this.text = '';
        this.days = 0;
        this.active = false;
        this.start = 0;
        this.end = 0;
        // this.placeHolder = undefined; // placeholder for later data
    }

    /**
     * @returns {string}
     */
     get startTime() {
        return Minutes.toTime(this.start);
    }

    /**
     * @param {string} value
     * @returns {Ticker}
     */
    set startTime(value) {
        this.start = Minutes.fromTime(value);
    }

    /**
     * @returns {string}
     */
    get endTime() {
        return Minutes.toTime(this.end);
    }

    /**
     * @param {string} value
     * @returns {Ticker}
     */
    set endTime(value) {
        this.end = Minutes.fromTime(value);
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
        ticker.start = dv.getUint16(12, _TickerBinaryLittleEndian);
        ticker.end = dv.getUint16(14, _TickerBinaryLittleEndian);
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
        dv.setUint16(12, this.start, _TickerBinaryLittleEndian);
        dv.setUint16(14, this.end, _TickerBinaryLittleEndian);
        return buffer;
    }

}

class TickerArray {

    constructor ()
    {
        this.data = [];
    }

    /**
     * @param {ArrayBuffer} buffer
     * @returns {TickerArray}
     */
    static fromArrayBuffer(buffer) {
        const tickers = new TickerArray();
        for (let begin = 0; begin < buffer.byteLength; begin += _TickerByteLength) {
            tickers.data.push(
                Ticker.fromArrayBuffer(
                    buffer.slice(begin, begin + _TickerByteLength)));
        }
        return tickers;
    }

    /**
     * @returns {ArrayBuffer}
     */
    arrayBuffer() {
        const data = new Uint8Array(this.data.length * _TickerByteLength);
        for (let i = 0; i < this.data.length; ++i) {
            data.set(
                new Uint8Array(this.data[i].arrayBuffer()),
                i * _TickerByteLength, _TickerByteLength
            );
        }
        return data.buffer;
    }

}
