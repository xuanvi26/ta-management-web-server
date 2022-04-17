# ta-management-web-server

Seeded users (username, password):
- student, student
- ta, student
- prof, student
- admin, student
- sysop, student

Assumptions / clarifications:
- JSON database approved by prof in Edstem post #256
- Followed an Edstem post (#289) stating that all sysops and admins are professors, and all TAs are students 
- IMPORTANT! TAs / profs can exist in the system without being an actual user (with an account)
- For all CSV import function, the user must conform to the specified format on the website (i.e., CSV file with all fields WITHOUT a header)
- In order to test with the seeded data that we currently have in our databases: please use either COMP 202, COMP 205, COMP 111, COMP 222 when searching for a course in Manage TAs, as those are the courses with TAs in them
- If you would like to import or manually add data, please make sure that your naming and formatting is consistent as everything in our website is case and space sensitive (e.g., if you add a course called "COMP 307" called "Web Development" in the Sysop task, manual add courses (or import courses through a csv), then you must use "COMP 307"  (not "comp307" or any other format) and "Web Development" (not "web dev" or any other format) when you add a TA in TA administration
- For Anna Li's part of the work, she initially mentioned that she will be doing the all TA's report bubble in the blue part during the Web DEMO, however, due to lack of time, she did not implement that section (as it would be supplementary work anyways since she did the required minimum of four blue bubbles). We hope that this inconsistency between the web demo and the final deliverable will not be an issue.