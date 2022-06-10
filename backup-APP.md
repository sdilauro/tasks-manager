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
if (!taskItems.find((t, index) => t.name === taskName))
if (taskName !== "")
setTaskItems([
...taskItems,
{
id: Math.floor(Math.random() * (9999 + 1)),
name: taskName,
done: false,
},
])
else console.log("No puede ingresar task vacía")
else console.log("Ya existe la task")
}

const deleteTask = (key: number) => {
if (key > -1) taskItems.splice(key)
}

const toggleTask = (task: TaskProp) =>
setTaskItems(
taskItems.map((t) => (t.name === task.name ? { ...t, done: !t.done } : t))
)

const taskTableRows = (doneValue: boolean) =>
taskItems
.filter((task) => task.done === doneValue)
.map((task, index) => (
<TaskRow name={task.name} done={task.done} id={task.id} />
))
if (
localStorage.getItem("userName") === "abc@email.com" &&
localStorage.getItem("password") === "password"
)
return (

<div>
<TaskBanner userName={userName} taskItems={taskItems} />
<TaskCreator callback={AddTask} />
<TableContainer component={Paper}>
<Table sx={{ minWidth: 650 }} aria-label="simple table">
<TableHead>
<TableRow>
<TableCell>Descripción</TableCell>
<TableCell align="right">Hecho</TableCell>
</TableRow>
</TableHead>
<TableBody>
{taskTableRows(false).map((row, index) => (
<TaskRow
                  index={index}
                  id={row.props.id}
                  name={row.props.name}
                  done={row.props.done}
                  callback={deleteTask}
                />
))}
</TableBody>
</Table>
</TableContainer>
<VisibilityControl
description="tareas completadas"
isChecked={showCompleted}
callback={(checked: boolean | ((prevState: boolean) => boolean)) =>
setShowCompleted(checked)
}
/>
{showCompleted && (
<TableContainer component={Paper}>
<Table sx={{ minWidth: 650 }} aria-label="simple table">
<TableHead>
<TableRow>
<TableCell>Descripción</TableCell>
<TableCell align="right">Hecho</TableCell>
</TableRow>
</TableHead>
<TableBody>
{taskTableRows(true).map((row, index) => (
<TaskRow
                    index={index}
                    id={row.props.id}
                    name={row.props.name}
                    done={row.props.done}
                    callback={deleteTask}
                  />
))}
</TableBody>
</Table>
</TableContainer>
)}
</div>
)
else return <Login />

<VisibilityControl
description="tareas completadas"
isChecked={showCompleted}
callback={(checked: boolean | ((prevState: boolean) => boolean)) =>
setShowCompleted(checked)
}
/>
