
import { navigate } from "../../store/actions";
import { dispatch } from "../../store/index";
import { Screens } from "../../types/store";

export default class Home extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const container = this.ownerDocument.createElement('section');
        const homeimg = this.ownerDocument.createElement('img');
        homeimg.src = "../src/assets/gertie_logo.png";

        homeimg.addEventListener('click', () => {
            dispatch(navigate(Screens.DASHBOARD));
        });

        const style = this.ownerDocument.createElement('style');
        style.textContent = `
            :host {
                display: block;
                padding-right: 10px;
                width: 200px;
                height: 56px;
                border-radius: 10%;
                object-fit: contain;
                cursor: pointer;
            }
        `;

        container.appendChild(homeimg);
        this.shadowRoot?.appendChild(style);
        this.shadowRoot?.appendChild(container);
    }
}

customElements.define('home-button', Home);

