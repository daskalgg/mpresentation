import type { ReactNode } from "react";

interface Props {
    src: string;
    caption?: ReactNode;
    height?: string;
    className?: string;
}

export default function Figure({ src, caption, height, className }: Props) {
    return (
        <figure className={className}>
            <img src={src} style={height ? { height, maxWidth: '100%', objectFit: 'contain' } : undefined} />
            {caption && <figcaption>{caption}</figcaption>}
        </figure>
    )
}
