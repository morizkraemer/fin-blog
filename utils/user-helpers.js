export const getToken = (req, res, next) => {
    const auth = req.get('authorization')
    console.log(auth);
    if (auth && auth.startsWith('Bearer ')) {
        req.token =  auth.replace('Bearer ', '')
        next()
    }
    return null
}
