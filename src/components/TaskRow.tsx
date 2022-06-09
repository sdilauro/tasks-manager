import React from "react"

export type TaskProp = {
  name: string
  done: boolean
  toggleTask?: any
}

export const TaskRow = (props: TaskProp) => (
  <tr key={props.name}>
    <td>{props.name}</td>
    <td>
      <input
        type="checkbox"
        checked={props.done}
        onChange={() => props.toggleTask(props)}
      />
    </td>
  </tr>
)
