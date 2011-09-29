express = require('express')
{User, Group} = require('./models.js')

app = express.createServer()

app.configure(->
    app.use(express.logger(format: 'dev'))
    app.use(express.bodyParser())
    app.use(app.router)
)

require('./routes.js')

app.listen(8000)
console.log('express server on Port %d', app.address().port)
