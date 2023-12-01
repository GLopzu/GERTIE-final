import firebase from "../../utils/firebase";
import { Home, Searchbar, UserProfileImg, UserProfileImgLogged } from "../export";

export default class AppNavbar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const container = this.ownerDocument.createElement('div');
        container.classList.add('navbar-container');

        const home = new Home();
        const searchbar = new Searchbar();

        const userProfileComponent = firebase.getCurrentUser() ? new UserProfileImgLogged() : new UserProfileImg();

        container.appendChild(home);
        container.appendChild(searchbar);
        container.appendChild(userProfileComponent);

        const styles = document.createElement('style');
        styles.textContent = `
            .navbar-container {
                position: fixed;
                top: 0;
                right: 0;
                left: 0;
                height: 70px;
                z-index: 2020;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 20px; /* Ajusté los valores de padding */
                background-color: var(--bg-color); /* Cambié a un color fijo para simplificar */
            }
        `;

        this.shadowRoot?.appendChild(styles);
        this.shadowRoot?.appendChild(container);
    }
}

customElements.define('app-navbar', AppNavbar);
