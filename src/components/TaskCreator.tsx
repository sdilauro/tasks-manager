import { AddBox } from "@mui/icons-material"
<<<<<<< HEAD
import { Container, IconButton, TextField } from "@mui/material"
=======
import { Button, Container, IconButton, Paper, TextField } from "@mui/material"
>>>>>>> parent of e45a79d (Wip)
import React, { useState } from "react"

export const TaskCreator = (props: any) => {
  const [newTaskName, setNewTaskName] = useState<string>("")
  const updateNewTaskValue = (e: {
    target: { value: React.SetStateAction<string> }
  }) => setNewTaskName(e.target.value)

  const createNewTask = () => {
    props.callback(newTaskName)
    setNewTaskName("")
  }

  return (
    <Container
      sx={{
        marginBottom: "20px",
        marginTop: "20px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        color: "secondary",
      }}
    >
      <TextField
        fullWidth
        size="small"
        id="outlined-basic"
        label="Nueva tarea"
        variant="outlined"
        value={newTaskName}
        onChange={updateNewTaskValue}
<<<<<<< HEAD
=======
        onKeyPress={(ev) => {
          if (ev.key === "Enter" || ev.key === "NumpadEnter") {
            createNewTask()
            ev.preventDefault()
          }
        }}
>>>>>>> v.2.0.0
      />
      <IconButton
        key={props.id}
        color="primary"
        onClick={() => {
          createNewTask()
        }}
        size="large"
      >
        <AddBox />
      </IconButton>
    </Container>
  )
}
