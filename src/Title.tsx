interface Props {
    children: string,
}
export default function Title({children}: Props) {
   return <h3>{children}</h3> 
}
