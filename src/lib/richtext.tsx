import { RichText as PayloadRichText } from "@payloadcms/richtext-lexical/react";

export function RichText({ content }: { content: any }) {
    return <PayloadRichText data={content} />;
}
