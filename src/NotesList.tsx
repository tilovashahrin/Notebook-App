import { Button, Col, Form, Row, Stack } from "react-bootstrap"
import { NoteData, Tag } from "./App"
import { Link } from "react-router-dom"

type NotesListProps = {

}

export function NotesList() {
    return <>
        <Row>
            <Col>
                <h1>Notes</h1>
            </Col>
            <Col xs="auto">
                <Stack gap={2} direction="horizontal">
                    <Link to="/new">
                        <Button variant="primary">Create</Button>
                    </Link>
                </Stack>
            </Col>
        </Row>
        <Form>
            <Row></Row>
        </Form>
    </>
}