class AlertMessage extends HTMLElement {
    constructor() {
        super();
        this.$shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.message = this.getAttribute('message');
        this.type = this.getAttribute('type');
        this.setType();
        this.render();
    }

    setType() {
        if(this.type === 'error') {
            this.classList.add('alert-danger');
        } else if (this.type === 'success') {
            this.classList.add('alert-success');
        }
    }

    render() {
        this.$shadow.innerHTML = `
        <style>
            .alert {
                background-color: #29A1C5;
                border-radius: 5px;
                color: #fff;
                font-size: 20px;
                margin-bottom: 20px;
                padding: 15px 10px 15px 20px;
            }
            .alert-danger {
                background-color: #E53A39;
            }
            .alert-success {
                background-color: #3AC05F;
            }
            .close { 
                margin-left: 15px; 
                color: #fff; 
                font-weight: bold; 
                float: right; 
                font-size: 30px; 
                line-height: 20px; 
                cursor: pointer; 
                transition: 0.3s; 
            }
            .close:hover { 
                color: black;
            }
        </style>
        <div class="alert">
            <span class="close" onclick="this.parentElement.style.display='none';">&times;</span>
            ${this.message}
        </div>`;
    }
}

window.customElements.define('alert-message', AlertMessage);
