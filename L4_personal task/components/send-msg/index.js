import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";
import { chat_chosen } from "../../pages/main/index.js";

export class send_msg {
    constructor(parent, user_id) {
        this.parent = parent
        this.user_id = user_id
    }

    addListeners(listener) {
        document.getElementById("send-msg-btn").addEventListener("click", listener)
    }

    getHTML() {
        return (
        `
                <div class="mb-3">
                    <label for="messagebox" class="form-label">Написать сообщение ID: ${this.user_id} от лица сообщества:</label>
                    <textarea class="form-control" id="messagebox" placeholder="Введите сообщение..." rows="3"></textarea>
                </div>
                <button type="button" class="btn btn-primary" id="send-msg-btn">Отправить сообщение</button>
        `
        )
    }
    ClickSend(){
        ajax.post(urls.sendMessage(this.user_id), (data) =>{
            alert("Отправление прошло с кодом", data.response)
        })
    }

    render() {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(this.ClickSend())
    }
}