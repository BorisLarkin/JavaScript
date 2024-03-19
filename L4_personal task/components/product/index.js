export class ProductComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        return (
            `
                <div class="card mb-3" style="width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${data.photo_400_orig}" class="img-fluid" alt="картинка">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${data.first_name} ${data.last_name}</h5>
                                <p class="card-text">${data.about}</p>
                                <p class="card-text">Пол: ${data.sex}</p>
                                <p class="card-text">День рождения: ${data.bdate}</p>
                                <p class="card-text">Страна: ${data.country}</p>
                                <p class="card-text">Город: ${data.city}</p>
                                <p class="card-text">Временной пояс: ${data.timezone}</p>
                                <p class="card-text">Образование: ${data.educatuon}</p>
                                <p class="card-text">Университет: ${data.universities}</p>
                                <p class="card-text">Оккупация: ${data.occupation}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        )
    }

    render(data) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
    }
}
//users.get?user_ids=ids?fields=about,sex,bdate, country,city,timezone, educatuon,universities,occupation