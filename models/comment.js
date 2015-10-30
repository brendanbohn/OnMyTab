var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    comment: String,
    bar: String
});

var Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;