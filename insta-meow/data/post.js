import { USERS } from './users';

export const POSTS = [
    {
        imageUrl: 'https://images.unsplash.com/photo-1612838320302-3b3b3f1b3b3b',
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
        imageUrl: 'https://images.unsplash.com/photo-1612838320302-3b3b3f1b3b3b',
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
        imageUrl: 'https://images.unsplash.com/photo-1612838320302-3b3b3f1b3b3b',
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