class Tooltip extends HTMLElement {
    constructor() {
        super();
        this._tooltipVisible = false;
        this._tooltipContainer;
        this._tooltipIcon;
        this._tooltipText = 'Tooltip text.';
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host(.important) {
                    position: relative;
                    padding: 0.2rem; 
                    background: var(--color-primary, #ccc);
                }

                :host-context(p) {
                    font-weight: bold;
                }

                div {
                    position: absolute;
                    top: 1.5rem;
                    left: 0.75rem;
                    z-index: 10;
                    font-weight: normal;
                    background-color: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 0.15rem;
                    border-radius: 3px;
                    box-shadow: 1px 1px 6px rbga(0,0,0,0.26);
                }

                /* doesn't apply to the slotted element */
                .highlight {
                    background-color: red;
                }

                ::slotted(.highlight) {
                    background-color: red; /* override by light DOM styles */
                    border-bottom: 2px dotted red;
                }

                .icon {
                    background: black;
                    color: white;
                    padding: 0.2rem 0.5rem;
                    text-align: center;
                    border-radius: 50%;
                }
            </style>
            <slot>Some default</slot>
            <span class="icon">?</span>
        `;
    }

    static get observedAttributes() {
        return ['text'];
    }

    connectedCallback() {
        if (this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text');
        }
        this._tooltipIcon = this.shadowRoot.querySelector('span');
        this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
        // this.style.position = 'relative'; // replaced in the :host block
        this._render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        if (name === 'text') {
            this._tooltipText = newValue;
        }
    }

    disconnectedCallback() {
        // This is not necessary since when we delete an element from the DOM the browser does the clean up job on these listeners
        this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip); // This is different than this._showTooltip.bind(this), will not work
        this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip);
    }

    _render() {
        if (this._tooltipVisible) {
            this._tooltipContainer = document.createElement('div');
            this._tooltipContainer.textContent = this._tooltipText;
            this.shadowRoot.appendChild(this._tooltipContainer);
            this._tooltipVisible = false;
        } else if (this._tooltipContainer) {
            this.shadowRoot.removeChild(this._tooltipContainer);
        }
    }

    _showTooltip() {
        // this._tooltipContainer = document.createElement('div');
        // this._tooltipContainer.textContent = this._tooltipText;
        // this.shadowRoot.appendChild(this._tooltipContainer);
        this._tooltipVisible = true;
        this._render();
    }

    _hideTooltip() {
        // this.shadowRoot.removeChild(this._tooltipContainer);
        this._tooltipVisible = false;
        this._render();
    }
}

customElements.define('uc-tooltip', Tooltip);
