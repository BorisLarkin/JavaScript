const {CourseDAO} = require('./CourseDAO');

class CoursesService {
    static findCourses(id) {
        if (id !== undefined) {
            return CourseDAO.findById(id).toJSON();
        }

        return CourseDAO.find().map((course) => course.toJSON());
    }

    static addCourse(course) {
        return CourseDAO.insert(course).toJSON();
    }

    static deleteCourse(id) {
        return CourseDAO.delete(id).map((course) => course.toJSON());
    }
}

module.exports = {
    CoursesService,
}