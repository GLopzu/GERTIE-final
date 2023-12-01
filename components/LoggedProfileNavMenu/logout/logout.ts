import { dispatch } from "../../../store";
import { navigate } from "../../../store/actions";
import { Screens } from "../../../types/store";
import firebase from "../../../utils/firebase";

export default class AppLogout extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  render() {
    const button = document.createElement('button');
    button.textContent = 'Logout';
    button.style.backgroundColor = '#C91D3C';
    button.style.color = '#fff';
    button.style.padding = '8px 16px';
    button.style.border = 'none';
    button.style.borderRadius = '4px';
    button.style.cursor = 'pointer';

    const style = document.createElement('style');
    style.textContent = `
      button {
        background-color: #C91D3C;
        color: #fff;
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
    `;

    this.shadowRoot?.appendChild(style);
    this.shadowRoot?.appendChild(button);
  }

  addEventListeners() {
    const button = this.shadowRoot?.querySelector('button');
    if (button) {
      button.addEventListener('click', async () => {
        console.log('Logout button clicked');
        await firebase.logOut(); 
        dispatch(navigate(Screens.LOGIN));
      });
    }
  }
}

customElements.define('app-logout', AppLogout);