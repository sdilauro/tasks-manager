import React from "react"

export const VisibilityControl = (props: any) => {
  return (
    <div className="d-flex justify-content-center">
      <input
        type="checkbox"
        className="form-check-input"
        checked={props.isChecked}
        onChange={(e) => props.callback(e.target.checked)}
      />
      <label htmlFor="form-check-label text-center">
        Mostrar {props.description}
      </label>
    </div>
  )
}
