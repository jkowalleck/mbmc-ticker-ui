function getData (example) {
	fetch('../examples/get/' + example)
	.then(response => response.blob())
	.then(data => TickerArray.fromBlob(data));
}

function getDataFull () {
	getData('all_fill_max');
}


function getDataSome () {
	getData('some');
}
