module.exports = function(app) {
  app.get('/admin/config', function (req, res) {
    res.render('admin_config', {
      title:'Config'
    })
  });
};
