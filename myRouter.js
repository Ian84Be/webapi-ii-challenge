const express = require('express');

const Posts = require('./data/db.js');
const router = express.Router();


// server.use('/api/posts', myRouter);
router.post('/', async (req,res) => {

    if (!req.body.title || !req.body.contents) {
        res.status(400).json({error:"Please provide title and contents for the post."});
    }
    try {
        const post = await Posts.insert(req.body);
        const result = await Posts.findById(post.id);
        res.status(201).json(result);
    }

    catch (err) {
        res.status(500).json({message:'There was an error while saving the post to the database.'});
    }
});

module.exports = router;