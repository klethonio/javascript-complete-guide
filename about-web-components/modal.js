class Modal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.isOpen = false;
        this.shadowRoot.innerHTML = `
        <style>
            #backdrop {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100vh;
                background: rgba(0, 0, 0, 0.75);
                z-index: 10;
            }

            #modal {
                position: fixed;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                top: 15vh;
                left: 25%;
                width: 50%;
                border-radius: 3px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
                background: white;
                z-index: 11;
            }

            :host(:not([visible])) #backdrop,
            :host(:not([visible])) #modal {
                display: none !important;
            }

            header {
                padding: 1rem;
                border-bottom: 1px solid #ccc;
            }

            ::slotted(h1), header h1 {
                font-size: 1.25rem;
                margin: 0;
            }

            #main {
                padding: 1rem;
            }

            #actions {
                border-top: 1px solid #ccc;
                padding: 1rem;
                display: flex;
                justify-content: flex-end;
            }

            #actions button {
                margin: 0 0.25rem;
            }

            .hidden {
                display: none !important;
            }
        </style>
        <div id="backdrop"></div>
        <div id="modal">
            <header>
                <slot name="title">
                    <h1>Please confirm</h1>
                </slot>
            </header>
            <section id="main">
                <slot></slot>
            </section>
            <section id="actions">
                <button id="cancel-btn">Cancel</button>
                <button id="confirm-btn">Okay</button>
            </section>
        </div>
        `;

        const slots = this.shadowRoot.querySelectorAll('slot');
        slots[1].addEventListener('slotchange', event => {
            // console.dir(slots[1].assignedNodes());
        });

        const backdrop = this.shadowRoot.getElementById('backdrop');
        const cancelButton = this.shadowRoot.getElementById('cancel-btn');
        const confirmButton = this.shadowRoot.getElementById('confirm-btn');

        backdrop.addEventListener('click', this.#cancel());
        cancelButton.addEventListener('click', this.#cancel());
        // cancelButton.addEventListener('cancel', () => {
        //     console.log('Cancel inside the component...');
        // });
        confirmButton.addEventListener('click', () => this.#confirm());
    }

    // attributeChangedCallback(name, oldValue, newValue) {
    //     if (name === 'visible') {
    //         if (this.hasAttribute('visible')) {
    //             this.isOpen = true;
    //             this.shadowRoot.querySelector('#backdrop').classList.remove('hidden');
    //             this.shadowRoot.querySelector('#modal').classList.remove('hidden');
    //         } else {
    //             this.isOpen = false;
    //             this.shadowRoot.querySelector('#backdrop').classList.add('hidden');
    //             this.shadowRoot.querySelector('#modal').classList.add('hidden');
    //         }
    //     }
    // }

    // static get observedAttributes() {
    //     return ['visible'];
    // }

    open() {
        this.setAttribute('visible', '');
        this.isOpen = true;
    }

    hide() {
        this.removeAttribute('visible');
        this.isOpen = false;
    }

    #cancel() {
        return event => {
            this.hide();
            // bubbles and composed are necessary to make the event bubble up to the parent component
            // bubbles: true - allows the event to bubble up
            // composed: true - allows the event to leave the shadow DOM
            const cancelEvent = new Event('cancel', { bubbles: true, composed: true });
            event.target.dispatchEvent(cancelEvent);
        };
    }

    #confirm() {
        this.hide();
        const confirmEvent = new Event('confirm');
        this.dispatchEvent(confirmEvent);
    }
}

customElements.define('uc-modal', Modal);
