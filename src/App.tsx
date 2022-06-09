import { Container, CssBaseline, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { TaskRow, TaskProp } from "./components/TaskRow"
import { TaskBanner } from "./components/TaskBanner"
import { TaskCreator } from "./components/TaskCreator"
import { VisibilityControl } from "./components/VisibilityControl"
import Login from "./Login"

function App() {
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

  const AddTask = (taskName: string) => {
    if (!taskItems.find((t) => t.name === taskName))
      if (taskName !== "")
        setTaskItems([...taskItems, { name: taskName, done: false }])
      else console.log("No puede ingresar task vacía")
    else console.log("Ya existe la task")
  }

  const toggleTask = (task: TaskProp) =>
    setTaskItems(
      taskItems.map((t) => (t.name === task.name ? { ...t, done: !t.done } : t))
    )

  const taskTableRows = (doneValue: boolean) =>
    taskItems
      .filter((task) => task.done === doneValue)
      .map((task) => (
        <TaskRow
          name={task.name}
          done={task.done}
          key={task.name}
          toggleTask={toggleTask}
        />
      ))
  if (
    localStorage.getItem("userName") === "abc@email.com" &&
    localStorage.getItem("password") === "password"
  )
    return (
      <div className="App">
        <TaskBanner userName={userName} taskItems={taskItems} />
        <TaskCreator callback={AddTask} />
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th className="columna">Descripción</th>
              <th>Hecho</th>
            </tr>
          </thead>
          <tbody>{taskTableRows(false)}</tbody>
        </table>

        <div className="bg-secondary-text-white text-center p-2">
          <VisibilityControl
            description="tareas completadas"
            isChecked={showCompleted}
            callback={(checked: boolean | ((prevState: boolean) => boolean)) =>
              setShowCompleted(checked)
            }
          />
        </div>

        {showCompleted && (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Hecho</th>
              </tr>
            </thead>
            <tbody>{taskTableRows(true)}</tbody>
          </table>
        )}
      </div>
    )
  else return <Login />
}

export default App
