class RankingItem extends HTMLElement {
    constructor() {
        super();
        this.$shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.position = this.getAttribute('position');
        this.code = this.getAttribute('code');
        this.name = this.getAttribute('name');
        this.counter = this.getAttribute('counter');
        this.render();

        this.detailEvent = new CustomEvent('detail', {
            bubbles: true,
            cancelable: false,
            composed: true,
            detail: {
                code: this.code,
            }
        });

        this.addEventDetail();
    }

    addEventDetail() {
        const $buttonDetail = this.$shadow.querySelector('button');

        if (this.$shadow.contains($buttonDetail)) {
            $buttonDetail.addEventListener('click', event => {
                event.preventDefault();
                this.dispatchEvent(this.detailEvent)
            });
        }
    }

    render() {
        this.$shadow.innerHTML = `
            ${this.getStyle()}
            <div class="ranking-item">
                <p class="position">${this.position}</p>
                <p class="name">
                   ${this.code} - ${this.name}
                </p>
                <p class="counter">
                   ${this.counter}
                </p>
                <div class="detail">
                    <button>Visualizar</button>
                </div>
            </div>
        `;
    }

    getStyle() {
        return `
            <style>
                .ranking-item {
                    display: grid;
                    grid-template-columns: 7% auto 7% min-content;
                    grid-template-areas: "position subject counter detail";
                    grid-column-gap: 1em;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
                    background-color: #fff;
                    margin-bottom: 15px;
                    padding: 2px 16px;
                    transition: 0.3s;
                }
                .ranking-item:hover {
                    background-color: #c6def1;
                    border: 1px solid #fff;
                    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
                }
                .position {
                    grid-area: position;
                    justify-self: center;
                    align-self: center;
                    color: #2c7fe9;
                    font-size: 1.5em;
                    font-weight: bolder;
                    text-align: right;
                }
                .counter {
                    grid-area: counter;
                    justify-self: end;
                    align-self: center;
                    color: #850300;
                    font-size: 1.3em;
                    font-weight: bolder;
                    text-align: right;
                }
                .name {
                    grid-area: subject;
                    font-size: 1.3em;
                }
                .ranking-item .detail {
                    grid-area: detail;
                    justify-self: end;
                    align-self: center;
                }
                button {
                    padding: 0 20px;
                    height: 40px;
                    background-color: #ffffff;
                    font-size: 14px;
                    color: #3485D0;
                    line-height: 1.2;
                    transition: all .7s;
                    cursor: pointer;
                    font-weight: bold;
                    border-radius: 5px;
                    border: 2px solid #3485D0;
                }
                button:hover {
                    background-color: #3485D0;
                    color: #ffffff;
                }
            </style>
        `;
    }
}

window.customElements.define('ranking-item', RankingItem);
