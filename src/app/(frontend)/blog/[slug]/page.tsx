import { payload } from "@/lib/payload";
import { RichText } from "@/lib/richtext";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { mediaToOGImages } from "@/lib/og";
import { getRenderableImage } from "@/lib/media";

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
    const image = getRenderableImage(post.heroImage);

    if (!post) {
        notFound();
    }

    return (
        <article>
            <h1>{post.title}</h1>

            {image && <img src={image.src} alt={image.alt} width={800} />}

            <RichText content={post.content} />
        </article>
    );
}
