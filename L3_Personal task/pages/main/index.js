import {SubjectCardComponent} from "../../components/subject-card/index.js";
import {SubjectPage} from "../subject/index.js";

export class MainPage{
    constructor(parent){
        this.parent=parent;
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
        return [
            {
                id: 1,
                src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                title: "Математика",
                text: "Мат. анализ, теория вероятностей, дискретная математика и другое."
            },
            {
                id: 2,
                src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                title: "Физика",
                text: "Полный курс физики от субатомарных частиц в газах до Ньютоновской и квантовой физики"
            },
            {
                id: 3,
                src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                title: "Программирование",
                text: "C, C++, C#, Python, JavaScript, Assembly"
            },
            {
                id: 4,
                src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                title: "Иностранные языки",
                text: "Английский, Немецкий, Французский, Японский и Китайский"
            },
            {
                id: 5,
                src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                title: "Русский язык",
                text: "Фундаментальное понимание языка и актуальные тенденции бизнес-общения"
            },
            {
                id: 6,
                src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                title: "Социальные науки",
                text: "Обществознание и экономика, социология  и политология с философией"
            },
            {
                id: 7,
                src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                title: "История",
                text: "Курс общей истории современности"
            },
            {
                id: 8,
                src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                title: "Архитектура АСОИУ",
                text: "Управление производственнымми возможностямим с умом"
            },
        ]
    }
    clickCard(e) {
        const cardId = e.target.dataset.id
    
        const subjectPage = new SubjectPage(this.parent, cardId)
        subjectPage.render()
    }
    
    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        
        const data = this.getData()
        data.forEach((item) => {
            const subjectCard = new SubjectCardComponent(this.pageRoot)
            subjectCard.render(item, this.clickCard.bind(this))
        })
    }
}