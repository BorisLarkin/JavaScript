class Urls {
    constructor() {
        this.url = 'http://localhost:8000'
    }

    getCourses() { //get
        return `${this.url}/`
    }

    getCourseById(courseID) { //get
        return `${this.url}/:${courseID}`
    }

    addCourse(){ //post
        return `${this.url}/`
    }
    
    deleteCourse(courseID){ //delete
        return `${this.url}/:${courseID}`
    }
}

export const urls = new Urls()