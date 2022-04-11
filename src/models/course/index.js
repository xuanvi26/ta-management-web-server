const _ = require("lodash");
const { hashPassword } = require.main.require("./src/utils/password");
const writer = require.main.require("./src/utils/writer");
const reader = require.main.require("./src/utils/reader");
const schema = require.main.require("./src/models/course/schema");
const logger = require.main.require("./src/utils/logger");
const fs = require("fs");

const COURSE_TABLE = "./src/models/course/course.json";
const COURSE_TABLE_TMP = "./src/models/course/course.json.tmp";

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

module.exports = {
    getCourseWithName,
}