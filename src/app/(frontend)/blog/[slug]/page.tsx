import { payload } from "@/lib/payload";
import { RichText } from "@/lib/richtext";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { mediaToOGImages } from "@/lib/og";
import { getRenderableImage } from "@/lib/media";
import { getRenderableCategories } from "@/lib/categories";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-static";
export const revalidate = 60;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const res = await payload.find({
        collection: "posts",
        where: {
            slug: { equals: slug },
        },
        limit: 1,
    });

    const post = res.docs[0];
    if (!post) return {};

    return {
        title: post.title,
        openGraph: {
            title: post.title,
            images: mediaToOGImages(post.heroImage),
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const posts = await payload.find({
        collection: "posts",
        where: {
            slug: {
                equals: slug,
            },
        },
        limit: 1,
    });

    const post = posts.docs[0];

    if (!post) {
        notFound();
    }

    const categories = getRenderableCategories(post.category);
    const image = getRenderableImage(post.heroImage);

    return (
        <article>
            <h1>{post.title}</h1>
            <nav aria-label="breadcrumb">
                <ol>
                    <li>
                        <Link href="/blog">Blog</Link>
                    </li>
                    {categories.map((cat) => (
                        <li key={cat.slug}>
                            <Link href={`/blog/kategoria/${cat.slug}`}>{cat.title}</Link>
                        </li>
                    ))}
                    <li aria-current="page">{post.title}</li>
                </ol>
            </nav>

            {categories.length > 0 && (
                <ul className="categories">
                    {categories.map((cat) => (
                        <li key={cat.slug}>
                            <Link href={`/blog/kategoria/${cat.slug}`}>{cat.title}</Link>
                        </li>
                    ))}
                </ul>
            )}

            {image && (
                <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    priority
                />
            )}

            <RichText content={post.content} />
        </article>
    );
}
