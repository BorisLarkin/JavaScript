import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";
import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";
import {chat_1, groupId} from "../../modules/consts.js";

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
        
    getData() {
        ajax.post(urls.getConversationMembers(chat_1), data => {
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

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
    
        this.getData()
    }
}