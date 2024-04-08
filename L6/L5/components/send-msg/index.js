import {urls} from "../../modules/urls.js";
import { fetch_obj } from "../../modules/fetch_logic.js";

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
                <div class="mb-3" style="width: 50%; margin-left: 10px;">
                    <label for="messagebox" class="form-label">Написать сообщение ID: ${this.user_id} от лица сообщества:</label>
                    <textarea class="form-control" id="messagebox" placeholder="Введите сообщение..." rows="3"></textarea>
                </div>
                <button type="button" class="btn btn-primary" id="send-msg-btn" style="margin-left: 10px;">Отправить сообщение</button>
        `
        )
    }
    ClickSend(){
        const body = document.getElementById("messagebox").value
        fetch_obj.get(urls.sendMessage(this.user_id, body))
        .then(alert("Завершено"))
    }

    render() {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(this.ClickSend.bind(this))
    }
}