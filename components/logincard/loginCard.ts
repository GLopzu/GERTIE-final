

import { dispatch } from "../../store";
import { navigate } from "../../store/actions";
import { Screens } from "../../types/store";
import firebase from "../../utils/firebase";

const formLogin = {
    email: "",
    password: "",
};

export default class LogInCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
        console.log("login card");
    }

    async submitForm() {
        try {
            if (!formLogin.email || !formLogin.password) {
                alert("Por favor, complete todos los campos.");
                return;
            }
    
            const loginSuccessful = await firebase.logIn(formLogin.email, formLogin.password);
    
            if (loginSuccessful) {
                alert("¡Inicio de sesión exitoso!");
                dispatch(navigate(Screens.DASHBOARD));
            } else {
                alert("Correo electrónico o contraseña incorrectos. Por favor, inténtelo de nuevo.");
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
        }
    }
    

    changeEmail(e: any) {
        formLogin.email = e.target.value;
    }

    changePassword(e: any) {
        formLogin.password = e.target.value;
    }

    render() {
        const container = this.ownerDocument.createElement("div");
        container.style.borderRadius = "4%";
        container.style.backgroundColor = "rgb(26, 26, 26)";
        container.style.padding = "30px";
        container.style.width = "445px";
        container.style.margin = "auto";
        container.style.textAlign = "center"; // Centrar todo

        const title = this.ownerDocument.createElement("h1");
        title.innerText = "Is good to see you again!";
        title.style.fontSize = "24pt";
        title.style.fontWeight = "bold";
        title.style.color = "white";
        title.style.marginBottom = "90px";
        container.appendChild(title);

        const inputEmail = this.createInput("Email", this.changeEmail);
        container.appendChild(inputEmail);

        const inputPassword = this.createInput("Password", this.changePassword);
        container.appendChild(inputPassword);

        const textHaveAccount = this.ownerDocument.createElement("p");
        textHaveAccount.innerText = "Sign up?";
        textHaveAccount.style.fontSize = "8pt";
        textHaveAccount.style.fontWeight = "medium";
        textHaveAccount.style.color = "white";
        textHaveAccount.style.textAlign = "right";
        textHaveAccount.style.marginRight = "60px";
        textHaveAccount.style.cursor = "pointer";
        textHaveAccount.addEventListener("click", () => {
            dispatch(navigate(Screens.SIGNUP));
          });
        container.appendChild(textHaveAccount);

        const loginButton = this.ownerDocument.createElement("button");
        loginButton.innerText = "Log In";
        loginButton.addEventListener("click", () => {
            this.submitForm();
        });
        loginButton.style.backgroundColor = "rgb(196, 196, 196)";
        loginButton.style.color = "rgb(38, 38, 38)";
        loginButton.style.fontSize = "16pt";
        loginButton.style.border = "none";
        loginButton.style.borderRadius = "10px";
        loginButton.style.padding = "10px";
        loginButton.style.cursor = "pointer";
        loginButton.style.fontWeight = "bold";
        loginButton.style.marginTop = "32px";
        loginButton.style.marginBottom = "16px";

        container.appendChild(loginButton);

        this.shadowRoot?.appendChild(container);
    }

    createInput(placeholder: string, onChange: (e: any) => void) {
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

        return container;
    }
}

customElements.define("card-login", LogInCard);



