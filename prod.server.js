var express = require('express')
var compression = require('compression')

var app = express()

var apiRoutes = express.Router()

app.use('/api', apiRoutes)

app.use(compression())

app.use(express.static('./dist'))

module.exports = app.listen(9000, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + 9000 + '\n')
})
