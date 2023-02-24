import { Button, Col, Form, Row, Stack } from "react-bootstrap"
import { NoteData, Tag } from "./App"
import { Link } from "react-router-dom"
import ReactSelectCreatable from "react-select/creatable"
import { useState } from "react"

type NotesListProps = {
    availableTags: Tag[]
}

export function NotesList({ availableTags }: NotesListProps) {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [title, setTitle] = useState("")

    return <>
        <Row className="align-items-center mb-4">
            <Col>
                <h1>Notes</h1>
            </Col>
            <Col xs="auto">
                <Stack gap={2} direction="horizontal">
                    <Link to="/new">
                        <Button variant="primary">Create</Button>
                    </Link>
                    <Button variant="outline-secondary">Edit Tags</Button>
                </Stack>
            </Col>
        </Row>
        <Form>
            <Row className="mb-4">
                <Col>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text" value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="tags">
                        <Form.Label>Tags</Form.Label>
                        <ReactSelectCreatable
                            options={availableTags.map(tag => {
                                return { label: tag.label, value: tag.id }
                            })}
                            value={selectedTags.map(tag => {
                                return {
                                    label: tag.label,
                                    value: tag.id,
                                }
                            })}
                            onChange={tags =>
                                setSelectedTags(tags.map(tag => {
                                    return {
                                        label: tag.label,
                                        id: tag.value,
                                    }
                                }))}
                            isMulti
                        />
                    </Form.Group>
                </Col>
            </Row>
        </Form>
        <Row xs={1} sm={2} lg={3} xl={4} className="g-3">

        </Row>
    </>
}