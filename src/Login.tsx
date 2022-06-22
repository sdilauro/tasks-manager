import React, { useEffect, useState } from "react"

import {
  TextField,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Button,
} from "@mui/material"

//state type

type State = {
  username: string
  password: string
  isButtonDisabled: boolean
  helperText: string
  isError: boolean
}

const initialState: State = {
  username: "",
  password: "",
  isButtonDisabled: true,
  helperText: "",
  isError: false,
}

const Login = () => {
  //const classes = useStyles()
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(
    initialState.isButtonDisabled
  )
  const [username, setUsername] = useState<string>(initialState.username)
  const [password, setPassword] = useState<string>(initialState.password)
  const [helperText, setHelperText] = useState<string>(initialState.helperText)
  const [isError, setIsError] = useState<boolean>(initialState.isError)

  useEffect(() => {
    if (username.trim() && password.trim()) {
      setIsButtonDisabled(false)
    } else {
      setIsButtonDisabled(true)
    }
  }, [username, password])

  const handleLogin = () => {
    if (password === "password") {
      localStorage.setItem("userName", username)
      localStorage.setItem("password", password)
      setHelperText("")
      setIsError(false)
      window.location.reload()
    } else {
      setHelperText("Incorrect username or password")
      setIsError(true)
    }
  }

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setPassword(event.target.value)
  }

  return (
    <form noValidate autoComplete="off">
      <Card>
        <CardHeader title="Login App" />
        <CardContent>
          <div>
            <TextField
              error={isError}
              fullWidth
              id="username"
              type="email"
              label="Username"
              placeholder="Username"
              margin="normal"
              onChange={handleUsernameChange}
            />
            <TextField
              error={isError}
              fullWidth
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              margin="normal"
              helperText={helperText}
              onChange={handlePasswordChange}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={handleLogin}
            disabled={isButtonDisabled}
          >
            Login
          </Button>
        </CardActions>
      </Card>
    </form>
  )
}

export default Login
