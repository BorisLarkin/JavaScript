import {ProductComponent} from "../../components/product/index.js";
import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";
import {urls} from "../../modules/urls.js";
import { send_msg } from "../../components/send-msg/index.js";
import { fetch_obj } from "../../modules/fetch_logic.js";


export class ProductPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }

    getData(){
        fetch_obj.get(urls.getUserInfo(this.id))
        .then((result)=>{
            this.renderData(result[0])
        })
    }

    renderData(item) {
        const product = new ProductComponent(this.pageRoot)
        product.render(item)
    }

    get pageRoot() {
        return document.getElementById('product-page')
    }

    getHTML() {
        return (
            `
                <div id="product-page"></div>
            `
        )
    }

    clickBack() {
        document.getElementById("product-page").innerHTML = ''
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }
    
    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
    
        const backButton = new BackButtonComponent(this.pageRoot)
        backButton.render(this.clickBack.bind(this))
        
        const msgbox = new send_msg(this.pageRoot, this.id)
        msgbox.render()
        this.getData()
    }
}