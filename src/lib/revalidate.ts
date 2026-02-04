"use server";

import { revalidatePath } from "next/cache";

export async function revalidateBlog(slug?: string, categorySlug?: string) {
    revalidatePath("/blog");
    if (slug) revalidatePath(`/blog/${slug}`);
    if (categorySlug) revalidatePath(`/blog/kategoria/${categorySlug}`);
}
