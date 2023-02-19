


export const filterFollowers = (userId, followers) => {
    const userFollowers = [];

    Object.values(followers).forEach((follower) => {
        const followerFollows = Object.values(follower.following)

        followerFollows.forEach((follow) => {
            if (follow.followee.id == userId) userFollowers.push(follower)
        })
    })

    return userFollowers;
}
