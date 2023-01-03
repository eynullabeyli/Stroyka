const express = require('express')
const app = express()
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser())
const port = 3001
app.set('view engine', 'ejs')
const expressLayouts = require('express-ejs-layouts')
app.use(expressLayouts)
app.use(express.static('public'))
const router = express.Router()
const routes = require('./routes/pages')(router, {});
const authRoutes = require('./routes/pages')(router, {});
const procedure = require('./routes/internalapi')(router, {});
app.set('layout', './layouts/completeui')

app.get('/', (req, res) => {
  res.redirect('/auth/login')
})
app.use('/auth', authRoutes);
app.use('/dashboard', routes);
app.use('/dashboardapi', procedure);
app.listen(port, () => {
  console.log(`Admin dashboard isleyir ${port}`)
})