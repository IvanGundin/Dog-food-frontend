export const sort = () => {
    const sortByDatehook = (sortDate, prevState) => {
        let newSort = prevState?.sort((item1, item2) => {
            if (sortDate === 'up') {
                if (item1.created_at > item2.created_at) {
                    return 1;
                } else {
                    return -1;
                }
            } else {
                if (item1.created_at < item2.created_at) {
                    return 1;
                } else {
                    return -1;
                }
            }

        })
        return newSort;
    }

    const sortByLikeshook = (sortLikes, prevState) => {
        let newSort = prevState.sort((item1, item2) => {
            if (sortLikes === 'up') {
                if (item1.likes.length > item2.likes.length) {
                    return 1;
                } else {
                    return -1;
                }
            } else {
                if (item1.likes.length < item2.likes.length) {
                    return 1;
                } else {
                    return -1;
                }
            }
        })
        return newSort
    }

    const sortByTitlehook = (sortTitle, prevState) => {
        let newSort = prevState.sort((item1, item2) => {
            if (sortTitle === "up") {
                return item1.title.trim().localeCompare(item2.title.trim());
            } else {
                return item2.title.trim().localeCompare(item1.title.trim());

            }
        })
        return newSort
    }
    const sortByFavorites = (prevState) => prevState.filter((item) => localStorage.getItem('favorites')?.includes(item._id));
    const sortByMyPosts = (prevState, myUser) => prevState.filter((item) => item.author._id === myUser._id);
    return { sortByDatehook, sortByLikeshook, sortByTitlehook, sortByFavorites, sortByMyPosts }
}