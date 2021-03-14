const _TickerSize = 20;

class Ticker {
	constructor() {
		this.value = ''; // 10 chars
		this.days = 0; // enum 
		this.active = false; // bool
		this.startTime = 0; // minutes since midnight
		this.endTime = 1440; // minutes since midnight
		// this.placeHolder = undefined; // placeholder for later data 
	}

	/*
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
	 * @param {Blob} blob 
	 */
	static async fromBlob (blob) {
		const ticker = new Ticker();
		ticker.value = await blob.slice(0, 10).text();
		ticker.days = blob.slice(10, 11);
		ticker.active = blob.slice(11, 12);
		ticker.startTime = blob.slice(12, 14);
		ticker.endTime = blob.slice(14, 16);
		debugger;
	}

	blob() {
		throw "@TODO not implemented";
	}
}

class Tickers extends Array
{
	/**
	 * 
	 * @param {Blob} blob 
	 */
	static fromBlob (blob) {
		const tickers = new Tickers();
		for (let b = 0; b<blob.size; b+=_TickerSize) {
			tickers.push(
				Ticker.fromBlob(
					blob.slice(b, _TickerSize)));
		}
		return tickers;
	}

	blob() {
		throw "@TODO not implemented";
	}
}
