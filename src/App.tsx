import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import { FC, useEffect, useState } from "react"
import { TaskRow } from "./components/TaskRow"
import { TaskBanner } from "./components/TaskBanner"
import { TaskCreator } from "./components/TaskCreator"
import { VisibilityControl } from "./components/VisibilityControl"
import Login from "./Login"
import { TaskProp } from "./Interfaces"

const App: FC = () => {
  const [userName, setUserName] = useState<string>(
    localStorage.getItem("userName") || ""
  )

  const [taskItems, setTaskItems] = useState<TaskProp[]>(
    JSON.parse(localStorage.getItem("tasks") || "")
  )
  const [showCompleted, setShowCompleted] = useState<boolean>(true)

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskItems))
  }, [taskItems])

  const AddTask = (taskName: string): void => {
    if (!taskItems.find((t, index) => t.name === taskName))
      if (taskName !== "")
        setTaskItems([
          ...taskItems,
          {
            name: taskName,
            done: false,
          },
        ])
      else console.log("No puede ingresar task vacía")
    else console.log("Ya existe la task")
  }

  const logout = () => {
    localStorage.removeItem("password")
    localStorage.removeItem("userName")
    window.location.reload()
  }

  const deleteTask = (taskNameToDelete: string): void => {
    setTaskItems(
      taskItems.filter((task) => {
        return task.name != taskNameToDelete
      })
    )
  }

  const toggleTask = (task: TaskProp) => {
    setTaskItems(
      taskItems.map((t) => (t.name === task.name ? { ...t, done: !t.done } : t))
    )
  }

  if (
    localStorage.getItem("userName") === "abc@email.com" &&
    localStorage.getItem("password") === "password"
  )
    return (
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          paddingBottom: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <TaskBanner userName={userName} logout={logout} />

        <TableContainer
          component={Paper}
          sx={{
            width: "90%",
            marginDown: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TaskCreator callback={AddTask} />
          <Table
            aria-label="simple table"
            sx={{ width: "100%", marginDown: "10px" }}
          >
            <TableHead>
              <TableRow
                sx={{
                  width: "100%",
                }}
              >
                <TableCell align="left">Descripción</TableCell>
                <TableCell align="center" sx={{ width: "100px" }}>
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {taskItems.map((row: TaskProp, key: number) => (
                <TaskRow
                  key={key}
                  task={row}
                  deleteTask={deleteTask}
                  toggleTask={toggleTask}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    )
  else return <Login />
}

export default App
