import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
        return new Response("Missing slug", { status: 400 });
    }

    const dm = await draftMode();
    dm.enable();

    redirect(`/blog/${slug}`);
}
