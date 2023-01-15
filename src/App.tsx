import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from 'react-bootstrap'
import { Routes, Route, Navigate } from "react-router-dom"
import { NewNote } from './NewNote'


export type NoteData = {
  title: string
  markdown: string
}

function App() {
  //const [count, setCount] = useState(0)

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<h1>Home</h1>}/>
        <Route path="/new" element={<NewNote/>}/>
        <Route path="*" element={<Navigate to="/" />}/>
        <Route path="/:id">
          <Route index element={<h1>Show</h1>}/>
          <Route path="edit" element={<h1>Edit</h1>}/>
        </Route>
        <Route path="*" element={<Navigate to="/"/>} />
    </Routes>
    </Container>
  )
}

export default App