import type { CollectionConfig } from "payload";
import { revalidateBlog } from "@/lib/revalidate";

export const Categories: CollectionConfig = {
    slug: "categories",

    hooks: {
        afterChange: [
            async ({ doc }) => {
                // lista bloga (bo badge, breadcrumb itp.)
                await revalidateBlog();

                // konkretna strona kategorii
                await revalidateBlog(undefined, doc.slug);
            },
        ],

        afterDelete: [
            async ({ doc }) => {
                await revalidateBlog();
                await revalidateBlog(undefined, doc.slug);
            },
        ],
    },

    admin: {
        useAsTitle: "title",
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
            admin: {
                description: 'Używany w URL, np. "frontend", "nextjs"',
            },
        },
    ],
};
