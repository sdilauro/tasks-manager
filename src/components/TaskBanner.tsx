import React from "react"
import { TaskProp } from "./TaskRow"

type TaskBannerType = {
  userName: string
  taskItems: TaskProp[]
}

export const TaskBanner: React.FC<TaskBannerType> = ({
  userName,
  taskItems,
}) => {
  return (
    <div>
      <h4 className="bg-primary text-white text-center p-3">
        Tareas de {userName}
      </h4>
      <h4 className="p-3">Tareas por hacer {taskItems.length}</h4>
    </div>
  )
}
