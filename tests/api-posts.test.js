import { test, after } from 'node:test'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app.js'

const api = supertest(app)

after(async () => {
    await mongoose.connection.close();
});

test('blogposts are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
});

test('test test', async () => {
    await api
        .get('/test')
        .expect(200)
});

