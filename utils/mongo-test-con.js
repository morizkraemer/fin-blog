import { after } from 'node:test'
import { MongoMemoryServer } from 'mongodb-memory-server'

export const createTestDB = async () => {
    const mongod = await MongoMemoryServer.create({
        instance: {
            dbPath: '/home/morizk/CODE/COURSE/FINNLAD/blog/memdb/'
        }
    })

    after(async () => {
        await mongod.stop()
    })

    return mongod.getUri()
}
