import "./components/export";
import { navigate } from "./store/actions";
import { addObserver, appState, dispatch } from "./store/index";
import { Screens } from "./types/store";
import "./screens/dashboard/dashboard"
import "./screens/login/login"
import "./screens/videoplayer/videoplayer"
import "./screens/signup/signup"

class AppContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    addObserver(this);
  }

  connectedCallback() {
    this.render();
    console.log(appState)
  }

  render() {
    if (this.shadowRoot) this.shadowRoot.innerHTML = "";

    switch (appState.screen) {
      case Screens.DASHBOARD:
        const dashboard = this.ownerDocument.createElement("screen-dashboard");
        this.shadowRoot?.appendChild(dashboard);
        break;
        case Screens.LOGIN:
          const LogIn = this.ownerDocument.createElement("screen-login");
          this.shadowRoot?.appendChild(LogIn);
          break;
        break;
        case Screens.VIDEOPLAYER:
          const videoplayer = this.ownerDocument.createElement("screen-videoplayer");
          this.shadowRoot?.appendChild(videoplayer);
          break;
        break;

        case Screens.SIGNUP:
          const signup = this.ownerDocument.createElement("screen-signup");
          this.shadowRoot?.appendChild(signup);
          break;
        break;



      default:
        break;
    }
  }
}

customElements.define("app-container", AppContainer);
