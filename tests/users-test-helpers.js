import { User } from '../models/blog-users.js'

export const initialUsers = [
    {
        name: 'testUser1',
        username: 'testUser1',
        password: 'password'
    },
    {
        name: 'testUser2',
        username: 'testUser2',
        password: 'password2'
    }
]



export const usersInDb = async () => {
    const response = await User.find({})
    return response
}
