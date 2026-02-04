import { payload } from "@/lib/payload";
import Link from "next/link";
import type { Metadata } from "next";
import { getRenderableCategories } from "@/lib/categories";
import { Pagination } from "@/components/Pagination";

export const revalidate = 60;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;

    const res = await payload.find({
        collection: "categories",
        where: {
            slug: { equals: slug },
        },
        limit: 1,
    });

    const category = res.docs[0];
    if (!category) return {};

    return {
        title: `Kategoria: ${category.title}`,
        description: `Posty z kategorii ${category.title}`,
    };
}

export default async function CategoryPage({
    params,
    searchParams,
}: {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ page?: string }>;
}) {
    const { slug } = await params;
    const { page } = await searchParams;
    const currentPage = Number(page ?? "1");

    // 1️⃣ pobierz kategorię
    const categoriesRes = await payload.find({
        collection: "categories",
        where: {
            slug: { equals: slug },
        },
        limit: 1,
        page: currentPage,
    });

    const category = categoriesRes.docs[0];

    if (!category) {
        return <h1>Nie znaleziono kategorii</h1>;
    }

    // 2️⃣ pobierz posty z tą kategorią
    const postsRes = await payload.find({
        collection: "posts",
        where: {
            category: {
                contains: category.id,
            },
        },
        limit: 5,
        page: currentPage,
        depth: 1,
    });

    return (
        <section>
            <h1>Kategoria: {category.title}</h1>

            {postsRes.docs.length === 0 && <p>Brak postów w tej kategorii.</p>}

            {postsRes.docs.map((post) => {
                const categories = getRenderableCategories(post.category);

                return (
                    <article key={post.id}>
                        <h2>
                            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h2>

                        {categories.length > 0 && (
                            <ul>
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

            <Pagination
                page={postsRes.page ?? currentPage}
                totalPages={postsRes.totalPages}
                basePath={`/blog/kategoria/${slug}`}
            />
        </section>
    );
}
