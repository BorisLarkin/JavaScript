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
                src: "https://klike.net/uploads/posts/2023-08/1691036320_3-29.jpg",
                title: "Математика",
                text: "Мат. анализ, теория вероятностей, дискретная математика и другое.",
                sub_page: 
                {
                    src: [
                        "https://catherineasquithgallery.com/uploads/posts/2021-03/1614841544_52-p-fon-matematika-53.jpg",
                        "https://catherineasquithgallery.com/uploads/posts/2021-03/1614841546_144-p-fon-matematika-185.jpg",
                        "https://i.ytimg.com/vi/6p8GPSWCRYM/maxres3.jpg"
                    ],
                    title: `Акция 1`,
                    text: "Такой акции вы еще не видели"
                }
            },
            {
                id: 2,
                src: "https://tocrypto.ru/content/uploads/2021/10/18-2.jpg",
                title: "Физика",
                text: "Полный курс физики от субатомарных частиц в газах до Ньютоновской и квантовой физики",
                sub_page: 
                {
                    src: [
                        "https://webpulse.imgsmail.ru/imgpreview?key=pic9005333020248765267&mb=pulse",
                        "https://mirkosmosa.ru/download/news/3/2936.jpg",
                        "https://i.pinimg.com/originals/8a/17/35/8a1735d3a0dcb9aa8f8189aa621d3054.jpg"
                    ],
                    title: `Акция 2`,
                    text: "Такой акции вы еще не видели"
                }
            },
            {
                id: 3,
                src: "https://kalix.club/uploads/posts/2022-12/1672269844_kalix-club-p-pattern-programmirovaniya-krasivo-2.jpg",
                title: "Программирование",
                text: "C, C++, C#, Python, JavaScript, Assembly",
                sub_page: 
                {
                    src: [
                        "https://static.mk.ru/upload/entities/2023/04/27/09/articles/facebookPicture/9f/36/22/03/6e165772cd72233003bdd3e955eac03c.jpg",
                        "https://topsov.com/wp-content/uploads/2023/01/2-programmirovanie-mozhet-stat-osnovnym-istochnikom-dohoda.jpg",
                        "https://infostart.ru/upload/iblock/208/208d58eb46233a558678f1ebedac2696.jpg"
                    ],
                    title: `Акция 3`,
                    text: "Такой акции вы еще не видели"
                }
            },
            {
                id: 4,
                src: "https://www.seoclerk.com/pics/001/065/944/4679995c77c9c0ac1a6cb1736e1210d8.jpg",
                title: "Иностранные языки",
                text: "Английский, Немецкий, Французский, Японский и Китайский",
                sub_page: 
                {
                    src: [
                        "https://www.holidaysmart.com/sites/default/files/daily/2020/europe-day-cv1500.jpg",
                        "https://arc-anglerfish-arc2-prod-advancelocal.s3.amazonaws.com/public/PSHDHBMWNFGWNLBVL5SMLLB5JI.jpg",
                        "https://myrepublica.nagariknetwork.com/uploads/media/learning-a-foreign-language_20200229183138.jpg"
                    ],
                    title: `Акция 4`,
                    text: "Такой акции вы еще не видели"
                }
            },
            {
                id: 5,
                src: "https://cdn.culture.ru/images/c69448a5-9e88-5ce6-900e-b36c71d59ee2",
                title: "Русский язык",
                text: "Фундаментальное понимание языка и актуальные тенденции бизнес-общения",
                sub_page:
                {
                    src: [
                        "https://proza.ru/pics/2023/10/12/1023.jpg",
                        "https://s.mediasalt.ru/images/253/253949/original.jpg",
                        "https://cdnstatic.rg.ru/uploads/images/2022/10/24/010_06b.jpg"
                    ],
                    title: `Акция 5`,
                    text: "Такой акции вы еще не видели"
                }
            },
            {
                id: 6,
                src: "https://eps.ieee.org/images/files/people_around_globe_blue.jpg",
                title: "Социальные науки",
                text: "Обществознание и экономика, социология  и политология с философией",
                sub_page: 
                {
                    src: [
                        "https://foeksv.org/wp-content/uploads/2019/08/Slide1.jpg",
                        "https://cdn.leverageedu.com/blog/wp-content/uploads/2020/02/05192316/Social-Science-Class-10-Syllabus-.png",
                        "https://moodle.lensktekh.ru/pluginfile.php/5199/course/overviewfiles/shutterstock-247494325jpg-135e3c879010d745.jpg"
                    ],
                    title: `Акция 6`,
                    text: "Такой акции вы еще не видели"
                }
            }
        ]
    }
    clickCard(subjectPage) {
        subjectPage.render()
    }
    
    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        
        const data = this.getData()
        data.forEach((item) => {
            const subjectCard = new SubjectCardComponent(this.pageRoot)
            const subjectPage = new SubjectPage(this.parent, item)
            subjectCard.render(item, this.clickCard.bind(this, subjectPage))
        })
    }
}