import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from 'react-bootstrap'
import { Routes, Route, Navigate } from "react-router-dom"
import { NoteData } from "./App"
import {NoteForm} from "./NoteForm"

type NewNoteProps = {
    // onSubmit: (data: NoteData) => void
}

export function NewNote({}: NewNoteProps) {
    return (
        <>
            <h1 className='mb-4'>New Note</h1>
            <NoteForm
            />
        </>
    )
}