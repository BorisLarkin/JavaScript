export class LoadingPage {

    set_visibility(bool){
        const element = document.getElementById("loading-page")
        element.visible = bool
    }

    getHTML() {
        return (
            `
                <div id="loading-page">
                    <img src="https://i.yapx.cc/XFv9Z.gif" alt="Currently loading...">
                    <h1 style="margin-top: 20px; position: absolute; left: 45%; ">Loading...</h1>
                </div>
            `
        )
    }
    
    render() {
        const html = this.getHTML()
        document.body.insertAdjacentHTML('beforeend', html)
    }
}