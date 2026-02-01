import { CollectionConfig } from 'payload';

export const Posts: CollectionConfig = {
    slug: 'posts',

    admin: {
        useAsTitle: 'title',
    },

    access: {
        read: () => true,
    },

    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'publishedAt',
            type: 'date',
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'heroImage',
            type: 'relationship',
            relationTo: 'media',
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'content',
            type: 'richText',
            required: true,
        },
    ],
};
