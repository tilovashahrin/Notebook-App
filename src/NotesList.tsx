import { Badge, Button, Card, Col, Fade, Form, Modal, Row, Stack } from "react-bootstrap"
import { Note, NoteData, Tag } from "./App"
import { Link } from "react-router-dom"
import ReactSelectCreatable from "react-select/creatable"
import { useMemo, useState } from "react"
import styles from "./NotesList.module.css"
import { EditNote } from "./EditNote"

type NotesListProps = {
    availableTags: Tag[]
    notes: Note[]
}

type NoteCardProps = {
    id: string
    title: string
    tags: Tag[]
}

type EditTagsModalProps = {
    availableTags: Tag[]
    show: boolean
    handleClose: () => void
}

export function NotesList({ availableTags, notes }: NotesListProps) {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [title, setTitle] = useState("")
    const [editTagsModalOpen, setEditTagsModalOpen] = useState(false)
    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
            return (title === "" || note.title.toLowerCase().includes(title.toLocaleLowerCase())) &&
                (selectedTags.length === 0 || selectedTags.every(tag =>
                    note.tags.some((noteTag: { id: string }) => noteTag.id === tag.id)))
            //checks if our note has all the tags that we are searching for
        })
    }, [title, selectedTags, notes])
    return <>
        <Row className="align-items-center mb-4">
            <Col className="d-flex justify-content-start">
                <h1>Notes</h1>
            </Col>
            <Col className="d-flex justify-content-end">
                <Stack gap={2} direction="horizontal">
                    <Link to="/new">
                        <Button variant="primary">Create</Button>
                    </Link>
                    <Button onClick={() => setEditTagsModalOpen(true)} variant="outline-secondary">Edit Tags</Button>
                    
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
            {filteredNotes.map(note => (
                <Col key={note.id}>
                    <NoteCard
                        id={note.id}
                        tags={note.tags}
                        title={note.title} />
                </Col>
            ))}
        </Row>
        <EditTagsModal availableTags={availableTags} show={editTagsModalOpen} handleClose={() => setEditTagsModalOpen(false)}/>
    </>
}

export function NoteCard({ id, title, tags }: NoteCardProps) {
    return (
        <Card as={Link}
            to={`/${id}`}
            className={`h-100 text-reset text-decoration-none 
            ${styles.card}`}
        >
            <Card.Body>
                <Stack gap={2}
                    className="align-items-center
                justify-content-center h-100">
                    <span className="fs-5">{title}</span>
                    {tags.length > 0 && (
                        <Stack gap={1} direction="horizontal"
                            className="justify-content-center flex-wrap">
                            {tags.map(tag => (
                                <Badge pill className="text=truncate" bg="primary" key={tag.id}>
                                    {tag.label}
                                </Badge>
                            ))}
                        </Stack>
                    )}
                </Stack>
            </Card.Body>
        </Card>
    )
}

export function EditTagsModal({ availableTags, show, handleClose }: EditTagsModalProps) {
    return <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Edit Tags</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Stack gap={2}>
                    {availableTags.map(tag => (
                        <Row key={tag.id}>
                            <Col>
                            <Form.Control type="text" value={tag.label}/>
                            </Col>
                            <Col xs="auto">
                                <Button variant="outline-danger">
                                    &times;
                                </Button>
                            </Col>
                        </Row>
                    ))}
                </Stack>
            </Form>
        </Modal.Body>
    </Modal>
}