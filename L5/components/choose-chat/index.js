import {urls} from "../../modules/urls.js";
import { fetch_obj } from "../../modules/fetch_logic.js";

export class ChooseChatComponent {
    constructor(parent, obj) {
        this.parent = parent
        this.parent_obj=obj
    }

    addListeners(listener) {
        document.getElementById("chat-sel").addEventListener("change", listener)
    }

    getData(listener){
        fetch_obj.get(urls.getConvos())
        .then((result)=>
            this.renderData(result.items, listener)
        )
    }

    getHTML(data) {
        var result1=
        `
                <select id="chat-sel"" class="form-select" aria-label="Choose chat peer_id" style="margin-bottom: 30px; margin-top: 20px">
                    <option selected>Open this menu to choose chat</option>
        `
        var result2=
        `
                </select>
        `
        var content=``
             
        for (var i = 0; i < data.length; i++)
        {
            content = content + (
        `
                <option value="${data[i].conversation.peer.id}">Чат с ID ${data[i].conversation.peer.id}</option>
        `
            )
        }
        
        return (result1+content+result2)
    }
    renderData(data, listener){
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforebegin', html)
        this.addListeners(listener)
        if (this.parent.chosen_rendered===false){
            document.getElementById("chat-sel").value = chat_chosen
            this.parent.chosen_rendered = true
            this.parent_obj.getData(chat_chosen)
        }
    }
    render(listener) {
        this.getData(listener)
    }
}