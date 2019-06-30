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
    }

    showButtonDetail() {
        if (this.showDetail === 'true' || this.showDetail === '1') {
            return `
                <div class="detail">
                    <a class="button" href="#">Visualizar</a>
                </div>`;
        }

        return '';
    }

    render() {
        this.$shadow.innerHTML = `
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
                    justify-self: center;
                    align-self: center;
                }
                .button {
                    background-color: #fff;
                    border: 5px solid #008CBA;
                    border-radius: 10px;
                    color: #008CBA;
                    padding: 15px 32px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    transition: all 0.2s;
                }
                .button:hover {
                    background-color: #008CBA;
                    color: #fff;
                }
            </style>
            <div class="subject-item">
                <p class="code">${this.code}</p>
                <p class="name">
                   ${this.name}
                </p>
                ${this.showButtonDetail()}
            </div>
        `;
    }
}

window.customElements.define('subject-item', SubjectItem);
