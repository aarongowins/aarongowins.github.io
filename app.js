var app = {
    startup: function () {
        // get pointer to dom elements and add them as properties of the app
        this.resultEl = document.getElementById('result');
        this.encodeText = document.getElementById('encodeText');
        this.decodeText = document.getElementById('decodeText');

        // add event handlers
        document.getElementById('encodeButton').addEventListener('click', function () {
            var txt = this.encodeText.value || 0;

            this.resultEl.innerHTML = coder.encode(txt);
        }.bind(this));

        document.getElementById('decodeButton').addEventListener('click', function () {
            var txt = this.decodeText.value || '0000',
                args = [txt.substr(0, 2), txt.substr(2, 2)];

            this.resultEl.innerHTML = coder.decode(args[0], args[1]);
        }.bind(this));
    }
};
