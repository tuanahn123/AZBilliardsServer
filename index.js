const express = require('express')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

require('dotenv').config();

const session = require('express-session');

// Cấu hình middleware session
app.use(session({
    secret: 'AZBilliards@123',
    resave: false, 
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));
// connect to mySQL
require('./dbs/initDb')
require('./dbs/importDb')
//init router
var indexRouter = require('./router/index.routes')

app.use('/', indexRouter)

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    console.warn(`${req.url} Not Found!`);
    next(error)
})
app.use((error, req, res, next) => {
    const status = error.status || 500
    console.log(error);
    return res.json({
        status:'error',
        code: status,
        stack:error.stack,
        message: error.message || 'Inernal Server Error'
    })
})

const server = app.listen(process.env.APP_PORT, () => {
    console.log(`Server start with ${process.env.APP_PORT}`);
})
