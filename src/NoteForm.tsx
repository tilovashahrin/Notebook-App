import { FormEvent, useRef } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelectCreatable from 'react-select/creatable'

export function NoteForm({onSubmit}: NoteFormProps) {
    const titleRef = useRef<HTMLInputElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    function handleSubmit(e: FormEvent){
        e.preventDefault()
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control ref={titleRef} required />
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
                        <Form.Control required as="textarea" ref={textareaRef} rows={15}/>
                    </Form.Group>
                </Row>
                <Row>
                    <Stack direction="horizontal" gap={3} className="justify-content-end">
                        <Button type="submit" variant="primary">Save</Button>
                        <Link to="..">
                        <Button type="button" variant="outline-secondary">Cancel</Button>
                        </Link>
                    </Stack>
                </Row>
            </Stack>
        </Form>
    )
}