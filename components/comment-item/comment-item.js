class CommentItem extends HTMLElement {
    constructor() {
        super();
        this.$shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.code = this.getAttribute('code');
        this.message = this.getAttribute('message');
        this.author = this.getAttribute('author');

        if (!this.hasAttribute('show-remove')) {
            this.showRemove = false;
        } else {
            this.showRemove = eval(this.getAttribute('show-remove'));
        }

        if (!this.hasAttribute('date')) {
            this.date = new Date();
        } else {
            this.date = new Date(this.getAttribute('date'));
        }

        this.render();
        this.$shadow
            .querySelector('a.reply')
            .addEventListener('click', event => {
                this.showFormReply(event);
                this.addEventReply();
            });
    }

    showLinkRemove() {
        let linkRemove = '';

        if (this.showRemove) {
            linkRemove = `<a class="remove">Remover</a>`;
            this.addEventRemove();
        }

        return linkRemove;
    }

    formatDate(date) {
        let diff = new Date() - date;
        if (diff < 1000) {
            return 'Agora';
        }

        let sec = Math.floor(diff / 1000);

        if (sec < 60) {
            return sec + ' segundos';
        }

        let min = Math.floor(diff / 60000); // convert diff to minutes
        if (min < 60) {
            return min + ' minutos';
        }

        let datePast = date;
        datePast = [
            '0' + datePast.getDate(),
            '0' + (datePast.getMonth() + 1),
            '' + datePast.getFullYear(),
            '0' + datePast.getHours(),
            '0' + datePast.getMinutes()
        ].map(component => component.slice(-2));

        return datePast.slice(0, 3).join('/') + ' ' + datePast.slice(3).join(':');
    }

    addEventReply() {
        const $formReply = this.$shadow.querySelector('form');
        const $textReply = this.$shadow.querySelector('.text-reply');
        $textReply.focus();

        $formReply.addEventListener('submit', event => {
            event.preventDefault();
            this.dispatchEvent(new CustomEvent('reply', {
                bubbles: true,
                cancelable: false,
                composed: true,
                detail: {
                    message: $textReply.value,
                    code: this.code
                }
            }));
            this.removeFormReply();
        });
    }

    addEventRemove() {
        const $buttonRemove = this.$shadow.querySelector('a.remove');
        $buttonRemove.addEventListener('click', event => {
            event.preventDefault();
            this.dispatchEvent(new CustomEvent('remove', {
                bubbles: true,
                cancelable: false,
                composed: true,
                detail: {
                    code: this.code
                }
            }));

            this.$shadow.removeChild(this.$shadow);
        });
    }

    removeFormReply() {
        const $formReply = this.$shadow.querySelector('form');
        $formReply.innerHTML = '';
    }

    showFormReply(event) {
        event.preventDefault();
        event.target.parentElement.parentElement.querySelector('.form-reply').innerHTML = `
            <textarea class="text-reply" required></textarea>
            <button type="submit" class="send-reply">Responder</button>
            <button type="button" class="cancel">Cancelar</button>
        `;

        const $buttonCancel = this.$shadow.querySelector('button.cancel');
        $buttonCancel.addEventListener('click', () => this.removeFormReply());
    }

    render() {
        this.$shadow.innerHTML = `
        ${this.getStyle()}
        <div class="comment">
            <a class="avatar">
                <img src="avatar.png">
            </a>
            <div class="content">
                <a class="author">${this.author}</a>
                <div class="metadata">
                    <span class="date">${this.formatDate(this.date)}</span>
                </div>
                <div class="text">${this.message}</div>
                <div class="actions">
                    <a class="reply">Responder</a>
                    ${this.showLinkRemove()}
                </div>
                <form class="form-reply" method="post"></form>
            </div>
        </div>
        `;
    }

    getStyle() {
        return `
            <style>
                .comment {
                    position: relative;
                    background: #ffffff;
                    padding: .7em;
                    border: none;
                    line-height: 1.2;
                }
                .comment .avatar{
                    display: block;
                    width: 2.5em;
                    height: auto;
                    float: left;
                    margin: .2em 0 0;
                }
                .avatar img{
                    display: block;
                    margin: 0 auto;
                    width: 100%;
                    height: 100%;
                    border-radius: .25rem;
                }
                .comment>.avatar~.content {
                    margin-left: 3.5em;
                    display: block;
                }
                .comment .author {
                    font-size: 1em;
                    color: rgba(0,0,0,.87);
                    font-weight: bold;
                    color: #285daf;
                }
                .comment .text {
                    margin: .5em 0;
                    font-size: 1em;
                    word-wrap: break-word;
                    color: rgba(0,0,0,.87);
                    line-height: 1.3;
                }
                .comment .metadata{
                    display: inline-block;
                    margin-left: .5em;
                    color: rgba(0,0,0,.4);
                    font-size: .875em;
                }
                .comment .actions { font-size: .875em }
                .comment .actions a {
                    cursor: pointer;
                    display: inline-block;
                    margin: 0 .75em 0 0;
                    color: rgba(0,0,0,.4);
                }
                .comment .actions a:hover { color: #2b87e9 }
                .comment .comments {
                    margin: -1.5em 0 -1em 1.25em;
                    padding: 3em 0 2em 2.25em;
                    box-shadow: -3px 0 0 rgba(34,36,38,.15);
                }
                textarea {
                    border: 1px solid #aaaaaa;
                    color: #666;
                    display: block;
                    font-size: 15px;
                    height: 68px;
                    line-height: 1.2;
                    padding: 15px;
                    margin: 10px 0;
                    width: 100%;
                }
                textarea:focus { border: 1px solid #2c7fe9 }
                button {
                    padding: 0 20px;
                    height: 40px;
                    background-color: #3485D0;
                    font-size: 14px;
                    color: #ffffff;
                    line-height: 1.2;
                    transition: all .7s;
                    cursor: pointer;
                    margin-top: 10px;
                    font-weight: bold;
                    border-radius: 5px;
                }
                button.cancel {
                    background-color: #ffffff;
                    color: #545454;
                }
                button:hover { background-color: #285daf }
                button.cancel:hover { background-color: #EED }
            </style>
        `;
    }
}

window.customElements.define('comment-item', CommentItem);
