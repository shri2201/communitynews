var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Article = mongoose.model('Article');
var bodyParser = require('body-parser');

module.exports = function (app) {
  app.use('/', router);
  app.use(bodyParser());
};

router.post('/news', function(req, res, next)
{
   var newsline = req.body.newsline;
   if (newsline.length === 0) newsline = 'I said nothing. :-(';
   var user = req.body.username;
   if (user.length === 0) user = 'anonymous';
   var date =  Date().toLocaleString();
   
   console.log(newsline);
   console.log(user);
   console.log(date);
   
   var article = new Article({newsitem: newsline, username: user, timestamp: date});
   
   //Lets save it
   article.save(function (err, userObj) {
   if (err) {
    console.log(err);
   } else {
    console.log('Incident is saved successfully:', userObj);
   }
  });

   res.redirect('/');
});

router.get('/', function (req, res, next) {
  Article.find(function (err, articles) {
    if (err) return next(err);
    console.log(articles);
    res.render('index', {
      title: 'What\'s on?',
      articles: articles
    });
  }).limit(10).sort({ timestamp: -1 });
});
