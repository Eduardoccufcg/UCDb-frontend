class HeaderMenu extends HTMLElement {
    constructor() {
        super();
        this.$shadow = this.attachShadow({ mode: 'open' });
        this.logoutEvent = new CustomEvent('logout', {
            bubbles: true,
            cancelable: false,
            composed: true
        });
    }

    connectedCallback() {
        this.logged = this.getAttribute('logged');
        this.username = this.getAttribute('username');
        this.render();
        this.addEventLogout();
    }

    addEventLogout() {
        const $buttonLogout = this.$shadow.querySelector('#logout');
        if (this.$shadow.contains($buttonLogout)) {
            $buttonLogout.addEventListener('click', () => {
                this.dispatchEvent(this.logoutEvent)
            });
        }
    }

    getMenuUser() {
        if (this.logged === 'true' || this.logged === '1') {
            return `<li id="logout"><a href="#">Sair</a></li>`;
        } else {
            return '<li><a href="../login/index.html">Entrar</a></li>';
        }
    }

    getUserLogged() {
        if (this.logged === 'true' || this.logged === 1) {
            return `
            <div id="user-logged"> ${this.username}</div>`;
        }

        return '';
    }

    render() {
        this.$shadow.innerHTML = `
        <style>
            header {
                display: grid;
                grid-template-columns: 1fr auto auto;
                grid-template-areas: "logo user menu";
                grid-column-gap: 1em;
                align-items: center;
                background-color: #002f55;
                color: #fff;
                font-weight: bold;
                height: 60px;
                justify-content: center;
                width: 100%;
                padding: 0 20px;
            }
            header .brand {
                grid-area: logo;
                justify-self: start;
            }
            header .brand img {
                height: 40px;
            }
            header nav {
                grid-area: menu;
                justify-self: end;
            }
            header ul {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            header ul li {
                display: inline;
                text-transform: uppercase;
            }
            header ul li a {
                padding: 10px;
                display: inline-block;
                color: #fff;
                text-decoration: none;
                border-bottom:3px solid #2b87e9;
            }
            header ul li a:hover {
                color: #2b87e9;
                border-bottom:3px solid #285daf;
            }
            header #user-logged {
                grid-area: user;
                align-content: center;
                justify-self: center;
                border-right: 1px dashed #2b87e9;
                padding: 0 10px;
                height: 50%;
            }
        </style>
        <header>
            <div class="brand">
                <img src="../../logo_light.png" alt="UCDb">
            </div>
            ${this.getUserLogged()}
            <nav id="menu">
                <ul class="nav">
                    <li><a href="../home/index.html">Início</a></li>
                    ${this.getMenuUser()}
                </ul>
            </nav>
        </header>`;
    }
}

window.customElements.define('header-menu', HeaderMenu);
