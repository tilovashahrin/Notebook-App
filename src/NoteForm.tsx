import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import ReactSelectCreatable from 'react-select/creatable'
export function NoteForm() {
    return (
        <Form>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <ReactSelectCreatable isMulti />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Form.Group controlId="markdown">
                        <Form.Label>Body</Form.Label>
                        <Form.Control required as="textarea" rows={15}/>
                    </Form.Group>
                </Row>
                <Row>
                    <Stack direction="horizontal" gap={3}>
                        <Button type="submit">Save</Button>
                        <Button type="button">Cancel</Button>
                    </Stack>
                </Row>
            </Stack>
        </Form>
    )
}