const _ = require("lodash");
const { hashPassword } = require.main.require("./src/utils/password");
const writer = require.main.require("./src/utils/writer");
const reader = require.main.require("./src/utils/reader");
const schema = require.main.require("./src/models/course/schema");
const logger = require.main.require("./src/utils/logger");
const fs = require("fs");

const COURSE_TABLE = "./src/models/course/course.json";
const COURSE_TABLE_TMP = "./src/models/course/course.json.tmp";
const OH_TABLE = "./src/models/course/office_hours.json";
const TA_TABLE = "./src/models/ta/temp_ta_by_course.json"; //IF CHANGE THIS TABLE, go back to services/course.js and make sure key matches

async function getCourseWithName(searchTerms) {
    const courses = reader.fileAsyncIterator(COURSE_TABLE);
    const matchedCourses = [];
    for await (const rawCourse of courses) {
      try {
        let course = JSON.parse(rawCourse);
        if (
          Object.entries(searchTerms).every(([key, value]) => {
            return course[key] === value;
          })
        ) {
          matchedCourses.push(course);
        }
      } catch (error) {
        logger.error({ error, ctx: "db.core.account" });
      }
    }
    return matchedCourses;
  }

async function getTAWithCourse(courseString){
  const allTAs = reader.fileAsyncIterator(TA_TABLE);
  const matchedTAs = [];
  for await (const rawTA of allTAs) {
    try {
      let someTA = JSON.parse(rawTA);
      if (
        Object.entries(courseString).every(([key,value]) => {
          return someTA[key] === value;
        })
      ) {
        matchedTAs.push(someTA);
      }
    } catch (error) {
      logger.error({ error, ctx: "db.core.account" });
    }
  }
  return matchedTAs;
}

async function writeToTable(
  jsonInput,
  someTable,
){
  let error;
  try{
    await writer.writeLineToFile(
      JSON.stringify(jsonInput),
      someTable
    );
  } catch (error){
    logger.error({ error, ctx: "db.core.account" });
    error = { details: [{ message: error.message }] };
  }
  return { error };
}

module.exports = {
    getCourseWithName,
    writeToTable,
    getTAWithCourse,
}