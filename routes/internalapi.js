module.exports = (app) => {
    app.post('/login', (req, res) => {
        res.send("Salam")
    });
    return app; 
 };