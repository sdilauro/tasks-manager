import { Container, IconButton, Typography } from "@mui/material"
import React from "react"
import LogoutIcon from "@mui/icons-material/Logout"

interface Props {
  userName: string
  logout(): void
}

export const TaskBanner = ({ userName, logout }: Props) => {
  return (
    <Container
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "35px",
        paddingTop: "15px",
        paddingBottom: "15px",
        backgroundColor: "tomato",
        color: "white",
      }}
    >
      <Typography>Lista de tareas de {userName}</Typography>
      <IconButton onClick={logout} color="inherit">
        <LogoutIcon />
      </IconButton>
    </Container>
  )
}
