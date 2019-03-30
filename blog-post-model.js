//David Acevedo
//A01196678
//Lab 8

const uuid = require('uuid')

let posts = [
    {
        id: uuid.v4(),
        title: 'First Post',
        content: 'Content 1',
        author: 'davidacevedo',
        publishDate: '24-Mar-2019'
    },
    {
        id: uuid.v4(),
        title: 'Second Post',
        content: 'Content 2',
        author: 'davidacevedo',
        publishDate: '24-Mar-2019'
    },
    {
        id: uuid.v4(),
        title: 'Third Post',
        content: 'Content 3',
        author: 'myAuthor',
        publishDate: '24-Mar-2019'
    },
    {
        id: uuid.v4(),
        title: 'Test Post',
        content: 'Test Post for lab 8',
        author: 'lab8',
        publishDate: '29-Mar-2019'
    }
]

const ListPosts = {
	get : function() {
		return posts;
	},
    push : function(newPost) {
        posts.push(newPost);
    },
    getByAuthor : function(author) {
        let postsByAuthor = []
        posts.forEach(function (item, index) {
            if (item.author == author) {
                postsByAuthor.push(item)
            }
        });
        return postsByAuthor;
    },
    deletePost : function(id) {
        let found = false;
        posts.forEach(function (item, index) {
            if (id == item.id) {
                posts.splice(index, 1)
                found = true;
            }
        })
        return found;
    },
    putPost : function(body,id) {
        let found = false;
        posts.forEach(item => {
            if (item.id == id) {
                if (body.title) {
                    item.title = body.title;
                }
                if (body.content) {
                    item.content = body.content;
                }
                if (body.author) {
                    item.author = body.author;
                }
                if (body.publishDate) {
                    item.publishDate = body.publishDate;
                }
                found = true;
            }
        });
        return found;
    }
}

module.exports = {ListPosts};