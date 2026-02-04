import type { Media } from "@/payload-types";

export type RenderableImage = {
    src: string;
    alt: string;
    width: number;
    height: number;
};

export function getRenderableImage(
    media: number | null | Media | undefined,
): RenderableImage | null {
    if (
        media &&
        typeof media === "object" &&
        typeof media.url === "string" &&
        typeof media.width === "number" &&
        typeof media.height === "number"
    ) {
        return {
            src: media.url,
            alt: media.alt ?? "",
            width: media.width,
            height: media.height,
        };
    }

    return null;
}
