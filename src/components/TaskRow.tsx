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
import React, { useState } from "react"
import { TaskProp } from "../Interfaces"

interface Props {
  task: TaskProp
  deleteTask(taskNameToDelete: string): void
  toggleTask(task: TaskProp): void
  editTask(originalName: string, newName: string): void
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
        <Typography fontStyle={task.done ? "normal" : "oblique"}>
          {task.name}
        </Typography>
      </TableCell>
      <TableCell align="center" sx={{ width: "150px" }}>
        <Checkbox
          onChange={(e) => toggleTask(task)}
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
            />
            <IconButton
              onClick={() => {
                {
                  editTask(task.name, editedTaskName)
                  setEditedTaskName("")
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
            deleteTask(task.name)
          }}
        >
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}
