
function handleOk(res, data) {
  res.json({
    status: 200,
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
