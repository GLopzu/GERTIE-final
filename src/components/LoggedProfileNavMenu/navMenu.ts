import { AppLogout } from "../export";



export default class NavMenu extends HTMLElement {
    private container!: HTMLDivElement;

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.render();
    }

    connectedCallback() {
      this.container = this.shadowRoot!.querySelector('.menu-container') as HTMLDivElement;

      this.container.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('toggle-menu'));
      });
    }

    render() {
      const container = document.createElement('div');
      container.className = 'menu-container';

      const profileComponent = document.createElement('app-profile');
      const logoutComponent = document.createElement('app-logout');

      container.appendChild(profileComponent);
      container.appendChild(logoutComponent);

      const style = document.createElement('style');
      style.textContent = `
        :host {
          position: absolute;
          top: 75px;
          right: 0;
          z-index: 100;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease-in-out;
          margin-right: 10px;
        }

        .visible {
          opacity: 1;
          pointer-events: auto;
        }

        .menu-container {
          background-color: rgb(26, 26, 26);
          border: 0px solid #ccc;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.2);
          padding: 10px;
          border-radius: 3%;
          color: #fff;
          font-family: 'Arial', sans-serif;
        }
      `;

      this.shadowRoot?.appendChild(style);
      this.shadowRoot?.appendChild(container);
    }
}

customElements.define('nav-menu', NavMenu);