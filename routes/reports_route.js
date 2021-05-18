// Imports
let router = require('express').Router();
var Controller = require('../controllers/reports_controller');
var AutController = require('../controllers/authentication_controller');


// GetAllReports
router.route('/getallreports').get(Controller.getallreports);
/**
  * @swagger
  * /covidreportapi/getallreports:
  *   get:
  *     summary: Retrieve all Reports items from DB and give a html code with the data.
  *     description: 
  *       You can visualize the html table on this [webpage](https://covidsymptomreportapi.herokuapp.com/covidreportapi/getallreports).<br />
  *       ```
  *       https://covidsymptomreportapi.herokuapp.com/covidreportapi/getallreports
  *       ```
  *     tags: [Reports]
  *     responses:
  *       200:
  *         description: Code of a html table to show all Reports in the DB.
  *         content:
  *           application/json:
  *             type: object
  *       404:
  *         description: Nothing found.
  *       500: 
  *         description: Some server error...
  *           
  */

// ReportsCount
router.route('/reportscount').get(Controller.reportscount);
/**
  * @swagger
  * /covidreportapi/reportscount:
  *   get:
  *     summary: Retrieve the total number of Reports in the DB.
  *     tags: [Reports]
  *     responses:
  *       200:
  *         description: Total number of Reports in the DB.
  *         content:
  *           application/json:
  *             type: object
  *       404:
  *         description: Nothing found.
  *       500: 
  *         description: Some server error...
  *           
  */

// GenderCount
router.route('/gendercount/:gender').get(Controller.gendercount);
/**
 * @swagger
 * components:
 *   schemas:
 *     GenderCount:
 *       type: object
 *       required:
 *         - gender
 *       properties:
 *         gender:
 *           type: string
 *           description: The type of gender.
 */
/**
  * @swagger
  * /covidreportapi/gendercount/{gender}:
  *   get:
  *     summary: Retrieve the total number of Reports related to gender type.
  *     tags: [Reports]
  *     parameters:
  *       - in: path
  *         name: gender
  *         description: Gender type.
  *         default: Male
  *         required: true
  *         schema:
  *           type: string
  *           enum: [Male, Female]
  *     responses:
  *       200:
  *         description: Total number of Reports related to gender type.
  *         content:
  *           application/json:
  *             type: object
  *             items:
  *               $ref: '#/components/schemas/GenderCount'
  *       404:
  *         description: Nothing found.
  *       500: 
  *         description: Some server error...
  *           
  */

// GenderCount
router.route('/vacinegendercount').get(Controller.vacinegendercount);
/**
  * @swagger
  * /covidreportapi/vacinegendercount:
  *   get:
  *     summary: Retrieve the total number of Reports related to gender type and vacination.
  *     tags: [Reports]
  *     responses:
  *       200:
  *         description: Total number of Reports related to gender type and vacination.
  *         content:
  *           application/json:
  *             type: object
  *       404:
  *         description: Nothing found.
  *       500: 
  *         description: Some server error...
  *           
  */

// AgeRangeCount
router.route('/agerangecount').get(Controller.agerangecount);
/**
  * @swagger
  * /covidreportapi/agerangecount:
  *   get:
  *     summary: Retrieve the total number of Reports related to diferent ages ranges.
  *     tags: [Reports]
  *     responses:
  *       200:
  *         description: Total number of Reports related to diferent ages ranges.
  *         content:
  *           application/json:
  *             type: object
  *       404:
  *         description: Nothing found.
  *       500: 
  *         description: Some server error...
  *           
  */

// CustomAgeRangeCount
router.route('/costumagerangecount/:begin/:end').get(Controller.costumagerangecount);
/**
 * @swagger
 * components:
 *   schemas:
 *     CustomAgeRangeCount:
 *       type: object
 *       required:
 *         - begin
 *         - end
 *       properties:
 *         begin:
 *           type: number
 *           description: Quantity of new fictional data Reports.
 *         end:
 *           type: number
 *           description: Quantity of new fictional data Reports.
 */
/**
  * @swagger
  * /covidreportapi/costumagerangecount/{begin}/{end}:
  *   get:
  *     summary: Retrieve the total number of Reports related to a especific age range.
  *     tags: [Reports]
  *     parameters:
  *       - in: path
  *         name: begin
  *         schema:
  *           type: number
  *         required: true
  *         description: The begin of the age range. <code>Int</code>
  *       - in: path
  *         name: end
  *         schema:
  *           type: number
  *         required: true
  *         description: The end of the age range. <code>Int</code>
  *     responses:
  *       200:
  *         description: Total number of Reports related to a especific age range.
  *         content:
  *           application/json:
  *             schema:
  *             type: object
  *             items:
  *               $ref: '#/components/schemas/CustomAgeRangeCount'
  *       404:
  *         description: Nothing found.
  *       500: 
  *         description: Some server error...
  *           
  */

// VacineCount
router.route('/vacinecount').get(Controller.vacinecount);
/**
  * @swagger
  * /covidreportapi/vacinecount:
  *   get:
  *     summary: Retrieve the total number of Reports related to the vacination.
  *     tags: [Reports]
  *     responses:
  *       200:
  *         description: Total number of Reports related to the vacination.
  *         content:
  *           application/json:
  *             type: object
  *       404:
  *         description: Nothing found.
  *       500: 
  *         description: Some server error...
  *           
  */

// ChronologicalCount
router.route('/chronologicalcount').get(Controller.chronologicalcount);
/**
  * @swagger
  * /covidreportapi/chronologicalcount:
  *   get:
  *     summary: Retrieve the total number of Reports by chronological order (descending).
  *     tags: [Reports]
  *     responses:
  *       200:
  *         description: Total number of Reports by chronological order (descending).
  *         content:
  *           application/json:
  *             type: object
  *       404:
  *         description: Nothing found.
  *       500: 
  *         description: Some server error...
  *           
  */

// CustomChronologicalCount
router.route('/customchronologicalreport/:bdate/:btime/:edate/:etime').get(Controller.customchronologicalreport);
/**
 * @swagger
 * components:
 *   schemas:
 *     CustomChronologicalCount:
 *       type: object
 *       required:
 *         - bdate
 *         - btime
 *         - edate
 *         - etime
 *       properties:
 *         bdate:
 *           type: string
 *           description: Initial Year range.
 *         btime:
 *           type: string
 *           description: Initial Month range.
 *         edate:
 *           type: string
 *           description: Initial Day range.
 *         etime:
 *           type: string
 *           description: Initial Hour range.
 *         example:
 * 
 */
/**
  * @swagger
  * /covidreportapi/customchronologicalreport/{bdate}/{btime}/{edate}/{etime}:
  *   get:
  *     summary: Retrieve the total number of Reports related to a especific age range.
  *     tags: [Reports]
  *     parameters:
  *       - in: path
  *         name: bdate
  *         schema:
  *           type: string
  *         required: true
  *         description: The initial Year range. <code>YYYY-MM-DD</code>
  *       - in: path
  *         name: btime
  *         schema:
  *           type: string
  *         required: true
  *         description: The initial Month range. <code>00:00 - 23:59</code>
  *       - in: path
  *         name: edate
  *         schema:
  *           type: string
  *         required: true
  *         description: The final Day range. <code>YYYY-MM-DD</code>
  *       - in: path
  *         name: etime
  *         schema:
  *           type: string
  *         required: true
  *         description: The final Hour range. <code>00:00 - 23:59</code>
  *     responses:
  *       200:
  *         description: Total number of Reports related to a especific age range.
  *         content:
  *           application/json:
  *             schema:
  *             type: object
  *             items:
  *               $ref: '#/components/schemas/CustomChronologicalCount'
  *       404:
  *         description: Nothing found.
  *       500: 
  *         description: Some server error...
  *           
  */

// ReinfectionCount
router.route('/reinfectioncount').get(Controller.reinfectioncount);
/**
  * @swagger
  * /covidreportapi/reinfectioncount:
  *   get:
  *     summary: Retrieve the total number of Reports related to reinfections.
  *     tags: [Reports]
  *     responses:
  *       200:
  *         description: Total number of Reports related to reinfections.
  *         content:
  *           application/json:
  *             schema:
  *             type: object
  *       404:
  *         description: Nothing found.
  *       500: 
  *         description: Some server error...
  *           
  */

// SymptomRatio
router.route('/symptomratio/:symptom').get(Controller.symptomratio);
/**
 * @swagger
 * components:
 *   schemas:
 *     Symptom:
 *       type: object
 *       required:
 *         - symptom
 *       properties:
 *         symptom:
 *           type: string
 *           description: Type of the symptom.
 * 
 */
/**
  * @swagger
  * /covidreportapi/symptomratio/{symptom}:
  *   get:
  *     summary: Retrieve the total number of Reports related to a especific symptom.
  *     tags: [Reports]
  *     parameters:
  *       - in: path
  *         name: symptom
  *         description: Symptom.
  *         required: true
  *         schema:
  *           type: string
  *           enum: [01- Muscle tension and pain, 02- Sore throat, 03- Diarrhea, 04- Conjunctivitis, 05- Headache, 06- Loss of taste or smell, 
  *                  07- Skin irritation or discoloration of fingers or toes, 08- Fever, 09- Dry cough, 10- Tiredness, 
  *                  11- Breathing difficulty or shortness of breath, 12- Pressure or chest pain, 13- Loss of speech or motor ability]
  *     responses:
  *       200:
  *         description: Total number of Reports related to a especific symptom.
  *         content:
  *           application/json:
  *             schema:
  *             type: object
  *       404:
  *         description: Nothing found.
  *       500: 
  *         description: Some server error...
  *           
  */

// NewReport
router.route('/newreport/:name/:healthnum/:gender/:age/:contact/:email/:county/:s01/:s02/:s03/:s04/:s05/:s06/:s07/:s08/:s09/:s10/:s11/:s12/:s13/:q1/:q2/:q3').post(Controller.newreport);
/**
 * @swagger
 * components:
 *   schemas:
 *     NewReport:
 *       type: object
 *       required:
 *         - name
 *         - healthnum
 *         - gender
 *         - age
 *         - contact
 *         - email
 *         - county
 *         - s01
 *         - s02
 *         - s03
 *         - s04
 *         - s05
 *         - s06
 *         - s07
 *         - s08
 *         - s09
 *         - s10
 *         - s11
 *         - s12
 *         - s13
 *         - q1
 *         - q2
 *         - q3
 *       properties:
 *         name:
 *           type: string
 *         healthnum:
 *           type: number
 *         gender:
 *           type: string
 *         age:
 *           type: number
 *         contact:
 *           type: number
 *         email:
 *           type: string
 *         county:
 *           type: string
 *         s01:
 *           type: boolean
 *         s02:
 *           type: boolean
 *         s03:
 *           type: boolean
 *         s04:
 *           type: boolean
 *         s05:
 *           type: boolean
 *         s06:
 *           type: boolean
 *         s07:
 *           type: boolean
 *         s08:
 *           type: boolean
 *         s09:
 *           type: boolean
 *         s10:
 *           type: boolean
 *         s11:
 *           type: boolean
 *         s12:
 *           type: boolean
 *         s13:
 *           type: boolean
 *         q1:
 *           type: boolean
 *         q2:
 *           type: boolean
 *         q3:
 *           type: string
 */
/**
  * @swagger
  * /covidreportapi/newreport/{name}/{healthnum}/{gender}/{age}/{contact}/{email}/{county}/{s01}/{s02}/{s03}/{s04}/{s05}/{s06}/{s07}/{s08}/{s09}/{s10}/{s11}/{s12}/{s13}/{q1}/{q2}/{q3}:
  *   post:
  *     summary: Create a new Report.
  *     description: 
  *       All parameters are related to the person that this Report is related to.<br />
  *     tags: [Public]
  *     parameters:
  *       - in: path
  *         name: name
  *         schema:
  *           type: string
  *         required: true
  *         description: The persons _**first** and **last name**_. 
  *       - in: path
  *         name: healthnum
  *         schema:
  *           type: number
  *         required: true
  *         description: The persons _health user **number**_.
  *       - in: path
  *         name: gender
  *         required: true
  *         schema:
  *           type: string
  *           enum: [Male, Female]
  *         description: The _**Gender**_ of the person. 
  *       - in: path
  *         name: age
  *         schema:
  *           type: number
  *         required: true
  *         description: The persons _age_ in digits.
  *       - in: path
  *         name: contact
  *         schema:
  *           type: number
  *         required: true
  *         description: The persons _contacting **number**_.
  *       - in: path
  *         name: email
  *         schema:
  *           type: string
  *         required: true
  *         description: The persons personal _e-mail_.
  *       - in: path
  *         name: county
  *         schema:
  *           type: string
  *         required: true
  *         description: The actual _area_ where the persons is living.
  *       - in: path
  *         name: s01
  *         required: true
  *         schema:
  *           type: boolean
  *           enum: [false, true]
  *         description: __Symptom 01__ ```Muscle tension and pain```
  *       - in: path
  *         name: s02
  *         required: true
  *         schema:
  *           type: boolean
  *           enum: [false, true]
  *         description: __Symptom 02__ ```Sore throat```
  *       - in: path
  *         name: s03
  *         required: true
  *         schema:
  *           type: boolean
  *           enum: [false, true]
  *         description: __Symptom 03__ ```Diarrhea```
  *       - in: path
  *         name: s04
  *         required: true
  *         schema:
  *           type: boolean
  *           enum: [false, true]
  *         description: __Symptom 04__ ```Conjunctivitis```
  *       - in: path
  *         name: s05
  *         required: true
  *         schema:
  *           type: boolean
  *           enum: [false, true]
  *         description: __Symptom 05__ ```Headache```
  *       - in: path
  *         name: s06
  *         required: true
  *         schema:
  *           type: boolean
  *           enum: [false, true]
  *         description: __Symptom 06__ ```Loss of taste or smell```
  *       - in: path
  *         name: s07
  *         required: true
  *         schema:
  *           type: boolean
  *           enum: [false, true]
  *         description: __Symptom 07__ ```Skin irritation or discoloration of fingers or toes```
  *       - in: path
  *         name: s08
  *         required: true
  *         schema:
  *           type: boolean
  *           enum: [false, true]
  *         description: __Symptom 08__ ```Fever```
  *       - in: path
  *         name: s09
  *         required: true
  *         schema:
  *           type: boolean
  *           enum: [false, true]
  *         description: __Symptom 09__ ```Dry cough```
  *       - in: path
  *         name: s10
  *         required: true
  *         schema:
  *           type: boolean
  *           enum: [false, true]
  *         description: __Symptom 10__ ```Tiredness```
  *       - in: path
  *         name: s11
  *         required: true
  *         schema:
  *           type: boolean
  *           enum: [false, true]
  *         description: __Symptom 11__ ```Breathing difficulty or shortness of breath```
  *       - in: path
  *         name: s12
  *         required: true
  *         schema:
  *           type: boolean
  *           enum: [false, true]
  *         description: __Symptom 12__ ```Pressure or chest pain```
  *       - in: path
  *         name: s13
  *         required: true
  *         schema:
  *           type: boolean
  *           enum: [false, true]
  *         description: __Symptom 13__ ```Loss of speech or motor ability```
  *       - in: path
  *         name: q1
  *         required: true
  *         schema:
  *           type: boolean
  *           enum: [false, true]
  *         description: __Question 1__ ```Have you been in contact with someone infected?```
  *       - in: path
  *         name: q2
  *         required: true
  *         schema:
  *           type: boolean
  *           enum: [true]
  *         description: __Question 2__ ```Have you been infected before?```
  *       - in: path
  *         name: q3
  *         required: true
  *         schema:
  *           type: string
  *           enum: ["No", "(Yes) BioNTech, Pfizer", "(Yes) Johnson & Johnson", "(Yes) Moderna", "(Yes) Oxford, AstraZeneca"]
  *         description: __Question 3__ ```Have you been vaccinated? If yes, with witch vaccine?```
  *     responses:
  *       200:
  *         description: Report creation.
  *         content:
  *           application/json:
  *             schema: 
  *               $ref: '#/components/schemas/GetAllReports'
  *             type: object
  *       404:
  *         description: Nothing found.
  *       500: 
  *         description: Some server error...
  *           
  */

// Overview
router.route('/overview').get(Controller.overview);
/**
  * @swagger
  * /covidreportapi/overview:
  *   get:
  *     summary: Retrieve a summary related to the Reports using some functions of above.
  *     tags: [Overview]
  *     responses:
  *       200:
  *         description: Summary related to the Reports using some functions of above.
  *         content:
  *           application/json:
  *             schema:
  *             type: object
  *       404:
  *         description: Nothing found.
  *       500: 
  *         description: Some server error...
  *           
  */

// Register
router.route('/register/:user/:pw').post(AutController.register);

/**
  * @swagger
  * /covidreportapi/register/{user}/{pw}:
  *   post:
  *     summary: Registration of a new User.
  *     description: To create a new User, insert the respective credentials below.
  *     tags: [Authentication]
  *     parameters:
  *       - in: path
  *         name: user
  *         description: The users __name__ to be registered.
  *         required: true
  *         schema:
  *           type: string
  *       - in: path
  *         name: pw
  *         description: The users __password__ to be registered.
  *         required: true
  *         schema:
  *           type: string
  *     responses:
  *       200:
  *         description: Creation of a new User.
  *         content:
  *           application/json:
  *             schema:
  *             type: object
  *       404:
  *         description: Nothing found.
  *       500: 
  *         description: Some server error...
  *           
  */

// Login
router.route('/login/:user/:pw').post(AutController.login);

/**
  * @swagger
  * /covidreportapi/login/{user}/{pw}:
  *   post:
  *     summary: Login with a existing User credentials.
  *     description: To login in, input the credentials of a existing User.
  *     tags: [Authentication]
  *     parameters:
  *       - in: path
  *         name: user
  *         description: User
  *         required: true
  *         schema:
  *           type: string
  *       - in: path
  *         name: pw
  *         description: Password
  *         required: true
  *         schema:
  *           type: string
  *     responses:
  *       200:
  *         description: Login with a existing User credentials.
  *         content:
  *           application/json:
  *             schema:
  *             type: object
  *       404:
  *         description: Nothing found.
  *       500: 
  *         description: Some server error...
  *           
  */

// Logout
router.route('/logout').get(AutController.logout);

/**
  * @swagger
  * /covidreportapi/logout:
  *   get:
  *     summary: Logout of a signed User.
  *     description: Logout a logged User.
  *     tags: [Authentication]
  *     responses:
  *       200:
  *         description: Logout of a signed User.
  *         content:
  *           application/json:
  *             schema:
  *             type: object
  *       404:
  *         description: Nothing found.
  *       500: 
  *         description: Some server error...
  *           
  */




// Export API routes
module.exports = router;