import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";
import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";
import { ChooseChatComponent } from "../../components/choose-chat/index.js";

export class MainPage{
    constructor(parent){
        this.parent=parent;
        this.id;
        this.chat_chosen = 0
        //this.chosen_rendered=false
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
        
    getData() {
        if (this.chat_chosen!=0){
            ajax.post(urls.getConversationMembers(this.chat_chosen), data => {
                this.renderData(data.response.profiles)
            })
        }
    }

    clickCard(prPage) {
        prPage.render()
    }

    renderData(profiles) {
        profiles.forEach((profile) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            const productPage = new ProductPage(this.parent, profile.id, this)
            productCard.render(profile, this.clickCard.bind(this, productPage))
        }
        )
    }

    chatChosen() {
        this.chat_chosen = document.getElementById("chat-sel").value
        document.getElementById("main-page").innerHTML = ''
        /*
        if (this.chosen_rendered===false){
            this.getData()
        }
        */
       this.getData()
    }
    
    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const chooseComp = new ChooseChatComponent(this.pageRoot,this)
        chooseComp.render(this.chatChosen.bind(this))
    }
}