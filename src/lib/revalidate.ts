"use server";

import { revalidatePath } from "next/cache";

export async function revalidateBlog(slug?: string) {
    // lista wpisów
    revalidatePath("/blog");

    // pojedynczy wpis
    if (slug) {
        revalidatePath(`/blog/${slug}`);
    }
}
