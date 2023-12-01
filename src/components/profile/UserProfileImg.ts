import { dispatch } from "../../store";
import { navigate } from "../../store/actions";
import { Screens } from "../../types/store";

export default class UserProfileImg extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    static get observedAttributes() {
        return ['logged'];
    }

    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        if (name === 'logged') {
            this.render();
        }
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) this.shadowRoot.innerHTML = '';

        const container = this.ownerDocument.createElement('section');
        const profileimg = this.ownerDocument.createElement('img');
        profileimg.src = "../src/assets/profile.jpg";
        profileimg.addEventListener('click', () => {
            dispatch(navigate(Screens.LOGIN));
        });

        const style = this.ownerDocument.createElement('style');
        style.textContent = `
            img {
                padding-right: 10px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                object-fit: cover;
                cursor: pointer; 
            }
        `;

        container.appendChild(profileimg);
        this.shadowRoot?.appendChild(style);
        this.shadowRoot?.appendChild(container);
    }
}

customElements.define('app-userimg', UserProfileImg);