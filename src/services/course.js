const model = require.main.require("./src/models/course");
const schema = require.main.require("./src/models/course/schema");

async function findCourse(searchString){
    let keys = schema.keys;
    const courses = await model.getCourseWithName({
        course_name: searchString,
    });
    return courses;
}


module.exports = {
    findCourse,
};