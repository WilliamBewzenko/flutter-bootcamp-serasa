const express = require('express')

const { handleOk, handleError } = require('../utils')
const { validate } = require('../middleware')

const Task = require('../model/task')
const { createSchema, updateSchema, findOrDeleteSchema } = require('../schema/todo')

const router = express.Router()

const taskNotFound = (res) => (
  res.status(404).json({
    status: 404,
    type: 'NotFound',
    message: 'Task not found'
  })
)

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.findAll()

    handleOk(res, tasks)
  } catch (error) {
    handleError(res, error)
  }
})

router.delete('/', async (req, res) => {
  try {
    await Task.destroy({
      where: {},
      truncate: true
    })

    handleOk(res, { deleted: true })
  } catch (error) {
    handleError(res, error)
  }
})

router.post('/', validate(createSchema), async (req, res) => {
  try {
    const body = req.body

    const task = await Task.create({
      title: body.title,
      description: body.description,
      deadline: body.deadline,
      priority: body.priority,
      done: body.done,
      tags: body.tags
    })

    handleOk(res, task, 201)
  } catch (error) {
    handleError(res, error)
  }
})

router.get('/:id', validate(findOrDeleteSchema), async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id)

    if (task == null) {
      return taskNotFound(res)
    }

    handleOk(res, task)
  } catch (error) {
    handleError(res, error)
  }
})

router.post('/:id', validate(updateSchema), async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id)

    if (task == null) {
      return taskNotFound(res)
    }

    const body = req.body

    task.title = body.title
    task.description = body.description
    task.deadline = body.deadline
    task.priority = body.priority
    task.done = body.done
    task.tags = body.tags

    const newTask = await task.save()

    handleOk(res, newTask)
  } catch (error) {
    handleError(res, error)
  }
})

router.delete('/:id', validate(findOrDeleteSchema), async (req, res) => {
  try {
    await Task.destroy({ where: { id: req.params.id } })

    handleOk(res, { deleted: true })
  } catch (error) {
    handleError(res, error)
  }
})

module.exports = router
