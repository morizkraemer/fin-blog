import { BlogPost } from "../models/blog-post.js"
const myUser = "678a8bf920d1533987654153"
export const initialPosts = [
    {
        "_id": "67880e5462359ec2ea2e958f",
        "title": "secondOne",
        "author": myUser,
        "url": "gq",
        "likes": 5,
        "__v": 0
    }, {
        "_id": "67880e6862359ec2ea2e9592",
        "title": "firstOne",
        "author": myUser,
        "url": "gq",
        "likes": 8,
        "__v": 0
    }
]

export const testPosts = {
    normal: {
        title: "new post",
        author: myUser,
        url: "gq",
        likes: 5,
    },
    noLikes: {
        title: "secondOne",
        author: myUser,
        url: "gq",
    },
    noUrlTitle: {
        author: myUser,
        likes: 5
    },
    minimum: {
        title: 'minimum post',
        author: myUser,
    },
    postUpdate: {
        title: "updated post",
        author: myUser,
        url: "g3",
        likes: 2,
    },
    likesUpdate: {
        likes: 25
    }
}

// TODO: it doesnt work??
export const nonExistingId = async () => {
    //const newPost = new BlogPost(testPosts.minimum)
    //await newPost.save()
    //await newPost.deleteOne()
    //return newPost._id.toString()
    return 1

}

export const postsInDb = async () => {
    const posts = await BlogPost.find({})
    return posts.map(post => post.toJSON())
}

export const npostsInDb = async () => {
    const posts = await BlogPost.find({})
    return posts.length
}
