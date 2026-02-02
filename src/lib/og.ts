import type { Media } from "@/payload-types";

export function mediaToOGImages(media: number | Media | null | undefined) {
    if (media && typeof media === "object" && typeof media.url === "string") {
        return [{ url: media.url }];
    }
    return undefined;
}
