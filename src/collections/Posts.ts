import { CollectionConfig } from "payload";
import { revalidateBlog } from "@/lib/revalidate";
import { getRenderableCategories } from "@/lib/categories";

export const Posts: CollectionConfig = {
    slug: "posts",

    hooks: {
        afterChange: [
            async ({ doc }) => {
                await revalidateBlog(doc.slug);

                const categories = getRenderableCategories(doc.categories);

                for (const category of categories) {
                    await revalidateBlog(undefined, category.slug);
                }
            },
        ],
        afterDelete: [
            async ({ doc }) => {
                await revalidateBlog(doc.slug);

                const categories = getRenderableCategories(doc.categories);
                for (const category of categories) {
                    await revalidateBlog(undefined, category.slug);
                }
            },
        ],
    },

    admin: {
        useAsTitle: "title",
    },

    access: {
        read: () => true,
    },

    fields: [
        {
            name: "title",
            type: "text",
            required: true,
        },
        {
            name: "slug",
            type: "text",
            required: true,
            unique: true,
        },
        {
            name: "publishedAt",
            type: "date",
            admin: {
                position: "sidebar",
            },
        },
        {
            name: "heroImage",
            type: "relationship",
            relationTo: "media",
            admin: {
                position: "sidebar",
            },
        },
        {
            name: "content",
            type: "richText",
            required: true,
        },
        {
            name: "category",
            type: "relationship",
            relationTo: "categories",
            hasMany: true,
        },
    ],
};
