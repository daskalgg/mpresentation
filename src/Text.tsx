import type { ReactNode } from "react"
import { Fragment } from "@revealjs/react"

interface Props {
    children: ReactNode,
    className?: string
    asFrag?: boolean
}

export default function Text({ children, className, asFrag }: Props) {
    return <>
        {
            asFrag ?
                <Fragment as="small" className={className}>{children}</Fragment>
                :
                <small className={className}>{children}</small>
        }
        <br />
    </>
}
