
const { v4: uuidv4 } = require('uuid');
module.exports = (app) => {
    app.post('/login', (req, res) => {
        console.log(req.body);
        let email = 'admin@stroyka.az';
        let password = 'Admin987654321';
        if(email === req.body.email && password === req.body.password ) {
            res.cookie('auth_', uuidv4(), { maxAge: 900000, httpOnly: true });
            res.end("Success")
        }
        else {
            res.status(400).end("Error");
        }
    });
    app.get('/logout', (req, res) => {
        res.clearCookie('auth_');
        res.redirect('/auth/login');
    });
    return app; 
 };