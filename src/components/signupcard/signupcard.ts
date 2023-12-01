import { dispatch } from "../../store";
import { navigate } from "../../store/actions";
import { Post, PostRegister } from "../../types/profile";
import { Screens } from "../../types/store";
import firebase from "../../utils/firebase";

const formPost: Omit<PostRegister, "id"> = {
    email: "",
    password: "",
    name: ""
};

export default class SignUpCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
        console.log("signup");
    }

    submitForm() {
        firebase.createUser(formPost.email, formPost.password, formPost.name);
    }

    changeTitle(e: any) {
        formPost.email = e.target.value;
    }

    changeDescription(e: any) {
        formPost.password = e.target.value;
    }

    changeName(e: any) {
        formPost.name = e.target.value;
    }

    render() {
        const container = this.ownerDocument.createElement("div");
        container.style.borderRadius = "4%";
        container.style.backgroundColor = "rgb(26, 26, 26)";
        container.style.padding = "30px";
        container.style.width = "445px";
        container.style.margin = "auto";
        container.style.textAlign = "center";

        const title = this.ownerDocument.createElement("h1");
        title.innerText = "Welcome!";
        title.style.fontSize = "24pt";
        title.style.fontWeight = "bold";
        title.style.color = "white";
        title.style.marginBottom = "90px";
        container.appendChild(title);

        const inputName = this.createInput("User Name", this.changeName);
        container.appendChild(inputName);

        const inputEmail = this.createInput("Email", this.changeTitle);
        container.appendChild(inputEmail);

        const inputPassword = this.createInput("Password", this.changeDescription, "* The password must have more than 5 characters.");
        container.appendChild(inputPassword);

        const textHaveAccount = this.ownerDocument.createElement("p");
        textHaveAccount.innerText = "Do you have an account?";
        textHaveAccount.style.fontSize = "8pt";
        textHaveAccount.style.fontWeight = "medium";
        textHaveAccount.style.color = "white";
        textHaveAccount.style.textAlign = "right";
        textHaveAccount.style.marginRight = "60px";
        textHaveAccount.style.cursor = "pointer";
        textHaveAccount.addEventListener("click", () => {
            dispatch(navigate(Screens.LOGIN));
          });
        container.appendChild(textHaveAccount);

        const createButton = this.ownerDocument.createElement("button");
        createButton.innerText = "Create";
        createButton.addEventListener("click", async () => {
            try {
              await this.submitForm();
              alert("¡Cuenta creada con éxito!");
              dispatch(navigate(Screens.LOGIN));
            } catch (error) {
              console.error("Error al enviar el formulario:", error);
            }
          });
        createButton.style.backgroundColor = "rgb(196, 196, 196)";
        createButton.style.color = "rgb(38, 38, 38)";
        createButton.style.fontSize = "16pt";
        createButton.style.border = "none";
        createButton.style.borderRadius = "10px";
        createButton.style.padding = "10px";
        createButton.style.cursor = "pointer";
        createButton.style.fontWeight = "bold";
        createButton.style.marginTop = "32px";
        createButton.style.marginBottom = "16px";
        container.appendChild(createButton);

        this.shadowRoot?.appendChild(container);
    }

    createInput(placeholder: string, onChange: (e: any) => void, infoText?: string) {
        const input = this.ownerDocument.createElement("input");
        input.type = placeholder.toLowerCase() === "password" ? "password" : "text"; 
        input.placeholder = placeholder;
        input.style.width = "70%";
        input.style.height = "30px";
        input.style.marginBottom = "16px";
        input.style.padding = "10px";
        input.style.color = "white";
        input.style.backgroundColor = "rgb(53, 53, 53)";
        input.style.border = "none";
        input.style.borderRadius = "10px";
        input.style.fontSize = "14pt";
    
        input.addEventListener("change", onChange);
    
        const container = this.ownerDocument.createElement("div");
    
        container.appendChild(input);
    
        if (infoText) {
            const infoTextElement = this.ownerDocument.createElement("p");
            infoTextElement.innerText = infoText;
            infoTextElement.style.color = "rgb(120, 120, 120)"; 
            infoTextElement.style.fontSize = "8pt"; 
            infoTextElement.style.textAlign = "left"; 
            infoTextElement.style.position = "relative";
            infoTextElement.style.top = "-20px"; 
            infoTextElement.style.marginLeft = "60px";
            container.appendChild(infoTextElement);
        }
    
        return container;
    }
}

customElements.define("card-signup", SignUpCard);
