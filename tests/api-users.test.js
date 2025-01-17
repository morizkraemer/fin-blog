import { test, after, beforeEach, describe, before } from 'node:test'
import assert, { strictEqual } from 'node:assert'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app.js'
import { User } from '../models/blog-users.js'
import bcrypt from 'bcrypt'
import { initialUsers, usersInDb } from './users-test-helpers.js'

const api = supertest(app)

after(async () => {
    await mongoose.connection.close()
})

console.log('-- api user test --');
console.log();

describe('when there is one user saved initially', async () => {
    beforeEach(async () => {
        await mongoose.connection.dropDatabase();

        const userObjects = await Promise.all(initialUsers.map(async ({ name, username, password }) => {
            const passwordHash = await bcrypt.hash(password, 10);
            return new User({ name, username, passwordHash });
        }));

        const promiseArray = userObjects.map(user => user.save());
        await Promise.all(promiseArray);
    });
    test('initial users creation test', async () => {
        const allUsers = await usersInDb()
        assert.ok(allUsers.length === initialUsers.length)

    })
    test('user gets created with fresh username', async () => {
        await api
            .post('/api/users/')
            .send({
                username: 'newUser2',
                name: 'new user',
                password: 'supersecret',
            })
            .expect(201)
        const nUsers = await usersInDb()
        assert.ok(nUsers.length - initialUsers.length === 1)
    })
})
