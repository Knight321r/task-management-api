const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');

const TASK_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed'
};

class Task {
  constructor(title, description, dueDate, userId) {
    this.id = uuidv4();
    this.title = title;
    this.description = description;
    this.due_date = dueDate;
    this.status = TASK_STATUS.PENDING;
    this.userId = userId;
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  static validate(task) {
    const schema = Joi.object({
      title: Joi.string().trim().min(3).max(100).required(),
      description: Joi.string().trim().max(500),
      due_date: Joi.date().min('now').optional(),
      status: Joi.string().valid(...Object.values(TASK_STATUS)).optional()
    });

    return schema.validate(task);
  }
}

module.exports = { Task, TASK_STATUS };