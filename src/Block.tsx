import type { ReactNode } from "react";
import Text from "./Text";

interface Props {
    children: ReactNode;
    asFrag?: boolean;
}

export default function Block({ children, asFrag }: Props) {
    return <Text asFrag={asFrag} className="block">{children}</Text>
}
