const _TickerByteLength = 20;
const _TickerBinaryLittleEndian = true;

class Ticker {
    constructor() {
        this.text = ''; // 10 chars
        this.days = 0; // enum
        this.active = false; // bool
        this.startTime = 0; // minutes since midnight
        this.endTime = 1440; // minutes since midnight
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
        //Byte 20 -> nächster Datensatz
    };
    */



    /**
     *
     * @param {ArrayBuffer} buffer
     */
    static fromArrayBuffer(buffer) {
        if (_TickerByteLength !== buffer.byteLength) {
            throw Error('invalid buffer');
        }
        const dv = new DataView(buffer);
        const ticker = new Ticker();
        ticker.text = BinaryString.fromBuffer(buffer.slice(0, 10));
        ticker.days = dv.getUint8(10);
        ticker.active = 0 !== dv.getUint8(11);
        ticker.startTime = dv.getUint16(12, _TickerBinaryLittleEndian);
        ticker.endTime = dv.getUint16(14, _TickerBinaryLittleEndian);
        return ticker;
    }

    arrayBuffer() {
        throw "@TODO not implemented";
    }

}

class TickerArray extends Array {
    /**
     *
     * @param {ArrayBuffer} buffer
     */
    static fromArrayBuffer(buffer) {
        const tickers = new TickerArray();
        for (let begin = 0; begin < buffer.byteLength; begin += _TickerByteLength) {
            tickers.push(
                Ticker.fromArrayBuffer(
                    buffer.slice(begin, begin+_TickerByteLength)));
        }
        return tickers;
    }

    arrayBuffer() {
        throw "@TODO not implemented";
    }
}
