function getData(example) {
    fetch('../examples/get/' + example)
        .then(response => response.arrayBuffer())
        .then(buffer => TickerArray.fromArrayBuffer(buffer))
        .then(tickers => console.table(tickers));
}

function makeData(example) {
    fetch('../examples/get/' + example)
        .then(response => response.arrayBuffer())
        .then(buffer => TickerArray.fromArrayBuffer(buffer))
        .then(tickers => tickers.arrayBuffer())
        .then(buffer => buffer2hex(buffer));
}

function getDataFull() {
    getData('all_fill_max');
}


function getDataSome() {
    getData('some');
}

function dataReal() {
    getData('real');
    makeData('real');
}

function testFoo () {
    const ts = new TickerArray();

    t = new Ticker();
    t.text = 'hallo'; // 10 chars
    t.days = 1; // enum
    t.active = false; // bool
    t.startTime = 23; // minutes since midnight
    t.endTime = 0; // minutes since midnight
    ts.push(t);

    t = new Ticker();
    t.text = 'Welt'; // 10 chars
    t.days = 0; // enum
    t.active = false; // bool
    t.startTime = 0; // minutes since midnight
    t.endTime = 1337; // minutes since midnight
    ts.push(t);

    t = new Ticker();
    t.text = ''; // 10 chars
    t.days = 0; // enum
    t.active = false; // bool
    t.startTime = 0; // minutes since midnight
    t.endTime = 0; // minutes since midnight
    ts.push(t);

    t = new Ticker();
    t.text = 'Du'; // 10 chars
    t.days = 0; // enum
    t.active = false; // bool
    t.startTime = 0; // minutes since midnight
    t.endTime = 42; // minutes since midnight
    ts.push(t);

    t = new Ticker();
    t.text = 'bist ein'; // 10 chars
    t.days = 0; // enum
    t.active = false; // bool
    t.startTime = 0; // minutes since midnight
    t.endTime = 0; // minutes since midnight
    ts.push(t);

    t = new Ticker();
    t.text = 'doedel,'; // 10 chars
    t.days = 0; // enum
    t.active = false; // bool
    t.startTime = 0; // minutes since midnight
    t.endTime = 0; // minutes since midnight
    ts.push(t);

    t = new Ticker();
    t.text = 'junge!'; // 10 chars
    t.days = 3; // enum
    t.active = true; // bool
    t.startTime = 1440; // minutes since midnight
    t.endTime = 1440; // minutes since midnight
    ts.push(t);

    const buffer = ts.arrayBuffer();
    buffer2hex(buffer);

    const tickersAgain = TickerArray.fromArrayBuffer(buffer);
    console.table(tickersAgain);
}

/**
 *
 * @param {ArrayBuffer} buffer
 */
function buffer2hex(buffer) {
   const bytes = new Uint8Array(buffer);
   const list = Array(...bytes);
   console.info(
       list.map(b => b.toString(16).padStart(2, '0').toUpperCase()).join('')
   );
}
