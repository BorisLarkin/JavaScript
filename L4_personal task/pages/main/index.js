import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";
import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";
import { ChooseChatComponent } from "../../components/choose-chat/index.js";

export var chat_chosen = 0
export var chosen_rendered=false

export class MainPage{
    constructor(parent){
        this.parent=parent;
        this.id;
    }
    
    get pageRoot() {
        return document.getElementById('main-page')
    }
        
    getHTML() {
        return (
            `
                <div id="main-page" class="d-flex flex-wrap"><div/>
            `
        )
    }
        
    getData(peer_id) {
        ajax.post(urls.getConversationMembers(peer_id), data => {
            this.renderData(data.response.profiles)
        })
    }

    clickCard(prPage) {
        prPage.render()
    }

    renderData(profiles) {
        profiles.forEach((profile) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            const productPage = new ProductPage(this.parent, profile.id)
            productCard.render(profile, this.clickCard.bind(this, productPage))
        }
        )
    }
    chatChosen() {
        chat_chosen = document.getElementById("chat-sel").value
        if (chosen_rendered){
            this.getData(chat_chosen)
            chat_chosen=false
        }
        this.render()
    }
    
    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const chooseComp = new ChooseChatComponent(this.pageRoot,this)
        chooseComp.render(this.chatChosen.bind(this))
    }
}