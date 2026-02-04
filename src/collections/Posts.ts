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
        preview: (doc) => {
            if (!doc?.slug) return null;
            return `/api/preview?slug=${doc.slug}`;
        },
    },

    access: {
        read: ({ req }) => {
            // Admin (zalogowany)
            if (req.user) return true;

            // Publiczny frontend
            return {
                status: {
                    equals: "published",
                },
            };
        },
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
        {
            name: "status",
            type: "select",
            options: [
                { label: "Draft", value: "draft" },
                { label: "Published", value: "published" },
            ],
            defaultValue: "draft",
            required: true,
        },
    ],
};
