import { USERS } from './users';

export const POSTS = [
    {
        imageUrl: 'https://images.unsplash.com/photo-1541698444083-023c97d3f4b6',
        user: USERS[0].user,
        likes: 128,
        caption: 'This is a simple caption.',
        profile_picture: USERS[0].img,
        comments: [
            {
                user: USERS[1].user,
                comment: 'This is a comment.',
            },
            {
                user: USERS[2].user,
                comment: 'This is another comment.',
            },
        ],
    },

    {
        imageUrl: 'https://images.unsplash.com/photo-1542204637-e67bc7d41e48',
        user: USERS[1].user,
        likes: 180,
        caption: 'WOW, a caption.',
        profile_picture: USERS[1].img,
        comments: [
            {
                user: USERS[0].user,
                comment: 'wow, a comment.',
            },
            {
                user: USERS[2].user,
                comment: 'wow, another comment.',
            },
        ],
    },

    {
        imageUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963',
        user: USERS[2].user,
        likes: 200,
        caption: 'This is a caption.',
        profile_picture: USERS[2].img,
        comments: [
            {
                user: USERS[0].user,
                comment: 'This is a comment.',
            },
            {
                user: USERS[1].user,
                comment: 'This is another comment.',
            },
        ],
    },
];