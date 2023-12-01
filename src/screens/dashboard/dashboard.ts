import { Navbar, VideoGrid } from "../../components/export";


export default class Dashboard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" })
    }
    connectedCallback() {
        this.render()
        
    }

    render() {
        const navbar = this.ownerDocument.createElement('app-navbar');
        this.shadowRoot?.appendChild(navbar)
        const video = this.ownerDocument.createElement('app-videogrid');
        this.shadowRoot?.appendChild(video)

    }
}




customElements.define('screen-dashboard', Dashboard)