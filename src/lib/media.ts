import type { Media } from "@/payload-types";

export type RenderableImage = {
    src: string;
    alt: string;
};

export function getRenderableImage(
    media: number | Media | null | undefined,
): RenderableImage | null {
    if (media && typeof media === "object" && typeof media.url === "string") {
        return {
            src: media.url,
            alt: media.alt ?? "",
        };
    }

    return null;
}
