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
        marginBottom: "50px",
      }}
    >
      <Typography>Lista de tareas de {userName}</Typography>
      <IconButton onClick={logout}>
        <LogoutIcon />
      </IconButton>
    </Container>
  )
}
