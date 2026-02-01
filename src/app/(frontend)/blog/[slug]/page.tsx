import { payload } from '@/lib/payload';
import { notFound } from 'next/navigation';

type Props = {
    params: {
        slug: string;
    };
};

export default async function BlogPostPage({ params }: Props) {
    const { slug } = params;

    const posts = await payload.find({
        collection: 'posts',
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

    return (
        <article>
            <h1>{post.title}</h1>

            {post.heroImage && (
                <img src={post.heroImage.url} alt={post.heroImage.alt} width={800} />
            )}

            <pre>{JSON.stringify(post.content, null, 2)}</pre>
        </article>
    );
}
