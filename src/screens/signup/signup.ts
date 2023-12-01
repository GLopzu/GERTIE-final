import { Home, SignUpCard } from "../../components/export";

export default class SignUp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
        console.log("signup");
    }

    render() {
        const container = this.ownerDocument.createElement('div');
        const home = this.ownerDocument.createElement('home-button');
        
        const background = this.ownerDocument.createElement('img');
        background.src = '../src/assets/backround/backround 2.jpg';  
        background.style.width = '100%';
        background.style.height = '100%';
        background.style.position = 'absolute';
        background.style.top = '0';
        background.style.left = '0';
        background.style.zIndex = '-1'; 

        container.style.position = 'relative';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.justifyContent = 'center';
        container.style.alignItems = 'center';
        container.style.height = '100vh';

        home.style.marginRight = '50%';

        const signupCardContainer = this.ownerDocument.createElement('div');
        signupCardContainer.style.position = 'absolute';
        signupCardContainer.style.top = '50%';
        signupCardContainer.style.transform = 'translateY(-50%)';
        signupCardContainer.style.marginLeft = '30%';

        const signupcard = this.ownerDocument.createElement('card-signup');
        signupCardContainer.appendChild(signupcard);

        container.appendChild(home);
        container.appendChild(signupCardContainer);

        this.shadowRoot?.appendChild(container);
        this.shadowRoot?.appendChild(background);
    }
}

customElements.define('screen-signup', SignUp);
