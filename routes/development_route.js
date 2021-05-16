// Imports
let router = require('express').Router();
var Controller = require('../controllers/development_controller');


// AddNewData
router.route('/addnewdata/:num').get(Controller.addnewdata);

/**
 * @swagger
 * components:
 *   schemas:
 *     AddNewData:
 *       type: object
 *       required:
 *         - num
 *       properties:
 *         num:
 *           type: number
 *           description: Quantity of new fictional data Reports.
 */

/**
  * @swagger
  * /covidreportapi/addnewdata/{num}:
  *   get:
  *     summary: Generate and add new fictional data Reports into the DB (only for testing purpose).
  *     tags: [Development]
  *     parameters:
  *       - in: path
  *         name: num
  *         schema:
  *           type: number
  *         required: true
  *         description: The total number of new Reports to be generated and added into de DB. <code>Int</code>
  *     responses:
  *       200:
  *         description: test
  *         content:
  *           application/json:
  *             schema:
  *             type: object
  *             items:
  *               $ref: '#/components/schemas/AddNewData'
  *       404:
  *         description: nope
  *           
  */

// Export API routes
module.exports = router;