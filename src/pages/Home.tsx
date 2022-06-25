import {
  Alert,
  Box,
  CircularProgress,
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
import { Task, TaskProp } from "../Interfaces"
import React from "react"
import { signOut, getAuth } from "firebase/auth"
import { db } from "../utils/firebase"
import {
  collection,
  FieldValue,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore"
import {
  AddTaskToDB,
  deleteTaskOfDB,
  queryTaskName,
  toggleDoneDB,
  updateTaskNameDB,
} from "../utils/utils"

const messages: string[] = [
  "Se ha renombrado la tarea con éxito",
  "No se puede ingresar un nombre vacío",
  "Ya existe una tarea con ese nombre",
  "La tarea fue agregada con éxito",
  "¡Felicitaciones! completaste una tarea",
]

const HomePage: FC = () => {
  useEffect(() => {
    const collectionRef = collection(db, collectionName)
    const q = query(collectionRef, orderBy("timestamp", "desc"))
    const unsub = onSnapshot(q, (snapshot) =>
      setTaskItems(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    )
    setLoading(false)
    return unsub
  }, [])

  const auth = getAuth()
  const logout = () => {
    signOut(auth)
    localStorage.removeItem("uid")
  }
  const [loading, setLoading] = useState<boolean>(true)
  const [taskItems, setTaskItems] = useState<any[]>([])
  const [showCompleted, setShowCompleted] = useState<boolean>(true)
  const [errorOpenFirst, setErrorOpenFirst] = useState<boolean>(false)
  const [congrats, setCongrats] = useState<boolean>(false)
  const [errorOpenSecond, setErrorOpenSecond] = useState<boolean>(false)
  const [successOpen, setSuccessOpen] = useState<boolean>(false)
  const [successOpenSecond, setSuccessOpenSecond] = useState<boolean>(false)
  const [collectionName, setCollectionName] = useState<string>(
    localStorage.getItem("uid") || ""
  )

  useEffect(() => {
    console.log(taskItems)
  }, [taskItems])

  const deleteTask = async (id: string) => {
    deleteTaskOfDB(id, collectionName)
  }
  const toggleTask = (
    name: string,
    id: string,
    done: boolean,
    timestamp: FieldValue
  ) => {
    toggleDoneDB(name, id, done, timestamp, collectionName)
    setCongrats(true)
  }
  const editTask = async (
    newName: string,
    id: string,
    done: boolean,
    timestamp: FieldValue
  ) => {
    if (newName.trim() !== "") {
      if ((await queryTaskName(newName, collectionName)) === 0) {
        updateTaskNameDB(newName, id, done, timestamp, collectionName)
        setSuccessOpen(true)
      } else {
        setErrorOpenSecond(true)
      }
    } else {
      setErrorOpenFirst(true)
    }
  }

  const AddTask = async (taskName: string) => {
    if (taskName.trim() !== "") {
      if ((await queryTaskName(taskName, collectionName)) === 0) {
        AddTaskToDB(taskName, collectionName)
        setSuccessOpenSecond(true)
      } else {
        setErrorOpenSecond(true)
      }
    } else {
      setErrorOpenFirst(true)
    }
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
    setCongrats(false)
  }

  const taskTableRows = (doneValue: boolean) =>
    taskItems
      .filter((task) => task.done === doneValue)
      .map((row: Task) => (
        <TaskRow
          key={row.id}
          task={row}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          editTask={editTask}
        />
      ))

  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          justifyContent: "space-around",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CircularProgress sx={{ marginBottom: "30px" }} />
          <Typography>Cargando contenido</Typography>
        </Box>
      </Box>
    )
  } else {
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
        <TaskBanner logout={logout} />

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
        <Snackbar open={congrats} autoHideDuration={2000} onClose={handleClose}>
          <Alert severity="success">{messages[4]}</Alert>
        </Snackbar>
      </Paper>
    )
  }
}

export default HomePage
