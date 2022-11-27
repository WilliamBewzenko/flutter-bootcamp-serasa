const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    })
    
    return next()
  } catch (err) {
    return res.status(412).json({
      status: 412,
      type: err.name,
      message: err.message
    })
  }
}

module.exports.validate = validate
