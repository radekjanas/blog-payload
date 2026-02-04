import type { Category } from "@/payload-types";

export type RenderableCategory = {
    title: string;
    slug: string;
};

export function getRenderableCategories(
    categories: (number | Category)[] | null | undefined,
): RenderableCategory[] {
    if (!categories) return [];

    return categories
        .filter((cat): cat is Category => typeof cat === "object")
        .map((cat) => ({
            title: cat.title,
            slug: cat.slug,
        }));
}
