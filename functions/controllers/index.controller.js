module.exports = function(app) {
  app.get('/', function (req, res) {
    res.set('Cache-Control', 'public, max-age=3000, s-maxage=6000');
    res.render('index', {})
  });

};
