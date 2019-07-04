class SubjectItem extends HTMLElement {
    constructor() {
        super();
        this.$shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.code = this.getAttribute('code');
        this.name = this.getAttribute('name');
        this.showDetail = this.getAttribute('show-detail');
        this.render();

        this.detailEvent = new CustomEvent('detail', {
            bubbles: true,
            cancelable: false,
            composed: true,
            detail: {
                code: this.code,
                name: this.name
            }
        });

        this.addEventDetail();
    }

    showButtonDetail() {
        if (this.showDetail === 'true' || this.showDetail === '1') {
            return `
                <div class="detail">
                    <button>Visualizar</button>
                </div>`;
        }

        return '';
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
            <div class="subject-item">
                <p class="code">${this.code}</p>
                <p class="name">
                   ${this.name}
                </p>
                ${this.showButtonDetail()}
            </div>
        `;
    }

    getStyle() {
        return `
            <style>
                .subject-item {
                    display: grid;
                    grid-template-columns: 7% auto auto;
                    grid-template-areas: "code name detail";
                    grid-column-gap: 1em;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
                    background-color: #fff;
                    margin-bottom: 15px;
                    padding: 2px 16px;
                    transition: 0.3s;
                }
                .subject-item:hover {
                    background-color: #c6def1;
                    border: 1px solid #fff;
                    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
                }
                .code {
                    grid-area: code;
                    justify-self: center;
                    align-self: center;
                    color: #2c7fe9;
                    font-size: 1.5em;
                    font-weight: bolder;
                    text-align: right;
                }
                .name {
                    grid-area: name;
                    font-size: 1.3em;
                }
                .subject-item .detail {
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

window.customElements.define('subject-item', SubjectItem);
