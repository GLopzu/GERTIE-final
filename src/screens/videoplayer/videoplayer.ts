import { Navbar, VideoInfo, CommentElement } from "../../components/export";
import { getSelectedVideo } from "../../utils/getRandomVideo";

export default class Videoplayer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    console.log("Me debo imprimir");
  }

  render() {
    const navbar = this.ownerDocument.createElement('app-navbar');
    this.shadowRoot?.appendChild(navbar);

    const videoInfo = this.ownerDocument.createElement('app-videoinfo');
    this.shadowRoot?.appendChild(videoInfo);

    const comment = this.ownerDocument.createElement('app-comment');
    const selectedVideo = getSelectedVideo();

    if (selectedVideo !== null) {
      console.log("Video seleccionado:", selectedVideo);
      comment.setAttribute('video-id', selectedVideo.videoId);
      videoInfo.shadowRoot?.appendChild(comment);
    } else {
      console.error("El video seleccionado es nulo.");
    }
  }
}

customElements.define('screen-videoplayer', Videoplayer);
