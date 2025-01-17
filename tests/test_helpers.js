import { BlogPost } from "../models/blog-post.js"
export const initialPosts = [
    {
        "_id": "67880e5462359ec2ea2e958f",
        "title": "secondOne",
        "author": "Me, bitch",
        "url": "gq",
        "likes": 5,
        "__v": 0
    }, {
        "_id": "67880e6862359ec2ea2e9592",
        "title": "firstOne",
        "author": "Not me, bitch",
        "url": "gq",
        "likes": 8,
        "__v": 0
    }
]

export const testPosts = {
    normal: {
        title: "new post",
        author: "Me, bitch",
        url: "gq",
        likes: 5,
    },
    noLikes: {
        title: "secondOne",
        author: "Me, bitch",
        url: "gq",
    },
    noUrlId: {
        author: "Me, bitch",
        likes: 5
    },
    minimum: {
        title: 'minimum post',
        url: 'gqqfwf'
    },
    postUpdate: {
        title: "updated post",
        author: "Me again, bitch",
        url: "g3",
        likes: 2,
    },
    likesUpdate: {
        likes: 25
    }
}

export const nonExistingId = async () => {
    const note = new BlogPost(testPosts.minimum)
    await note.save()
    await note.deleteOne()

    return note._id.toString()
}

export const postsInDb = async () => {
    const posts = await BlogPost.find({})
    return posts.map(post => post.toJSON())
}

export const npostsInDb = async () => {
    const posts = await BlogPost.find({})
    return posts.length
}
