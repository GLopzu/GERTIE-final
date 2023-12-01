

export default class Searchbar extends HTMLElement {
    constructor(){
    super();
    this.attachShadow({mode: "open"});
    }

    connectedCallback(){
        this.render()
    }

    render(){
        const searchbar = document.createElement("template");
        searchbar.innerHTML=`
        <style>
            @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

            .searchbar {
                margin-bottom: 20px;
                width: 728px;
                display: flex;
                align-items: center;
            }

            .searchbar form {
                display: flex;
                height: 25px;
                width: 100%;
                position: relative;
            }

            .searchbar .search input {
                outline: none;
                border: 2px solid var(--input-border-color);
                width: 600px;
                height: 140%;
                background-color: var(--input-bg-color);
                padding-left: 15px;
                color: var(--input-color);
                font-size: 16px;
                font-weight: 400;
                border-radius: 20px;
            }

            .searchbar .search button {
                background-color: var(--input-bg-color);
                border: none;
                border-radius: 0 20px 20px 0;
                padding: 0 0%;
                position: relative;
                top: 8.5px;
                left: -50px;
                z-index: 1;
            }

            .searchbar .search img {
                width: 20px;
                height: auto; 
            }

            .searchbar .search button:hover {
                cursor: pointer;
            }

            .searchbar .search input:focus {
                border: 1px solid var(--input-color);
            }

            @media only screen and (max-width: 700px){

                .searchbar {
                    display: none;}
        </style>
        <div class="searchbar">
            <form>
                <div class="search">
                    <input type="text" placeholder="What are we going too watch today?">
                    <button>
                        <img src="../../src/assets/icon_buscar.png" alt="buscar">
                    </button>
                </div>
            </form>
        </div>
    `;

    this.shadowRoot?.appendChild(searchbar.content.cloneNode(true));
    }
}

customElements.define("searchbar-", Searchbar)