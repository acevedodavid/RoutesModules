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
    push : function(newPosts) {
        posts = newPosts;
    }
}

module.exports = {ListPosts};