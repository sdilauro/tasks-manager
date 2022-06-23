import {
  Alert,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import { FC, useEffect, useState } from "react"
import { TaskRow } from "../components/TaskRow"
import { TaskBanner } from "../components/TaskBanner"
import { TaskCreator } from "../components/TaskCreator"
import { VisibilityControl } from "../components/VisibilityControl"
import { TaskProp } from "../Interfaces"
import React from "react"
import { signOut, getAuth } from "firebase/auth"
import { getFirestore, collection, getDocs } from "firebase/firestore/lite"
import { db } from "../utils/firebase"
import { ref, set } from "firebase/database"

const HomePage: FC = () => {
  const auth = getAuth()

  if (localStorage.getItem("tasks") === null) {
    localStorage.setItem(
      "tasks",
      "[]"
    ) /*Acá debería consultar los datos de login y cargar las tasks del usuario conectado*/
  }

  const messages: string[] = [
    "Se ha renombrado la tarea con éxito",
    "No se puede ingresar un nombre vacío",
    "Ya existe una tarea con ese nombre",
    "La tarea fue agregada con éxito",
  ]
  const [userName, setUserName] = useState<string>(
    localStorage.getItem("userName") || ""
  )

  const [taskItems, setTaskItems] = useState<TaskProp[]>(
    JSON.parse(localStorage.getItem("tasks") || "")
  )

  const [showCompleted, setShowCompleted] = useState<boolean>(false)

  //add Task to DB
  useEffect(() => {
    set(ref(db, `/${localStorage.getItem("uid")}`), taskItems)
  }, [taskItems])

  useEffect(() => {
    localStorage.setItem("showCompleted", String(showCompleted))
  }, [showCompleted])

  const AddTask = (taskName: string): void => {
    if (!taskItems.find((t) => t.name === taskName))
      if (taskName !== "") {
        handleClickSuccessSecond()
        setTaskItems([
          ...taskItems,
          {
            name: taskName,
            done: false,
          },
        ])
      } else handleClickErrorFirst()
    else handleClickErrorSecond()
  }

  const logout = () => {
    signOut(auth)
  }

  const deleteTask = (taskNameToDelete: string): void => {
    setTaskItems(
      taskItems.filter((task) => {
        return task.name !== taskNameToDelete
      })
    )
  }

  const toggleTask = (task: TaskProp) => {
    setTaskItems(
      taskItems.map((t) => (t.name === task.name ? { ...t, done: !t.done } : t))
    )
  }

  const [errorOpenFirst, setErrorOpenFirst] = useState<boolean>(false)
  const [errorOpenSecond, setErrorOpenSecond] = useState<boolean>(false)
  const [successOpen, setSuccessOpen] = useState<boolean>(false)
  const [successOpenSecond, setSuccessOpenSecond] = useState<boolean>(false)

  const handleClickErrorFirst = () => {
    setErrorOpenFirst(true)
  }

  const handleClickErrorSecond = () => {
    setErrorOpenSecond(true)
  }

  const handleClickSuccess = () => {
    setSuccessOpen(true)
  }

  const handleClickSuccessSecond = () => {
    setSuccessOpenSecond(true)
  }

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return
    }

    setSuccessOpen(false)
    setSuccessOpenSecond(false)
    setErrorOpenFirst(false)
    setErrorOpenSecond(false)
  }

  const editTask = (originalName: string, newName: string) => {
    if (!taskItems.find((t) => t.name === newName))
      if (newName !== "") {
        setTaskItems(
          taskItems.map((t) =>
            t.name === originalName ? { ...t, name: newName } : t
          )
        )
        handleClickSuccess()
      } else return handleClickErrorFirst()
    else return handleClickErrorSecond()
  }

  const taskTableRows = (doneValue: boolean) =>
    taskItems
      .filter((task) => task.done === doneValue)
      .map((row: TaskProp, key: number) => (
        <TaskRow
          key={key}
          task={row}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          editTask={editTask}
        />
      ))

  return (
    <Paper
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        minHeight: "100vh",
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
        {taskTableRows(false).length > 0 ? (
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
                <TableCell align="center" sx={{ width: "150px" }}>
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{taskTableRows(false)}</TableBody>
          </Table>
        ) : (
          <Typography sx={{ marginBottom: "15px" }}>
            No tiene tareas sin completar.
          </Typography>
        )}
      </TableContainer>

      <VisibilityControl
        isChecked={showCompleted}
        label={"Ver completadas (" + taskTableRows(true).length + ")"}
        callback={(checked: boolean | ((prevState: boolean) => boolean)) =>
          setShowCompleted(checked)
        }
      />
      {showCompleted && (
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
          {taskTableRows(true).length > 0 ? (
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
                  <TableCell align="center" sx={{ width: "150px" }}>
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{taskTableRows(true)}</TableBody>
            </Table>
          ) : (
            <Typography>No tiene tareas completadas.</Typography>
          )}
        </TableContainer>
      )}

      <Snackbar
        open={errorOpenFirst}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert severity="error">{messages[1]}</Alert>
      </Snackbar>
      <Snackbar
        open={errorOpenSecond}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert severity="error">{messages[2]}</Alert>
      </Snackbar>
      <Snackbar
        open={successOpen}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert severity="success">{messages[0]}</Alert>
      </Snackbar>
      <Snackbar
        open={successOpenSecond}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert severity="success">{messages[3]}</Alert>
      </Snackbar>
    </Paper>
  )
}

export default HomePage
