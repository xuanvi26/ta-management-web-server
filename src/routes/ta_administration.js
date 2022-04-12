const express = require('express');
const router = express.Router();
//var busboy = require('connect-busboy');
var { parse } = require('csv-parse');
var formidable = require('formidable');
const { checkAuthenticationWithUserType } = require.main.require(
    './src/utils/authentication'
);
const fs = require('fs');
const { addTa } = require.main.require('./src/services/admin');
const { addCourse } = require.main.require('./src/services/admin');
const {findTa,deleteTa} = require.main.require("./src/services/admin");
const {findCourse} = require.main.require("./src/services/course");
const { response_type } = require.main.require("./src/response");
// EXAMPLE OF A GET
router.get(
    '/',
    checkAuthenticationWithUserType(['admin', 'sysop'], (req, res) => {
        // res.status(404).json("Not implemented ta administration");
        res.render('pages/ta_administration/orangeMenu.ejs');
    })
);

router.get(
    '/import',
    checkAuthenticationWithUserType(['admin', 'sysop'], (req, res) => {
        // res.status(404).json("Not implemented ta administration");
        res.render('pages/ta_administration/import.ejs');
    })
);

router.get(
    '/import_courses',
    checkAuthenticationWithUserType(['admin', 'sysop'], (req, res) => {
        // res.status(404).json("Not implemented ta administration");
        res.render('pages/ta_administration/import_courses.ejs');
    })
);

router.get(
    '/taInfo',
    checkAuthenticationWithUserType(['admin', 'sysop'], (req, res) => {
        // res.status(404).json("Not implemented ta administration");
        res.render('pages/ta_administration/taInfo.ejs');
    })
);

router.get(
    '/courseInfo',
    checkAuthenticationWithUserType(['admin', 'sysop'], (req, res) => {
        // res.status(404).json("Not implemented ta administration");
        res.render('pages/ta_administration/courseInfo.ejs');
    })
);

router.get(
    '/edit',
    checkAuthenticationWithUserType(['admin', 'sysop'], (req, res) => {
        // res.status(404).json("Not implemented ta administration");
        res.render('pages/ta_administration/edit.ejs');
    })
);



//   router.get(
//     "/courses",
//     checkAuthenticationWithUserType(["sysop","admin"], async (req, res) => {
//       if (!req.query.course_name_search) { // if no terms
//         res.render("pages/ta_administration/edit.ejs", {
//           userTypes: req.session.user.userTypes,
//           username: req.session.user.username,
//           error: "Please enter a search term.",
//         });
//       } else {
//         const courses = await findCourse(req.query.course_name_search);
  
//         if (courses.length == 0) {
//           res.render("pages/ta_administration/edit.ejs", {
//             userTypes: req.session.user.userTypes,
//             username: req.session.user.username,
//             error: "No user matched search term.",
//           });
//         } else {
//           res.render("pages/ta_administration/result.ejs", {
//             userTypes: req.session.user.userTypes,
//             username: req.session.user.username,
//             course: courses[0].course_name,
//           });
//         }
//       }
//     })
//   );

  router.get(
    "/courses",
    checkAuthenticationWithUserType(["ta","prof"], async (req, res) => {
      if(!req.query.course_name_search){
        res.render("pages/ta_administration/edit.ejs", {
          userTypes: req.session.user.userTypes,
          username: req.session.user.username,
          error: "Please enter a search term.",
        });
      } else{
        const courses = await findCourse(req.query.course_name_search);
  
        if (courses.length === 0){
          res.render("pages/ta_administration/edit.ejs", {
            userTypes: req.session.user.userTypes,
            username: req.session.user.username,
            error: "No course matched the search term."
          });
        } else{
          res.render("pages/ta_administration/result.ejs", {
            userTypes: req.session.user.userTypes,
            username: req.session.user.username,
            course: courses[0].course_name,
          });
        }
      } 
    })
    
  );

//   router.get(
//     "/courses",
//     checkAuthenticationWithUserType(["ta","prof"], async (req, res) => {
//       if(!req.query.course_name_search){
//         res.render("pages/ta_management/ta_management_landing.ejs", {
//           userTypes: req.session.user.userTypes,
//           username: req.session.user.username,
//           error: "Please enter a search term.",
//         });
//       } else{
//         const courses = await findCourse(req.query.course_name_search);
  
//         if (courses.length === 0){
//           res.render("pages/ta_management/ta_management_landing.ejs", {
//             userTypes: req.session.user.userTypes,
//             username: req.session.user.username,
//             error: "No course matched the search term."
//           });
//         } else{
//           res.render("pages/ta_management/ta_management_course_result.ejs", {
//             userTypes: req.session.user.userTypes,
//             username: req.session.user.username,
//             course: courses[0].course_name,
//           });
//         }
//       } 
//     })
//   );





// EXAMPLE OF A POST
router.post('/hello', async(req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        const filepath = files.filename.filepath;
        console.log(filepath);
        var csvData = [];
        fs.createReadStream(filepath)
            .pipe(parse({ delimiter: ',' }))
            .on('data', function(csvrow) {
                // console.log(csvrow)
                const ta = {
                  term_month_year: csvrow[0],
                  TA_name: csvrow[1],
                  student_ID: csvrow[2],
                  legal_name: csvrow[3],
                  email: csvrow[4],
                  grad_ugrad: csvrow[5],
                  supervisor_name: csvrow[6],
                  priority: csvrow[7],
                  hours: csvrow[8],
                  date_applied: csvrow[9],
                  location: csvrow[10],
                  phone: csvrow[11],
                  degree: csvrow[12],
                  courses_applied_for: csvrow[13],
                  open_to_other_courses: csvrow[14],
                  notes: csvrow[15],
                };
                // console.log(ta);
                addTa(ta);
                //do something with csvrow
                // csvData.push(csvrow);
            })
            .on('end', function() {
                // console.log(csvData);
            });
    });
    // res.status(404).json('HELLOOOO');
    res.render('pages/ta_administration/orangeMenu.ejs');
    // process.stdout.write("Hello World\n");
});



// EXAMPLE OF A POST
router.post('/hello_courses', async(req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        const filepath = files.filename.filepath;
        console.log(filepath);
        var csvData = [];
        fs.createReadStream(filepath)
            .pipe(parse({ delimiter: ',' }))
            .on('data', function(csvrow) {
                // console.log(csvrow)
                const course = {
                    term_month_year: csvrow[0],
                    course_num: csvrow[1],
                    course_type: csvrow[2],
                    course_name: csvrow[3],
                    instructor_name: csvrow[4],
                    course_enrollment_num: csvrow[5],
                    TA_quota: csvrow[6],
                };
                // console.log(course);
                addCourse(course);
                //do something with csvrow
                // csvData.push(csvrow);
            })
            .on('end', function() {
                // console.log(csvData);
            });
    });
    res.render('pages/ta_administration/orangeMenu.ejs');
    // process.stdout.write("Hello World\n");
});

module.exports = router;