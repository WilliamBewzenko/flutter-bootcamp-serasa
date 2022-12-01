const yup = require('yup')

const taskSchema = yup.object({
  title: yup.string().max(280).nullable(),
  description: yup.string().required(),
  deadline: yup.date().nullable(),
  priority: yup.mixed().oneOf(['high', 'medium', 'low', null]).nullable(),
  finished: yup.bool().nullable(),
  archived: yup.bool().nullable(),
  tags: yup.array().of(yup.string())
})

const createSchema = yup.object({
  body: taskSchema
})

const updateSchema = yup.object({
  body: taskSchema,
  params: yup.object({
    id: yup.string().uuid().required(),
  })
})

const findOrDeleteSchema = yup.object({
  params: yup.object({
    id: yup.string().uuid().required(),
  })
})

module.exports.createSchema = createSchema
module.exports.updateSchema = updateSchema
module.exports.findOrDeleteSchema = findOrDeleteSchema
