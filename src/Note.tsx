import { Badge, Col, Row, Stack } from "react-bootstrap"
import { useNote } from "./NoteLayout"

type NoteProps = {

}

export function Note({ }: NoteProps) {
    const note = useNote()
    return <>
        <Row classname="align-items-center mb-4">
            <Col>
                <h1>{note.title}</h1>
                {note.tags.length > 0 && (
                    <Stack
                        gap={1}
                        direction="horizontal"
                        className="flex-wrap"
                    >
                        {note.tags.map( tag => (
                            <Badge className="text-truncate" key={tag.id}>
                                {tag.label}
                            </Badge>
                        ))}
                    </Stack>
                )}
            </Col>
        </Row>
    </>
}