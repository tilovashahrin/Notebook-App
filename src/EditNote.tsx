import { NoteData, Tag } from "./App"
import { NoteForm } from "./NoteForm"

type EditNoteProps = {
    onSubmit: (id: string, data: NoteData) => void
    availableTags: Tag[]
}

export function EditNote({ onSubmit, availableTags }: EditNoteProps) {

}