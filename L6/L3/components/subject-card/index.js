export class SubjectCardComponent{
    constructor(parent){
        this.parent = parent;
    }
    getHTML(data) {
        return (
            `
                <div class="card" style="width: 320px;">
                    <img class="card-img-top" src="${data.src}" alt="картинка" style="height: 260px">
                    <div class="card-body">
                        <h5 class="card-title">${data.title}</h5>
                        <p class="card-text">${data.text}</p>
                        <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Перейти</button>
                    </div>
                </div>
            `
        )
    }
    addListeners(data, listener) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listener)
    }
    
    render(data, listener) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(data, listener)
    }
}
