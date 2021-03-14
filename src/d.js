function getData (example) {
	fetch('../examples/get/' + example)
	.then(response => response.blob())
	.then(data => Ticker.fromBlob(data));
}

function getDataFull () {
	getData('all_fill_max');
}


function getDataSome () {
	getData('some');
}