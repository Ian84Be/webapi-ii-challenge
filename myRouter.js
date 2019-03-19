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

router.get('/', async (req,res) => {
    try {
        const posts = await Posts.find();
        res.status(200).json(posts);
    }
    catch (err) {
        res.status(500).json({message:'The posts information could not be retrieved.'});
    }
});

router.get('/:id', async (req,res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (post[0]) {
            res.status(200).json(post);
        }
        else {
            res.status(404).json({error:'The post with the specified ID does not exist.'});
        }
    }
    catch (err) {
        res.status(500).json({message:'The post information could not be retrieved.'});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const count = await Posts.remove(req.params.id);
        console.log(count);
        if (count > 0) {
            res.status(200).json({message:'The post has been removed.'});
        }
        else {
            res.status(404).json({error:'The post with the specified ID does not exist.'});
        }
    }
    catch (err) {
        res.status(500).json({error:'The post with the specified ID does not exist.'});
    }
});

router.put('/:id', async (req,res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({error:"Please provide title and contents for the post."});
    }
    try {
        let count = await Posts.update(req.params.id, req.body);
        console.log(count);

        if (count > 0) {
            const post = await Posts.findById(req.params.id);
            res.status(200).json(post);
        }
        else {
            res.status(404).json({error:'The post with the specified ID does not exist.'});
        }
    } catch(err) {
        res.status(500).json({error:'The post information could not be modified.'});
    }
});

module.exports = router;