export class LoadingPage {
    constructor(parent) {
        this.parent = parent
    }

    set_visibility(bool){
        const element = document.getElementById("loading-page")
        element.visible = bool
    }

    getHTML() {
        return (
            `
                <div id="loading-page">
                    <img src="https://i.pinimg.com/originals/ff/e3/fd/ffe3fd8e6f4a4dd07dc5115084176cfd.jpg" alt="Currently loading...">
                    <h1 style="margin-top: 20px; position: absolute; left: 45%; ">Loading...</h1>
                </div>
            `
        )
    }
    
    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
    }
}