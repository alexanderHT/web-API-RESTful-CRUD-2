var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* create memo schema */
var memoSchema = new Schema({
  title: String,
  memo_text: String

}, {
  timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var memos = mongoose.model('memos', memoSchema);

// make this available to our users in our Node applications
module.exports = memos;
