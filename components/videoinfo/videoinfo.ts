import { getSelectedVideo } from "../../utils/getRandomVideo";

export default class VideoInfo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const selectedVideo = getSelectedVideo();

    if (selectedVideo) {
      const container = this.ownerDocument.createElement('div');
      container.classList.add('video-player-container');

      const videoContainer = this.ownerDocument.createElement('div');
      videoContainer.style.backgroundColor = 'black';

      const video = this.ownerDocument.createElement('video');
      video.controls = true;
      video.autoplay = true;
      video.innerHTML = `<source src="${selectedVideo.iframe}" type="video/mp4">`;
      video.style.width = '100%';
      video.style.height = '75VH ';
      videoContainer.appendChild(video);

      container.appendChild(videoContainer);

      const infoContainer = this.ownerDocument.createElement('div');
      infoContainer.classList.add('video-info-container');

      const title = this.ownerDocument.createElement('h2');
      title.classList.add('video-title');
      title.textContent = selectedVideo.name;

      const authorContainer = this.ownerDocument.createElement('div');
      authorContainer.classList.add('author-container');

      const icon = this.ownerDocument.createElement('img');
      icon.src = selectedVideo.icon;
      icon.classList.add('circular-icon');
      authorContainer.appendChild(icon);

      const author = this.ownerDocument.createElement('h3');
      author.textContent = selectedVideo.author;
      authorContainer.appendChild(author);

      const sipnosisContainer = this.ownerDocument.createElement('div');
      sipnosisContainer.classList.add('sipnosis-container');

      const sipnosisTitle = this.ownerDocument.createElement('h3');
      sipnosisTitle.classList.add('sipnosis-title');
      sipnosisTitle.textContent = "Sipnosis";

      const etiquetas = this.ownerDocument.createElement('div');
      etiquetas.classList.add('etiquetas-container');
      selectedVideo.genre.split(',').forEach(tag => {
        const etiqueta = this.ownerDocument.createElement('div');
        etiqueta.classList.add('etiqueta');
        etiqueta.textContent = tag.trim();
        etiquetas.appendChild(etiqueta);
      });

      const sipnosisText = this.ownerDocument.createElement('p');
      sipnosisText.textContent = selectedVideo.resume;

      sipnosisContainer.appendChild(sipnosisTitle);
      sipnosisContainer.appendChild(etiquetas);
      sipnosisContainer.appendChild(sipnosisText);

      infoContainer.appendChild(title);
      infoContainer.appendChild(authorContainer);
      infoContainer.appendChild(sipnosisContainer);

      container.appendChild(infoContainer);

      const style = this.ownerDocument.createElement('style');
      style.textContent = `
        .video-player-container {
          margin: 0px;
          padding: 0px;
          display: flex;
          margin-top: 90px;
          flex-direction: column;
        }

        .video-info-container {
          margin-top: 0px;
          color: white;
          padding: 10px;
          margin-left: 10px;
        }

        .video-title {
          font-weight: normal;
          font-size: 16pt;
          margin-bottom: 7px;
          margin-top: 7px;
        }

        .author-container {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }

        .circular-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 9px;
        }

        .sipnosis-container {
          border-radius: 20px;
          background-color: #262626;
          max-width: 70%;
          padding: 8px;
          margin-top: 0px;
          margin-bottom: 10px;
        }

        .sipnosis-title {
          font-size: 24pt;
          font-weight: bold;
          margin-top: 5px;
          margin-bottom: 8px;

        }

        .etiquetas-container {
          display: flex;
          font-size: 10pt;
          margin-top: 0px;
        }

        .etiqueta {
          background-color: var(--icons-hover-focus-color);
          margin-right: 5px;
          padding: 5px;
          border-radius: 5px;
        }
      `;

      container.appendChild(style);

      this.shadowRoot?.appendChild(container);
    } else {
      console.log("No hay video seleccionado");
    }
  }
}

customElements.define('app-videoinfo', VideoInfo);
