export class SubjectComponent {
    constructor(parent) {
        this.parent = parent
    }
    getHTML(data) {
        const result1 = 
        `
                <div class="card mb-3" style="width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-8">
                            <div id="carousel-${data.id}" class="carousel slide carousel-fade" data-bs-ride="carousel">
                                <div class="carousel-inner">
        `
        const result2 = 
        `
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#carousel-${data.id}"  data-bs-slide="prev">
                                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                  <span class="visually-hidden">Предыдущий</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#carousel-${data.id}"  data-bs-slide="next">
                                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                  <span class="visually-hidden">Следующий</span>
                                </button>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${data.sub_page.title}</h5>
                                <p class="card-text">${data.sub_page.text}</p>
                            </div>
                        </div>
                    </div>
                </div>
        `
        var content = new String()
        const len = data.sub_page.src.length
        
        if (len === 0){
            content=""
        } else {          
            content = 
            `
                                    <div class="carousel-item active">
                                        <img src="${data.sub_page.src[0]}" class="d-block w-100">
                                    </div>
            `
            for (var i = 1; i < len; i++)
            {
                content.concat(
                `
                                    <div class="carousel-item">
                                        <img src="${data.sub_page.src[i]}" class="d-block w-100">
                                    </div>
                `
                )
            }
            
        }
        
        return (result1+content+result2)
    }
    
    render(data) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
    }
}