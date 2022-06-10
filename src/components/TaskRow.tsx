import { Delete } from "@mui/icons-material"
import {
  Checkbox,
  TableCell,
  TableRow,
  IconButton,
  Container,
} from "@mui/material"
import { TaskProp } from "../Interfaces"

interface Props {
  task: TaskProp
  deleteTask(taskNameToDelete: string): void
  toggleTask(task: TaskProp): void
}

export const TaskRow = ({ task, deleteTask, toggleTask }: Props) => {
  return (
    <TableRow>
      <TableCell align="left">{task.name}</TableCell>
      <TableCell align="center" sx={{ width: "100px" }}>
        <Checkbox
          onChange={(e) => toggleTask(task)}
          inputProps={{ "aria-label": "controlled" }}
          checked={task.done}
        />
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
