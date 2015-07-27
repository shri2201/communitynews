// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  newsitem: String,
  username: String,
  timestamp: String
});

ArticleSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Article', ArticleSchema);

