const writer = require.main.require('./src/utils/writer');

const TA_TABLE = './src/models/ta/db.json';
const COURSE_TABLE = './src/models/ta/db2.json';
const TA_TABLE_TMP = './src/models/ta/db.json.tmp';
const TA_RATING_TABLE = './src/models/ta/ta_rating.json';

async function addTa(ta, options = { table: TA_TABLE }) {
    (ta = JSON.stringify(ta)), await writer.writeLineToFile(ta, TA_TABLE);
    return true;
}
async function addCourse(course, options = { table: COURSE_TABLE }) {
  (course = JSON.stringify(course)), await writer.writeLineToFile(course, COURSE_TABLE);
  return true;
}

async function deleteTa(TA_name) {
    const tas = reader.fileAsyncIterator(TA_TABLE);
    for await (const rawta of tas) {
      try {
        const ta = JSON.parse(rawta);
        if (ta.TA_name !== TA_name) {
          await writer.writeLineToFile(rawta, TA_TABLE_TMP);
        }
      } catch (error) {
        logger.error({ error, ctx: "db.core.ta" });
      }
    }
    const error = await fs.promises.rename(TA_TABLE_TMP, TA_TABLE);
    if (error) {
      logger.error({ error, ctx: "db.core.ta" });
      return false;
    } else {
      return true;
    }
  }
  
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


async function writeTARating(
  TAjson,
  option = {table: TA_RATING_TABLE},
){
  let error;
  try{
    await writer.writeLineToFile(
      JSON.stringify(TAjson),
      option.table
    );
  } catch (error){
    logger.error({ error, ctx: "db.core.account" });
    error = { details: [{ message: error.message }] };
  }
  return { error };
}


module.exports = {
    addTa,
    addCourse,
    deleteTa,
    getCourseWithName,
    writeTARating,
};