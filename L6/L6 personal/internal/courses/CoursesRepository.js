const {DBConnector} = require('../../modules/DBConnector');

class CoursesRepository {
    static db = new DBConnector('courses.json');

    static read() {
        const file = this.db.readFile();

        return JSON.parse(file);
    }

    static write(json) {
        this.db.writeFile(JSON.stringify(json));
    }
}

module.exports = {
    CoursesRepository,
}