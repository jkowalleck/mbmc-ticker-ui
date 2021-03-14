function getData (example) {
	fetch('../examples/get/' + example)
	.then(response => response.arrayBuffer())
	.then(buffer => TickerArray.fromArrayBuffer(buffer))
    .then(tickers => console.table(tickers));
}

function getDataFull () {
	getData('all_fill_max');
}


function getDataSome () {
	getData('some');
}

function getDataReal () {
	getData('real');
}
