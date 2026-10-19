import type { ReactNode } from "react";

interface Props {
    children: string | ReactNode | ReactNode[]
}

export default function SpeakerNotes({children}: Props) {
    return (
        <aside className='notes'>
            {children}
        </aside>

    )

}
