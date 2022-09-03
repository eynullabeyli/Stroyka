module.exports = (app) => {
    app.get('/', (req, res) => {
        res.redirect('./dashboard/slider')
    });
    app.get('/main', (req, res) => {
        res.render('pages/dashboard/main')
    });
    app.get('/slider', (req, res) => {
        res.render('pages/dashboard/slider')
    });
    app.get('/banner', (req, res) => {
        res.render('pages/dashboard/banner')
    })
    app.get('/category', (req, res) => {
        res.render('pages/dashboard/category')
    });
    app.get('/products', (req, res) => {
        res.render('pages/dashboard/products')
    });
    app.get('/orders', (req, res) => {
        res.render('pages/dashboard/orders')
    });
    app.get('/users', (req, res) => {
        res.render('pages/dashboard/users')
    });
    app.get('/about', (req, res) => {
        res.render('pages/dashboard/about')
    });
    app.get('/contact', (req, res) => {
        res.render('pages/dashboard/contact')
    });
    app.get('/form-request', (req, res) => {
        res.render('pages/dashboard/formrequest')
    });
    app.get('/team', (req, res) => {
        res.render('pages/dashboard/team')
    });
 
    return app; 
 };