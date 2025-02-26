// Create web server
// npm install express
// npm install body-parser
// npm install mongoose

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Comment = require('./models/comment');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/comments', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

app.post('/api/comments', (req, res, next) => {
    const comment = new Comment({
        name: req.body.name,
        comment: req.body.comment
    });
    comment.save().then((createdComment) => {
        res.status(201).json({
            message: 'Comment added successfully',
            commentId: createdComment._id
        });
    });
});

app.get('/api/comments', (req, res, next) => {
    Comment.find().then((documents) => {
        res.status(200).json({
            message: 'Comments fetched successfully',
            comments: documents
        });
    });
});

app.delete('/api/comments/:id', (req, res, next) => {
    Comment.deleteOne({ _id: req.params.id }).then((result) => {
        console.log(result);
        res.status(200).json({
            message: 'Comment deleted'
        });
    });
});

module.exports = app;