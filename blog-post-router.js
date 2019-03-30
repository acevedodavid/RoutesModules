//David Acevedo
//A01196678
//Lab 8

const express = require('express');
const router = express.Router();
const uuid = require('uuid')
const {
    ListPosts
} = require('./blog-post-model');

//get request of all blog posts
router.get('/blog-posts', (req, res) => {

    let infoOfAllPosts = ListPosts.get();

    if (infoOfAllPosts) {
        res.status(200).json({
            message: 'Successfully sent the list of blog posts',
            status: 200,
            posts: infoOfAllPosts
        })
    } else {
        res.status(500).json({
            message: 'Internal server error.',
            status: 500
        }).send("Finish");
    }
});

//get by author
router.get('/blog-posts/:author', (req, res) => {
    let author = req.params.author

    if (!author) {
        res.status(406).json({
            message: 'No author specified',
            status: 406
        })
    }

    const postsByAuthor = []

    let infoOfAllPosts = ListPosts.get();

    if (infoOfAllPosts) {

        infoOfAllPosts.forEach(function (item, index) {
            if (item.author == author) {
                postsByAuthor.push(item)
            }
        })

        if (postsByAuthor.length === 0) {
            res.status(404).json({
                message: `Posts by ${author} not found`,
                status: 404
            })
        } else {
            res.status(200).json({
                message: `Posts by ${author} found`,
                posts: postsByAuthor
            })
        }
    } else {
        res.status(500).json({
            message: `Internal server error.`,
            status: 500
        }).send("Finish");
    }
});

//post request
router.post('/blog-posts', (req, res) => {
    let requiredFields = ["title", "content", "author", "publishDate"];

    //Validate that we receive both of the params
    //Send error with status 406 "Missing fields"
    for (let i = 0; i < requiredFields.length; i++) {
        let currentField = requiredFields[i];

        if (!(currentField in req.body)) {
            res.status(406).json({
                message: `Missing field ${currentField} in body.`,
                status: 406
            })
            return
        }
    }

    let infoOfAllPosts = ListPosts.get();

    if (infoOfAllPosts) {
        let objectToAdd = {
            id: uuid.v4(),
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            publishDate: req.body.publishDate
        }

        infoOfAllPosts.push(objectToAdd)

        res.status(201).json({
            message: "Post added",
            status: 201
        })
    } else {
        res.status(500).json({
            message: `Internal server error.`,
            status: 500
        }).send("Finish");
    }
});

//delete request
router.delete('/blog-posts', (req, res) => {

    console.log("Delete used");

    let requiredFields = ['id'];
    if (req.body && req.params) {
        for (let i = 0; i < requiredFields.length; i++) {
            let currentField = requiredFields[i];
            if (!(currentField in req.body)) {
                res.status(406).json({
                    message: `Missing field ${currentField} in body.`,
                    status: 406
                }).send("Finish");
            }
            if (!(req.params[currentField])) {
                res.status(406).json({
                    message: `Missing field ${currentField} in params.`,
                    status: 406,
                    params: req.params
                }).send("Finish");
            }
        }

        if (req.params.id != req.body.id) {
            return res.status(406).json({
                message: `ID '${req.body.id}' in body different than ID '${req.params.id}' in params.`,
                status: 406
            }).send("Finish")
        }

        let id = req.params.id
        let infoOfAllPosts = ListPosts.get();

        if (infoOfAllPosts) {
            infoOfAllPosts.forEach(function (item, index) {
                if (id == item.id) {
                    infoOfAllPosts.splice(index, 1)
                    //ListPosts.push(infoOfAllPosts)
                    res.status(204).json({
                        message: `Successfully deleted post with id: ${item.id}.`,
                        status: 204
                    })
                }
            })

            res.status(404).json({
                message: 'Post was not found',
                status: 404
            })
        } else {
            res.status(500).json({
                message: `Internal server error.`,
                status: 500
            }).send("Finish");
        }
    } else {
        res.status(406).json({
            message: 'Body or params empty',
            status: 406,
            params: req.params
        }).send("Finish");
    }


});

//put request
router.put('/blog-posts/:id', (req, res) => {

    let id = req.params.id

    //Return a 406 status if the id is missing.
    if (!(id)) {
        res.status(406).json({
            message: 'Missing field id in params.',
            status: 406
        })
    }

    if (req.body.length == 0) {
        res.status(404).json({
            message: 'Empty body.',
            status: 404
        }).send("Finish")
    }

    let infoOfAllPosts = ListPosts.get();

    if (infoOfAllPosts) {


        //Update fields passed in the body
        infoOfAllPosts.forEach(item => {
            if (item.id == id) {
                let noValidKeys = true
                for (let key in req.body) {
                    if (key == 'title' || key == 'content' || key == 'author' || key == 'publishDate') {
                        item[key] = req.body[key]
                        empty = false
                    }
                }
                if (noValidKeys) {
                    return res.status(404).json({
                        message: 'No valid keys found in body.',
                        status: 404
                    }).send("Finish")
                } else {
                    res.status(204).json({
                        message: `Post with id '${id}' successfully updated.`,
                        status: 204
                    }).send("Finish")
                }
            }
        })


        res.status(404).json({
            message: 'Post was not found',
            status: 404
        })
    } else {
        res.status(500).json({
            message: `Internal server error.`,
            status: 500
        }).send("Finish");
    }
});

module.exports = router;