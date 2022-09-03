const express = require('express')
const app = express()
const port = 3001
app.set('view engine', 'ejs')
const expressLayouts = require('express-ejs-layouts')
app.use(expressLayouts)
app.use(express.static('public'))
const router = express.Router()
const routes = require('./routes/pages')(router, {});
const procedure = require('./routes/internalapi')(router, {});
app.set('layout', './layouts/completeui')

app.get('/', (req, res) => {
  res.redirect('/dashboard')
})
app.use('/dashboard', router);
app.use('/dashboardapi', procedure);
app.listen(port, () => {
  console.log(`Admin dashboard isleyir ${port}`)
})