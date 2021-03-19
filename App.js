

const app = new Vue({
    data: {
        apiBase: null,
        tickers: null
    },
    methods: {
        load: function (event) {
            const self = this;
            fetch(self.apiBase + 'get',
                {
                    method: 'GET',
                    mode: 'no-cors',
                    cache: 'no-store',
                    // redirect: 'error',
                    referrer: 'no-referrer',
                    referrerPolicy: 'no-referrer',
                    keepalive: false
                })
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.arrayBuffer();
                })
                .then(buffer => TickerArray.fromArrayBuffer(buffer))
                .then(tickers => { self.tickers = tickers.data; })
                .catch(error => alert(error.message));
        },
        save: function (event) {
            const self = this;
            fetch(self.apiBase + 'set',
                {
                    method: 'POST',
                    body: buffer,
                    mode: 'no-cors',
                    cache: 'no-store',
                    redirect: 'error',
                    referrer: 'no-referrer',
                    referrerPolicy: 'no-referrer',
                    keepalive: false
                    // @TODO integrity
                })
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response;
                })
                .catch(error => alert(error.message));
        }
    }
});

window.onload = function () {
    app.$mount('#app');

    let apiBase = (window.location.hash || '#').slice(1);
    if ('' === apiBase) {
        alert('missing apiBase');
        return;
    }
    if ('/' !== apiBase.slice(-1)) {
        apiBase += '/';
    }

    app.apiBase = apiBase;

    app.load();
};
