import { payload } from "@/lib/payload";
import type { Metadata } from "next";

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
                {posts.docs.map((post) => (
                    <li key={post.id}>
                        <a href={`/blog/${post.slug}`}>{post.title}</a>
                    </li>
                ))}
            </ul>
        </main>
    );
}
