import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from 'react-bootstrap'
import { Routes, Route, Navigate } from "react-router-dom"
import { NewNote } from './NewNote'
import { NotesList } from './NotesList'
import { useMemo, useState } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { v4 as uuidV4 } from "uuid"
import { NoteLayout } from './NoteLayout'
import { Note } from './Note'
import { EditNote } from './EditNote'

//includes id
export type Note = {
  id: string
} & NoteData

//data stored from new note page
export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}

export type Tag = {
  id: string
  label: string
}

//for changes in tags
export type RawNote = {
  id: string
} & RawNoteData

//stores id of tags instead of note
export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  const noteWithTag = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags])

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return [...prevNotes, { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) }]
    })
  }

  function onUpdateNote(id: string, { tags, ...data}: NoteData) {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          return { ...note,...data, tagIds: tags.map(tag => tag.id) }
        } else {
          return note
        }
      }) 
    })
  }

  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag])
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={
          <NotesList
            availableTags={tags}
            notes={noteWithTag}
          />}
        />
        <Route path="/new" element={
          <NewNote
            onSubmit={onCreateNote}
            onAddTag={addTag}
            availableTags={tags}
          />}
        />
        <Route path="*" element={<Navigate to="/" />} /> {/* route that does not exist */}
        <Route path="/:id" element={<NoteLayout notes={noteWithTag} />}>
          <Route index element={<Note />} />
          <Route path="edit" element={
            <EditNote
              onSubmit={onUpdateNote}
              onAddTag={addTag}
              availableTags={tags}
            />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
}

export default App
