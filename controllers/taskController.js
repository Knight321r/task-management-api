const { Task, TASK_STATUS } = require('../models/Task');
const store = require('../store');

class TaskController {
  static async getAllTasks(req, res) {
    try {
      const userTasks = store.tasks.filter(task => task.userId === req.user.id);
      res.json(userTasks);
    } catch (error) {
      res.status(500).json({ error: 'Could not retrieve tasks' });
    }
  }

  static async getTaskById(req, res) {
    try {
      const task = store.tasks.find(t => t.id === req.params.id && t.userId === req.user.id);
      
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: 'Could not retrieve task' });
    }
  }

  static async createTask(req, res) {
    try {
      const { error } = Task.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const newTask = new Task(
        req.body.title,
        req.body.description,
        req.body.due_date,
        req.user.id
      );

      store.tasks.push(newTask);
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ error: 'Could not create task' });
    }
  }

  static async updateTask(req, res) {
    try {
      const taskIndex = store.tasks.findIndex(
        t => t.id === req.params.id && t.userId === req.user.id
      );

      if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
      }

      const updatedTask = { 
        ...store.tasks[taskIndex], 
        ...req.body,
        updated_at: new Date()
      };

      const { error } = Task.validate(updatedTask);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      store.tasks[taskIndex] = updatedTask;
      res.json(updatedTask);
    } catch (error) {
      res.status(500).json({ error: 'Could not update task' });
    }
  }

  static async deleteTask(req, res) {
    try {
      const taskIndex = store.tasks.findIndex(
        t => t.id === req.params.id && t.userId === req.user.id
      );

      if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
      }

      store.tasks.splice(taskIndex, 1);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Could not delete task' });
    }
  }

  static async completeTask(req, res) {
    try {
      const taskIndex = store.tasks.findIndex(
        t => t.id === req.params.id && t.userId === req.user.id
      );

      if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
      }

      store.tasks[taskIndex].status = TASK_STATUS.COMPLETED;
      store.tasks[taskIndex].updated_at = new Date();

      res.json(store.tasks[taskIndex]);
    } catch (error) {
      res.status(500).json({ error: 'Could not complete task' });
    }
  }
}

module.exports = TaskController;