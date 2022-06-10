import { AddBox } from "@mui/icons-material"
import { Button, Container, Paper, TextField } from "@mui/material"
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

  const logout = () => {
    localStorage.setItem("password", "")
    localStorage.setItem("userName", "")
    window.location.reload()
  }

  return (
    <Container
      sx={{
        marginBottom: "20px",
        marginTop: "20px",
        display: "flex",
        alignItems: "center",
        width: "100%",
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
      />
      <Button
        key={props.id}
        color="primary"
        onClick={() => {
          createNewTask()
        }}
      >
        <AddBox />
      </Button>
    </Container>
  )
}
