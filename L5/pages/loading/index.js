export class LoadingPage {

    set_visibility(bool){
        const element = document.getElementById("loading-page")
        if (bool){
            element.style.display = 'block';
        }
        else {element.style.display = 'none';}
    }

    getHTML() {
        return (
            `
                <div id="loading-page" style="width: 100%, height: 100%">
                    <img src="https://i.yapx.cc/XFv9Z.gif" style="position: absolute; left: 18%; top:10%"alt="Currently loading...">
                    <h1 style="margin-top: 20px; position: absolute; left: 47%; top: 85%">Loading...</h1>
                </div>
            `
        )
    }
    
    render() {
        const html = this.getHTML()
        document.body.insertAdjacentHTML('beforeend', html)
    }
}