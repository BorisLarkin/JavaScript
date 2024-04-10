const {CoursesService} = require('./CoursesService');

class CoursesController {
    static findCourses(req, res) {
        try {
            res.send(CoursesService.findCourses());
        } catch (err) {
            res.status(400).send({status: 'Bad Request', message: err.message})
        }
    }

    static findCourseById(req, res) {
        try {
            const id = Number.parseInt(req.params.id);
            res.send(CoursesService.findCourses(id))
        } catch (err) {
            res.status(400).send({status: 'Bad Request', message: err.message})
        }
    }

    static addCourse(req, res) {
        try {
            res.send(CoursesService.addCourse(req.body));
        } catch (err) {
            res.status(400).send({status: 'Bad Request', message: err.message})
        }
    }

    static deleteCourse(req, res) {
        try {
            const id = Number.parseInt(req.params.id);
            res.send(CoursesService.deleteCourse(id));
        } catch (err) {
            res.status(400).send({status: 'Bad Request', message: err.message})
        }
    }
}

module.exports = {
    CoursesController,
};