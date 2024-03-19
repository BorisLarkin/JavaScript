export class SubjectCardComponent{
    constructor(parent){
        this.parent = parent;
    }
    /*
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
    */
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
    getHTML(data) {
        const result1 = 
        `
            <div class="card" style="width: 320px;">
                <div id="carousel-${data.id}" class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carousel-${data.id}" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carousel-${data.id}" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carousel-${data.id}" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div class="carousel-inner">
        `
        const result2 = 
        `
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carousel-${data.id}" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carousel-${data.id}" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text">${data.text}</p>
                    <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Перейти</button>
                </div>
            </div>
            
        `
        var content = new String()
        const len = data.src.length
        
        if (len === 0){
            content=""
        } else {          
            content = 
            `
                                    <div class="carousel-item active">
                                        <img class="d-block w-100" src="${data.src[0]}" alt="Description" style="height: 260px; width: 100%; object-position: center; object-fit: cover;">
                                    </div>
            `
            for (var i = 1; i < len; i++)
            {
                content = content +
                (
                `
                                    <div class="carousel-item">
                                        <img class="d-block w-100" src="${data.src[i]}" alt="Description" style="height: 260px; width: 100%; object-position: center; object-fit: cover;">
                                    </div>
                `
                )
            }
            
        }
        return (result1+content+result2)
    }
}

