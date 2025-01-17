import { test, after, beforeEach, describe } from 'node:test'
import assert, { strictEqual } from 'node:assert'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app.js'
import { BlogPost } from '../models/blog-post.js'
import { initialPosts, nonExistingId, npostsInDb, postsInDb, testPosts } from './posts-test-helpers.js'

const api = supertest(app)


after(async () => {
    await mongoose.connection.close();
});


console.log('-- api posts tests --');
console.log();

describe('when there are posts saved initially', () => {

    beforeEach(async () => {
        await mongoose.connection.dropDatabase()
        await BlogPost.create(initialPosts[0])
        await BlogPost.create(initialPosts[1])
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
        strictEqual(response.body.length, 2)
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
            strictEqual(await npostsInDb(), initialPosts.length + 1)
        })

        test('if likes is ommited it defaults to 0', async () => {
            const response = await api.post('/api/blogs').send(testPosts.noLikes)
            strictEqual(response.body.likes, 0)
        })

        test('if title or url missing it returns 400', async () => {
            await api
                .post('/api/blogs')
                .send(testPosts.noUrlTitle)
                .expect(400)
        })
    })
    describe('delete request to /api/blogs/${id}', () => {
        test('with valid ID returns 204 and deletes from DB', async () => {
            await api
                .delete(`/api/blogs/${initialPosts[0]._id}`)
                .expect(204)
            strictEqual(await npostsInDb(), initialPosts.length - 1)
        })

        test('with invalid ID returns 404', async () => {
            await api
                .delete(`/api/blogs/${await nonExistingId()}`)
                .expect(400)
        })
    })
    describe('put request to /api/blogs/${id}', async () => {
        test('with valid ID returns 200 returns updated post', async () => {
            const response = await api
                .put(`/api/blogs/${initialPosts[0]._id}`)
                .send(testPosts.postUpdate)
                .expect(200)
                .expect('Content-Type', /application\/json/)
            strictEqual(response.body.likes, testPosts.postUpdate.likes)
        })
    })

    test('with invalid id returns 400', async () => {
             await api
                .put(`/api/blogs/${await nonExistingId()}`)
                .send(testPosts.postUpdate)
                .expect(400)
    })
})
