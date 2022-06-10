import React from "react"

type TaskBannerType = {
  userName: string
}

export const TaskBanner: React.FC<TaskBannerType> = ({ userName }) => {
  return (
    <div>
      <h4 className="bg-primary text-white text-center p-3">
        Tareas de {userName}
      </h4>
    </div>
  )
}
