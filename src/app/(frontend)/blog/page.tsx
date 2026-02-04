import { payload } from "@/lib/payload";
import type { Metadata } from "next";
import { getRenderableCategories } from "@/lib/categories";
import Link from "next/link";

export const dynamic = "force-static";
export const revalidate = 60;

export const metadata: Metadata = {
    title: "Blog",
    description: "Artykuły o technologii i programowaniu",
};

export default async function BlogPage() {
    const posts = await payload.find({
        collection: "posts",
        sort: "-publishedAt",
        limit: 10,
    });

    return (
        <main>
            <h1>Blog</h1>

            <ul>
                {posts.docs.map((post) => {
                    const categories = getRenderableCategories(post.category);

                    return (
                        <article key={post.id}>
                            <h2>
                                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                            </h2>

                            {categories.length > 0 && (
                                <ul>
                                    {categories.map((cat) => (
                                        <li key={cat.slug}>{cat.title}</li>
                                    ))}
                                </ul>
                            )}
                        </article>
                    );
                })}
            </ul>
        </main>
    );
}
