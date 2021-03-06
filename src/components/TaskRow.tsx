import { Delete, Done, Edit } from "@mui/icons-material"
import {
  Checkbox,
  TableCell,
  TableRow,
  IconButton,
  Popover,
  TextField,
  Typography,
} from "@mui/material"
import { Container } from "@mui/system"
import { FieldValue } from "firebase/firestore"
import React, { useState } from "react"
import { Task } from "../Interfaces"

interface Props {
  task: Task
  deleteTask(id: string): void
  toggleTask(
    name: string,
    id: string,
    done: boolean,
    timestamp: FieldValue
  ): void
  editTask(
    newName: string,
    id: string,
    done: boolean,
    timestamp: FieldValue
  ): void
}

export const TaskRow = ({ task, deleteTask, toggleTask, editTask }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [editedTaskName, setEditedTaskName] = useState<string>("")
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setEditedTaskName("")
  }

  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined

  const updateEditTaskValue = (e: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setEditedTaskName(e.target.value)
  }

  return (
    <TableRow>
      <TableCell align="left">
        <Typography
          sx={{ textDecoration: task.done ? "line-through" : "none" }}
        >
          {task.name}
        </Typography>
      </TableCell>
      <TableCell align="center" sx={{ width: "150px" }}>
        <Checkbox
          onChange={(e) =>
            toggleTask(task.name, task.id, task.done, task.timestamp)
          }
          inputProps={{ "aria-label": "controlled" }}
          checked={task.done}
        />
        <IconButton aria-describedby={id} onClick={handleClick}>
          <Edit />
        </IconButton>
        <Popover
          sx={{ p: 20 }}
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "right",
          }}
        >
          <Container
            sx={{
              marginBottom: "20px",
              marginTop: "20px",
              display: "flex",
              alignItems: "center",
              width: "100%",
              color: "tomato",
            }}
          >
            <TextField
              sx={{ marginTop: "10" }}
              fullWidth
              size="small"
              id="outlined-basic"
              label="Editar tarea"
              variant="outlined"
              value={editedTaskName}
              onChange={updateEditTaskValue}
<<<<<<< HEAD
=======
              onKeyPress={(ev) => {
                console.log(`Pressed keyCode ${ev.key}`)
                if (ev.key === "Enter" || ev.key === "NumpadEnter") {
                  editTask(editedTaskName, task.id, task.done, task.timestamp)
                  ev.preventDefault()
                }
              }}
>>>>>>> v.2.0.0
            />
            <IconButton
              onClick={() => {
                {
<<<<<<< HEAD
                  editTask(task.name, editedTaskName)
                  setEditedTaskName("")
=======
                  editTask(editedTaskName, task.id, task.done, task.timestamp)
>>>>>>> v.2.0.0
                }
              }}
              color="inherit"
              size="large"
            >
              <Done />
            </IconButton>
          </Container>
        </Popover>
        <IconButton
          onClick={() => {
            deleteTask(task.id)
          }}
        >
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}
