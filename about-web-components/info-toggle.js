class InfoToggle extends HTMLElement {
    constructor() {
        super();
        this._isVisible = false;
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                #info-box {
                    display: none;
                    background-color: #5555FF;
                    color: white;
                    padding: 10px;
                }
            </style>
            <button>Show</button>
            <p id="info-box">
                <slot></slot>
            </p>
        `;
        this._toggleButton = this.shadowRoot.querySelector('button');
        this._infoBox = this.shadowRoot.getElementById('info-box');
        this._toggleButton.addEventListener('click', this._toggleInfoBox.bind(this));
    }

    connectedCallback() {
        if (this.getAttribute('visible') === 'true') {
            this._isVisible = true;
            this._infoBox.style.display = 'block';
            this._toggleButton.textContent = 'Hide';
        }
    }

    _toggleInfoBox() {
        this._isVisible = !this._isVisible;
        this._infoBox.style.display = this._isVisible ? 'block' : 'none';
        this._toggleButton.textContent = this._isVisible ? 'Hide' : 'Show';
    }
}

customElements.define('uc-info-toggle', InfoToggle);
