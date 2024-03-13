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
                text: "Мат. анализ, теория вероятностей, дискретная математика и другое.",
                sub_page: 
                {
                    src: [
                        "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                        "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                        "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg"
                    ],
                    title: `Акция 1`,
                    text: "Такой акции вы еще не видели"
                }
            },
            {
                id: 2,
                src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                title: "Физика",
                text: "Полный курс физики от субатомарных частиц в газах до Ньютоновской и квантовой физики",
                sub_page: 
                {
                    src: [
                        "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                        "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                        "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg"
                    ],
                    title: `Акция 2`,
                    text: "Такой акции вы еще не видели"
                }
            },
            {
                id: 3,
                src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                title: "Программирование",
                text: "C, C++, C#, Python, JavaScript, Assembly",
                sub_page: 
                {
                    src: [
                        "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                        "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                        "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg"
                    ],
                    title: `Акция 3`,
                    text: "Такой акции вы еще не видели"
                }
            },
            {
                id: 4,
                src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                title: "Иностранные языки",
                text: "Английский, Немецкий, Французский, Японский и Китайский",
                sub_page: 
                {
                    src: [
                        "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                        "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                        "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg"
                    ],
                    title: `Акция 4`,
                    text: "Такой акции вы еще не видели"
                }
            },
            {
                id: 5,
                src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                title: "Русский язык",
                text: "Фундаментальное понимание языка и актуальные тенденции бизнес-общения",
                sub_page:
                {
                    src: [
                        "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                        "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                        "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg"
                    ],
                    title: `Акция 5`,
                    text: "Такой акции вы еще не видели"
                }
            },
            {
                id: 6,
                src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                title: "Социальные науки",
                text: "Обществознание и экономика, социология  и политология с философией",
                sub_page: 
                {
                    src: [
                        "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                        "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                        "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg"
                    ],
                    title: `Акция 6`,
                    text: "Такой акции вы еще не видели"
                }
            }
        ]
    }
    clickCard(e) {
        const dataset = e.target.dataset.sub_page
        const subjectPage = new SubjectPage(this.parent, dataset)
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