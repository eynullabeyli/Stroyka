module.exports = (app) => {
    app.post('/login', (req, res) => {
        res.send("Salam")
    });
    app.get('/logout', (req, res) => {
        res.send("OK@200")
    });
    return app; 
 };