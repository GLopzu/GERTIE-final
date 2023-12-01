import firebase from "../../utils/firebase";
import { Comment } from "../../types/comment";

export default class CommentElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const videoId = this.getAttribute("video-id");
    if (videoId !== null) {
      this.render(videoId);
    } else {
      console.error("El ID del video es nulo.");
    }
  }

  async render(videoId: string | null) {
    if (!videoId) {
      console.error("El ID del video es nulo.");
      return;
    }

    const comments = await firebase.fetchVideoComments(videoId);
    const shadowRoot = this.shadowRoot;

    if (shadowRoot === null) {
      console.error("ShadowRoot es nulo.");
      return;
    }

    shadowRoot.innerHTML = `
      <style>
        #container {
          width: 60%;
          padding: 20px;
          margin-bottom: 20px;
        }

        #commentForm {
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        #commentText {
          width: calc(60% - 20px);
          box-sizing: border-box;
          padding: 10px;
          margin-top: 20px;
          margin-bottom: 10px;
          margin-left: 20px;
          background-color: rgb(15, 15, 15);
          color: white;
          border: none;
          font-family: 'Roboto', sans-serif;
          font-size: 12pt;
          resize: none;
          border-bottom: 2px solid white;
          outline: none;
        }

        button {
          margin-left: 20px;
          margin-top: 10px;
          background-color: rgb(15, 15, 15);
          color: white;
          padding: 10px 15px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        button:hover {
          background-color: rgb(12, 12, 12);
        }

        #commentsContainer {
          margin-top: 20px;
        }

        .comment {
          display: flex;
          margin-bottom: 30px;
          width: calc(60% - 20px);
        }

        .icon-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-left: 20px;
        }

        .icon-container img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin-right: 10px;
        }

        .user-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start; /* Ajuste para alinear a la izquierda */
          margin-right: 10px; /* Espacio entre la imagen del usuario y el texto */
        }

        .user-info span {
          font-weight: bold;
          color: white;
          margin-bottom: 15px;
          font-size: 16px;
        }

        .comment p {
          width: 100%;
          margin: 0;
          color: rgb(196, 196, 196);
          font-size: 18px; 
        }

        .comment-actions {
          display: flex;
          align-items: center;
          margin-top: 5px;
        }

        .replyButton {
          background-color: rgb(15, 15, 15);
          color: white;
          padding: 5px 10px;
          border: none;
          border-radius: 10%;
          cursor: pointer;
          margin-left: 20px;
        }

        .replyButton:hover {
          background-color: rgb(38, 38, 38);
        }

        .comment-text-container {
          display: flex;
          flex-direction: column;
          width: 100%; /* Ocupar el ancho completo */
        }
      </style>
    `;

    const form = document.createElement("form");
    form.id = "commentForm";

    const textarea = document.createElement("textarea");
    textarea.id = "commentText";
    textarea.placeholder = "What do you think about this animation?";

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Add Comment";
    button.addEventListener("click", () => this.addComment(videoId));

    form.appendChild(textarea);
    form.appendChild(button);

    shadowRoot.appendChild(form);

    const commentsContainer = document.createElement("div");
    commentsContainer.id = "commentsContainer";

    for (const comment of comments) {
      try {
        const commentDiv = await this.renderComment(comment);
        commentsContainer.appendChild(commentDiv);
      } catch (error) {
        console.error("Error rendering comment:", error);
      }
    }

    shadowRoot.appendChild(commentsContainer);
  }

  async renderComment(comment: Comment): Promise<HTMLDivElement> {
    const commentDiv = document.createElement("div");

    try {
      const user = await this.obtenerDatosUsuario(comment.userId);

      const iconContainer = document.createElement("div");
      iconContainer.className = "icon-container";

      const img = document.createElement("img");
      img.src = `../../src/assets/profile_icons/random_icons/${comment.icon}`;
      img.alt = "User Icon";

      iconContainer.appendChild(img);

      const userContainer = document.createElement("div");
      userContainer.className = "user-info";

      const span = document.createElement("span");
      span.textContent = comment.name;

      userContainer.appendChild(span);

      const commentContent = document.createElement("div");
      commentContent.className = "comment-content";

      const commentTextContainer = document.createElement("div");
      commentTextContainer.className = "comment-text-container";

      const p = document.createElement("p");
      p.textContent = comment.text;

      const commentActions = document.createElement("div");
      commentActions.className = "comment-actions";

      const replyButton = document.createElement("button");
      replyButton.textContent = "";
      replyButton.addEventListener("click", () => this.reply(comment.userId));

      commentActions.appendChild(replyButton);

      commentTextContainer.appendChild(span);
      commentTextContainer.appendChild(p);

      commentDiv.className = "comment";
      commentDiv.appendChild(iconContainer);
      commentDiv.appendChild(commentTextContainer);
      commentDiv.appendChild(commentActions);

      return commentDiv;
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error);
      throw error;
    }
  }

  async obtenerDatosUsuario(userId: string) {
    try {
      const userData = await firebase.getUserData(userId);
      return userData;
    } catch (error) {
      console.error(`Error al obtener datos del usuario (${userId}):`, error);
      return { name: 'Error al obtener datos', icon: '' };
    }
  }

  async addComment(videoId: string) {
    const commentText =
      (this.shadowRoot?.getElementById("commentText") as HTMLInputElement)
        ?.value || "";
    const currentUser = firebase.getCurrentUser();
  
    if (!currentUser) {
      console.error("Debes iniciar sesión para comentar.");
      return;
    }
  
    const comment: Comment = {
      userId: currentUser.uid,
      name: currentUser.displayName || "",
      icon: currentUser.photoURL || "",
      text: commentText,
    };
  
    console.log("Añadiendo comentario:", comment);
  
    try {
      await firebase.addVideoComment(videoId, comment);
      console.log("Comentario añadido exitosamente");
      this.updateCommentsSection(videoId);
    } catch (error) {
      console.error("Error al añadir comentario:", error);
    }
  }

  async updateCommentsSection(videoId: string) {
    console.log("Actualizando sección de comentarios");
    const commentsContainer = this.shadowRoot?.querySelector("#commentsContainer");
  
    if (commentsContainer) {
      try {
        commentsContainer.innerHTML = "";
  
        const comments = await firebase.fetchVideoComments(videoId);
        for (const comment of comments) {
          const commentDiv = await this.renderComment(comment);
          commentsContainer.appendChild(commentDiv);
        }
      } catch (error) {
        console.error("Error al actualizar la sección de comentarios:", error);
      }
    }
  }

  reply(userId: string) {
    console.log(`Respondiendo al usuario: ${userId}`);
  }
}

customElements.define("app-comment", CommentElement);
