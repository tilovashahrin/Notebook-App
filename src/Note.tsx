import { Col, Row } from "react-bootstrap"
import { useNote } from "./NoteLayout"

type NoteProps = {

}

export function Note({ }: NoteProps) {
    const note = useNote()

    return <>
        <Row classname="align-items-center mb-4">
            <Col><h1>{note.title}</h1></Col>
        </Row>
    </>
}