export const dummy = (blogs) => {
    return 1
}

export const totalLikes = (blogs) => {
    return blogs.reduce((acc, cur) => acc += cur.likes, 0)
}
