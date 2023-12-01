import { Home, LogInCard } from "../../components/export";
import { navigate } from "../../store/actions";
import { dispatch } from "../../store/index";
import { Screens } from "../../types/store";

export default class LogIn extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
        console.log("login");
        
    }

    render() {
        const container = this.ownerDocument.createElement("div");
        const home = this.ownerDocument.createElement("home-button");

        const background = this.ownerDocument.createElement("img");
        background.src = "../src/assets/backround/backround 1.jpg";
        background.style.width = "100%";
        background.style.height = "100%";
        background.style.position = "absolute";
        background.style.top = "0";
        background.style.left = "0";
        background.style.zIndex = "-1";

        container.style.position = "relative";
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.justifyContent = "center";
        container.style.alignItems = "center";
        container.style.height = "100vh";

    
        home.style.marginRight = "50%";

        const logInCardContainer = this.ownerDocument.createElement("div");
        logInCardContainer.style.position = "absolute";
        logInCardContainer.style.top = "50%";
        logInCardContainer.style.transform = "translateY(-50%)";

        logInCardContainer.style.marginLeft = "30%";

        const logInCard = this.ownerDocument.createElement("card-login");
        logInCardContainer.appendChild(logInCard);

        container.appendChild(home);
        container.appendChild(logInCardContainer);

        this.shadowRoot?.appendChild(container);
        this.shadowRoot?.appendChild(background);
    }
}

customElements.define("screen-login", LogIn);
