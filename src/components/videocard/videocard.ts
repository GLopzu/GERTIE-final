
import { navigate } from "../../store/actions";
import { dispatch } from "../../store/index";
import { Screens } from "../../types/store";
import { getRandomVideo, setSelectedVideo } from "../../utils/getRandomVideo";

export default class VideoCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });


    this.render();
  }


  render() {
    const randomVideo = getRandomVideo();

    const container = this.ownerDocument.createElement('div');
    container.classList.add('animation-card');

    const gridMedia = this.ownerDocument.createElement('section');
    gridMedia.classList.add('grid-media');

    const link = this.ownerDocument.createElement('a');
    const image = this.ownerDocument.createElement('img');
    image.src = randomVideo.src;

    image.addEventListener('click', (event) => {
      event.preventDefault();
      setSelectedVideo(randomVideo);
      dispatch(navigate(Screens.VIDEOPLAYER));
    });
    link.appendChild(image);
    gridMedia.appendChild(link);

    const duration = this.ownerDocument.createElement('span');
    duration.classList.add('duration');
    duration.textContent = randomVideo.duration;
    gridMedia.appendChild(duration);

    const description = this.ownerDocument.createElement('section');
    description.classList.add('description');

    const metadata = this.ownerDocument.createElement('div');
    metadata.classList.add('metadata');

    const title = this.ownerDocument.createElement('h3');
    title.classList.add('meta-title');
    title.textContent = randomVideo.name;

    title.addEventListener('click', () => {
      dispatch(navigate(Screens.VIDEOPLAYER));
      setSelectedVideo(randomVideo);
    });

    const authorLink = this.ownerDocument.createElement('a');
    authorLink.classList.add('mi-enlace');

    const author = this.ownerDocument.createElement('h4');
    author.classList.add('meta-author');
    author.textContent = randomVideo.author;
    authorLink.appendChild(author);

    metadata.appendChild(title);
    metadata.appendChild(authorLink);

    description.appendChild(metadata);

    container.appendChild(gridMedia);
    container.appendChild(description);

    const style = this.ownerDocument.createElement('style');
    style.textContent = `
    .grid-media > a > img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      display: block;
      border-radius: 7px;
  }
  
  .duration {
      position: absolute;
      top: 2%;
      right: 4%;
      padding: 4px;
      background-color: black;
      font-size: 11px;
      border-radius: 10px;
      z-index: 1;
  }
  
  .description {
      display: flex;
      padding-top: 0px;
  }
  
  .meta-title {
      font-weight: 500;
      margin-bottom: 1px;
      margin-top: 14px;
      margin-right: 10px;
      font-size: 16px;
  }
  
  .meta-like {
      display: flex;
      padding: 0px 18px;
      align-items: center;
      vertical-align: middle;
      margin: 2px;
  }
  
  .meta-like > .like {
      color: #D9D9D9;
      font-weight: lighter;
      position: absolute;
      top: 70%;
      right: 7%;
      transform: translateY(-50%);
      margin: 2px;
  }
  
  .link-info {
      color: #7A7A7A;
      margin-bottom: 60px;
  }
  
  .meta-author {
      font-weight: 500;
      margin-bottom: 10px;
      margin-top: 10px;
      margin-right: 10px;
      font-size: 13px;
      color: var(--input-color);
      text-decoration: none;
  }
  
  .mi-enlace {
      text-decoration: none;
  }

  .grid-media a img {
      transition: transform 0.3s ease-in-out;
    }
    
    .grid-media a:hover img {
      transform: scale(1.1);
    }
    
    .grid-media a:hover {
      cursor: pointer;
    }
  
  `;

    container.appendChild(style);

    this.shadowRoot?.appendChild(container);
  }
}

customElements.define('app-videocard', VideoCard);
