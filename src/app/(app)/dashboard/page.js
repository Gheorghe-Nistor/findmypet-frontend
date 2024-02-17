'use client'

import PostsMap from '../posts/_components/map/PostsMap'

const Dashboard = () => {
    const posts = [
        {
            id: '1',
            lat: 44.4516732795682,
            lang: 26.043691635131836,
            title: 'Pisica',
            type: 'REQUEST',
            reward: '500',
            images: [
                'https://cdn.britannica.com/79/232779-004-9EBC7CB8/German-Shepherd-dog-Alsatian.jpg?s=1500x700&q=85',
                'https://cdn.britannica.com/70/8170-004-B976B858/Chihuahua-smooth-coat.jpg?s=1500x700&q=85',
            ],
        },
        {
            id: '2',
            lang: 26.0931584,
            lat: 44.4432384,
            title: 'Caine',
            type: 'FOUND',
            reward: '20000',
            images: [
                'https://cdn.britannica.com/78/232778-004-B0690D02/English-bulldog-dog.jpg?s=1500x700&q=85',
                'https://cdn.britannica.com/13/234213-004-554F9432/dachshund-dog.jpg?s=1500x700&q=85',
            ],
        },
    ]

    return <PostsMap posts={posts} />
}

export default Dashboard
