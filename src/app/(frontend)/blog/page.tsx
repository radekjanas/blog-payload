import { payload } from "@/lib/payload";
import type { Metadata } from "next";
import { getRenderableCategories } from "@/lib/categories";
import Link from "next/link";
import { Pagination } from "@/components/Pagination";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "Blog",
    description: "Artykuły o technologii i programowaniu",
};

export default async function BlogPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const { page } = await searchParams;
    const currentPage = Number(page ?? "1");

    const posts = await payload.find({
        collection: "posts",
        sort: "-publishedAt",
        limit: 1,
        page: currentPage,
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
                                <ul className="badges">
                                    {categories.map((cat) => (
                                        <li key={cat.slug}>
                                            <Link href={`/blog/kategoria/${cat.slug}`}>
                                                {cat.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </article>
                    );
                })}
            </ul>

            <Pagination
                page={posts.page ?? currentPage}
                totalPages={posts.totalPages}
                basePath="/blog"
            />
        </main>
    );
}
