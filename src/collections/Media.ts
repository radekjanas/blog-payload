import { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
    slug: 'media',

    admin: {
        useAsTitle: 'alt',
    },

    upload: {
        staticDir: 'uploads',
        imageSizes: [
            {
                name: 'thumbnail',
                width: 400,
                height: 300,
            },
            {
                name: 'card',
                width: 800,
                height: 600,
            },
        ],
    },

    fields: [
        {
            name: 'alt',
            type: 'text',
            required: true,
        },
    ],
};
