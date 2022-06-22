import { Checkbox, FormControlLabel, FormGroup } from "@mui/material"

export const VisibilityControl = (props: any) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={props.isChecked}
            onChange={(e) => props.callback(e.target.checked)}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label={props.label}
      />
    </FormGroup>
  )
}
