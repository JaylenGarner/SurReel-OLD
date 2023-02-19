


const getLike = (userId, postId, likes) => {

    let myLike;

    Object.values(likes).forEach((like) => {

        if (like.user.id == userId && like.post_id == postId) {
            myLike = like
        }
    })

    return myLike
}



export const likeHelper = (userId, postId, likes) => {
    const myLike = getLike(userId, postId, likes)

    if (myLike) return myLike
    return null
}
