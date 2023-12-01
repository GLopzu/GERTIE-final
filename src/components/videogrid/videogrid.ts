import { VideoCard } from "../export";

export default class VideoGrid extends HTMLElement {
    constructor() {
        super();
        console.log("Constructor de app-navbar o app-videogrid");
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const container = this.ownerDocument.createElement('div');
        container.classList.add('grid-container');

        const video1 = new VideoCard();
        const video2 = new VideoCard();
        const video3 = new VideoCard();
        const video4 = new VideoCard();
        const video5 = new VideoCard();
        const video6 = new VideoCard();
        const video7 = new VideoCard();
        const video8 = new VideoCard();
        const video9 = new VideoCard();
        const video10 = new VideoCard();
        const video11 = new VideoCard();
        const video12 = new VideoCard();

        container.appendChild(video1);
        container.appendChild(video2);
        container.appendChild(video3);
        container.appendChild(video4);
        container.appendChild(video5);
        container.appendChild(video6);
        container.appendChild(video7);
        container.appendChild(video8);
        container.appendChild(video9);
        container.appendChild(video10);
        container.appendChild(video11);
        container.appendChild(video12);



        const styles = document.createElement('style');
        styles.textContent = `
            .grid-container {
                margin-top: 86px;
                margin-left: 120px;
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                grid-template-rows: repeat(3, 1fr);
                column-gap: 80px;
                padding: 80px 100px 0 1px;
            }
        `;

        this.shadowRoot?.appendChild(styles);
        this.shadowRoot?.appendChild(container);
    }
}

customElements.define('app-videogrid', VideoGrid);
