const model = require.main.require("./src/models/course");
const schema = require.main.require("./src/models/course/schema");

async function findCourse(searchString){
    let keys = schema.keys;
    const courses = await model.getCourseWithName({
        course_name: searchString,
    });
    return courses;
}

async function findTA(courseString){
    const TAs = await model.getTAWithCourse({
        CourseName: courseString,
    })
    return TAs;
}

async function isOHInputValid(input){
    if (input.firstName == "" ||
        input.lastName == "" || 
        input.email == "" || 
        input.position == "" || 
        input.duties == "" || 
        input.office_hours == "" || 
        input.office_location == ""
    ){
      return false;
    }
    return true;
}

async function isWLInputValid(input){
    if (input.termMonthYear == "" ||
        input.courseNum == "" || 
        input.profFN == "" || 
        input.profLN == "" || 
        input.taFN == "" || 
        input.taLN == ""
    ){
      return false;
    }
    return true;
}


module.exports = {
    findCourse,
    findTA,
    isOHInputValid,
    isWLInputValid,
};