import { test, after, beforeEach, describe } from 'node:test'
import assert, { strictEqual } from 'node:assert'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app.js'
import { Blog } from '../models/Blog.js'
import { initialPosts, postsInDb, testPosts } from './test_helpers.js'

const api = supertest(app)


after(async () => {
    await mongoose.connection.close();
});


console.log('-- api route tests --');
console.log();

describe('when there are posts saved initially', () => {

    beforeEach(async () => {
        await mongoose.connection.dropDatabase()
        await Blog.create(initialPosts[0])
        await Blog.create(initialPosts[1])
    })

    test('blogposts are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    });

    test('there are 2 blogposts', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
        assert(response.body.length, 2)
    })

    describe('POST request to /blogs', () => {
        test('returns new post and it has an id assigned', async () => {
            const postResponse = await api
                .post('/api/blogs')
                .send(testPosts.normal)
                .expect(201)
                .expect('Content-Type', /application\/json/)
            strictEqual(postResponse.body.title, testPosts.normal.title)
            assert.ok('_id' in postResponse.body)

        })

        test.only('adds post to db', async () => {
            await api.post('/api/blogs').send(testPosts.normal)
            assert(await postsInDb(), initialPosts.length + 1)
        })

        test('if likes is ommited it defaults to 0', async () => {
            const response = await api.post('/api/blogs').send(testPosts.noLikes)
            strictEqual(response.body.likes, 0)
        })

        test('if title or url missing it returns 400', async () => {
            await api
                .post('/api/blogs')
                .send(testPosts.noUrlId)
                .expect(400)
        })
    })
})
