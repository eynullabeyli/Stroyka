module.exports = (app) => {
    app.get('/', (req, res) => {
        req.cookies.auth_ ? res.redirect('./dashboard/slider') : res.render("pages/auth/login",  {layout: false});
    });
    app.get('/login', (req, res) => {
        res.render('pages/auth/login', {layout: false})
    });
    app.get('/main', (req, res) => {
        req.cookies.auth_ ? res.render('pages/dashboard/main') : res.render("pages/auth/login",  {layout: false});
    });
    app.get('/slider', (req, res) => {
        req.cookies.auth_ ? res.render('pages/dashboard/slider') : res.render("pages/auth/login",  {layout: false});
    });
    app.get('/banner', (req, res) => {
        req.cookies.auth_ ? res.render('pages/dashboard/banner') : res.render("pages/auth/login",  {layout: false});
    })
    app.get('/category', (req, res) => {
        req.cookies.auth_ ? res.render('pages/dashboard/category') : res.render("pages/auth/login",  {layout: false});
    });
    app.get('/products', (req, res) => {
        req.cookies.auth_ ? res.render('pages/dashboard/products') : res.render("pages/auth/login",  {layout: false});
    });
    app.get('/orders', (req, res) => {
        req.cookies.auth_ ? res.render('pages/dashboard/orders') : res.render("pages/auth/login",  {layout: false});
    });
    app.get('/users', (req, res) => {
        req.cookies.auth_ ? res.render('pages/dashboard/users') : res.render("pages/auth/login",  {layout: false});
    });
    app.get('/about', (req, res) => {
        req.cookies.auth_ ? res.render('pages/dashboard/about') : res.render("pages/auth/login",  {layout: false});
    });
    app.get('/contact', (req, res) => {
        req.cookies.auth_ ? res.render('pages/dashboard/contact') : res.render("pages/auth/login",  {layout: false});
    });
    app.get('/form-request', (req, res) => {
        req.cookies.auth_ ? res.render('pages/dashboard/formrequest') : res.render("pages/auth/login",  {layout: false});
    });
    app.get('/team', (req, res) => {
        req.cookies.auth_ ? res.render('pages/dashboard/team') : res.render("pages/auth/login",  {layout: false});
    });
    return app; 
 };