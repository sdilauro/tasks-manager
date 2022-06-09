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
    <div className="d-flex justify-content-center align-items-center p-2">
      <input
        type="text"
        className="form-control"
        value={newTaskName}
        onChange={updateNewTaskValue}
      />
      <button className="ml-5 btn btn-primary" onClick={createNewTask}>
        Agregar
      </button>
      <button className="ml-5 btn btn-primary" onClick={logout}>
        Logout
      </button>
    </div>
  )
}
