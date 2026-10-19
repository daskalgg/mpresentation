import { refIndex } from "./references";

interface Props {
    k: string | string[];
}

// Renders an IEEE-style citation, e.g. [3] or [3, 7]
export default function Cite({ k }: Props) {
    const keys = Array.isArray(k) ? k : [k];
    return <span className="cite">[{keys.map(refIndex).join(", ")}]</span>
}
