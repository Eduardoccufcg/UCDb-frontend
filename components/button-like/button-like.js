class ButtonLike extends HTMLElement {

    constructor() {
        super();
        this.$shadow = this.attachShadow({ mode: 'open' });
        this.likeEvent = new CustomEvent('like', {
            bubbles: true,
            cancelable: false,
            composed: true,
        });
    }

    static get observedAttributes() {
        return [ 'counter', 'liked' ];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'liked':
                this.liked = eval(newValue);
                break;
            case 'counter':
                this.counter = eval(newValue);
                break;
        }

        if (oldValue !== null) {
            this.toLike();
        }
    }

    connectedCallback() {
        this.liked = eval(this.getAttribute('liked'));
        this.counter = eval(this.getAttribute('counter'));
        this.render();
        this.addEvent();
        this.toLike();
    }

    addEvent() {
        const $button = this.$shadow.querySelector('button');
        $button.addEventListener('click', event => {
            event.preventDefault();
            this.dispatchEvent(this.likeEvent);
            this.toggleLike();
        });
    }

    toggleLike() {
        this.counter = this.liked ? this.counter - 1 : this.counter + 1;
        this.liked = !this.liked;
        this.toLike();
    }

    toLike() {
        const $button = this.$shadow.querySelector('button');
        const $textLike = this.$shadow.querySelector('span.text');
        const $counter = this.$shadow.querySelector('span.counter strong');

        if (this.liked) {
            $textLike.innerHTML = 'Curtiu';
            $button.classList.add('liked');
        } else {
            $textLike.innerHTML = 'Curtir';
            $button.classList.remove('liked');
        }

        $counter.innerHTML = this.counter;
    }

    render() {
        this.$shadow.innerHTML = `
        ${this.getStyle()}
        <button>
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" class="svg-inline--fa fa-heart fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>
            <span class="text"></span>
        </button>
        <span class="counter">
            <strong>${this.counter}</strong> curtidas
        </span>`;
    }

    /**
     * Return the style of component.
     * @returns {string}
     */
    getStyle() {
        return `
            <style>
                button {
                    align-items: center;
                    background-color: #fff;
                    border: 2px solid #fff;
                    border-radius: 5px;
                    color: #002f55;
                    cursor: pointer;
                    display: flex;
                    font-size: 14px;
                    font-weight: bold;
                    height: 40px;
                    justify-content: center;
                    margin-top: 20px;
                    padding: 0 20px;
                    transition: all .7s;
                }
                button svg {
                    margin-right: 5px;
                    width: 15px;
                }
                span.counter {
                    color: #ffffff;
                    display: inline-block;
                    font-size: .9em;
                    margin: 5px 0;
                    text-align: center;
                    width: 100%;
                }
                button.liked,
                button:hover{
                    background-color: #2b87e9;
                    color: #fff;
                    border: 2px solid #35ceff;
                }
                button.liked svg,
                button:hover svg { color: #ff3367 }
                button:hover { background: rgba(0,0,0,.15) }
            </style>
        `;
    }
}

window.customElements.define('button-like', ButtonLike);
