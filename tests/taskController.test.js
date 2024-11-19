const { expect } = require('chai');
const sinon = require('sinon');
const TaskController = require('../controllers/taskController');
const { Task } = require('../models/Task');
const store = require('../store');

describe('TaskController', () => {
  beforeEach(() => {
    // Clear the store before each test
    store.tasks = [];
    store.users = [];
  });

  describe('createTask', () => {
    it('should successfully create a task with valid input', async () => {
      // Mock request and response
      const req = {
        body: {
          title: 'Test Task',
          description: 'Test Description',
          due_date: new Date(Date.now() + 86400000) // Tomorrow
        },
        user: { id: '123' }
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      await TaskController.createTask(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(store.tasks).to.have.lengthOf(1);
      expect(store.tasks[0].title).to.equal('Test Task');
    });

    it('should return 400 for invalid input', async () => {
      const req = {
        body: {
          title: 'Te', // Too short
          description: 'Test Description',
          due_date: new Date()
        },
        user: { id: '123' }
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      await TaskController.createTask(req, res);

      expect(res.status.calledWith(400)).to.be.true;
    });
  });

  describe('completeTask', () => {
    it('should mark a task as completed', async () => {
      // Create a test task
      const testTask = new Task(
        'Test Task',
        'Description',
        new Date(Date.now() + 86400000),
        '123'
      );
      store.tasks.push(testTask);

      const req = {
        params: { id: testTask.id },
        user: { id: '123' }
      };

      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis()
      };

      await TaskController.completeTask(req, res);

      expect(store.tasks[0].status).to.equal('completed');
      expect(res.json.called).to.be.true;
    });
  });
});