
function handleOk(res, data, statusCode) {
  res.json({
    status: statusCode || 200,
    data,
  })
}

function handleError(res, error) {
  console.log(error)
  res.status(500).send({
    status: 500,
    type: 'Error',
    message: 'Unknown error',
  })
}


module.exports.handleOk = handleOk
module.exports.handleError = handleError
