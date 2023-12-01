import firebase from "../../utils/firebase";
import { NavMenu } from "../export";

export default class UserProfileImgLogged extends HTMLElement {
  private menuVisible = false; // Inicialmente oculto

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    const userData = await firebase.getCurrentUserFromFirestore();

    const container = this.ownerDocument.createElement('section');
    const profileimg = this.ownerDocument.createElement('img');
    const icon = userData?.icon || '';

    profileimg.src = `../../src/assets/profile_icons/random_icons/${icon}`;

    profileimg.addEventListener('click', () => {
      console.log("click");
      this.toggleMenu();
    });

    const menu = this.ownerDocument.createElement('nav-menu');
    this.updateMenuVisibility(menu);

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

      .visible {
        opacity: 1;
        pointer-events: auto;
      }
    `;

    container.appendChild(profileimg);
    this.shadowRoot?.appendChild(style);
    this.shadowRoot?.appendChild(container);
    this.shadowRoot?.appendChild(menu);

    menu.addEventListener('toggle-menu', () => {
      this.toggleMenu();
    });
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
    const menu = this.shadowRoot?.querySelector('nav-menu') as HTMLElement | null;
    if (menu) {
      this.updateMenuVisibility(menu);
      console.log('Menu visibility toggled:', this.menuVisible);
    }
  }

  updateMenuVisibility(menu: HTMLElement) {
    menu.classList.toggle('visible', this.menuVisible);
  }
}

customElements.define('app-userimg-logged', UserProfileImgLogged);
