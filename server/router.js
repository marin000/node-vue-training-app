const express = require("express");
const itemController = require('./Controllers/items');
const employeesController = require('./Controllers/employees');
const employeesValidator = require('./validators/employeesValidator');
const router = express.Router();

router.get('/item', itemController.fetch)
router.post('/item', itemController.create)

/**
 * @swagger
 * components:
 *   schemas:
 *     Employees:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the employee
 *         name:
 *           type: string
 *           description: The employee name
 *       example:
 *         id: d5fEasz576jhsab
 *         name: Mate
 *     Tasks:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the task
 *         name:
 *           type: string
 *           description: The task name
 *         deadline:
 *           type: string
 *           description: Task deadline
 *         completed: 
 *            type: boolean
 *            description: Is task completed or not.
 *       example:
 *         id: dashg86adda7d7a5
 *         name: Task1
 *         deadline: 2022-02-03
 *         completed: false
 */

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: To-do app API
 */

/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employees'
 *     responses:
 *       201:
 *         description: The new employee was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Error creating new employee.
 */
router.post(
  '/employees',
  employeesValidator.validate('create'),
  employeesController.create);

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Returns the list of all employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: The list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employees'
 */
router.get('/employees', employeesController.fetch);

/**
 * @swagger
 * /employees/{id}:
 *   delete:
 *     summary: Remove the employee by id
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The employee id
 *     responses:
 *       204:
 *         description: The employee was deleted.
 *       400: 
 *         description: Employee id is not valid.
 *       404:
 *         description: Error deleting employee.
 */
router.delete(
  '/employees/:id',
  employeesValidator.validate('validateEmployee'),
  employeesController.deleteEmployee);

/**
 * @swagger
 * /employees/{id}:
 *   post:
 *     summary: Create a new task
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Creating employee new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tasks'
 *     responses:
 *       201:
 *         description: The new task was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tasks'
 *       400:
 *         description: Error creating new task.
 */
router.post(
  '/employees/:id',
  employeesValidator.validate('createTask'),
  employeesController.createTask);

/**
 * @swagger
 * /employees/{id}/{taskId}:
 *   delete:
 *     summary: Remove the task by id
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The employee id
 *       - in: path
 *         name: taskId
 *         shema:
 *           type: string
 *         required: true
 *         description: The task id
 *     responses:
 *       204:
 *         description: The task was deleted.
 *       400: 
 *         description: Task id is not valid.
 *       404:
 *         description: Error deleting task.
 */
router.delete(
  '/employees/:id/:taskId',
  employeesValidator.validate('validateMongoIdAndEmployee'),
  employeesController.deleteTask);

/**
 * @swagger
 * /employees/{id}/{taskId}:
 *  put:
 *    summary: Update the task by employee and task id
 *    tags: [Employees]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The employee id
 *      - in: path
 *        name: taskId
 *        shema:
 *          type: string
 *        required: true
 *        description: The task id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Tasks'
 *    responses:
 *      204:
 *        description: The task was updated.
 *      400:
 *        description: Error updating task.
 */
router.put(
  '/employees/:id/:taskId',
  employeesValidator.validate('validateMongoIdAndEmployee'),
  employeesController.updateTask);

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Get employee tasks
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The employee tasks
 *     responses:
 *       200:
 *         description: The employee tasks 
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tasks'
 *       404:
 *         description: The tasks was not found
 */
router.get(
  '/employees/:id',
  employeesValidator.validate('validateEmployee'),
  employeesController.getEmployeeTasks);

module.exports = router;
