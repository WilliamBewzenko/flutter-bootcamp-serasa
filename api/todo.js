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
      title: body.title ?? null,
      description: body.description,
      deadline: body.deadline ?? null,
      priority: body.priority ?? null,
      finished: body.finished ?? null,
      archived: body.archived ?? null,
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

    task.title = body.title ?? null
    task.description = body.description
    task.deadline = body.deadline ?? null
    task.priority = body.priority ?? null
    task.finished = body.finished ?? null
    task.archived = body.archived ?? null
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
