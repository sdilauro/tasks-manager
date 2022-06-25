import { Avatar, Box, Container, IconButton, Typography } from "@mui/material"
import LogoutIcon from "@mui/icons-material/Logout"

interface Props {
  logout(): void
}

export const TaskBanner = ({ logout }: Props) => {
  return (
    <Container
      sx={{
        maxWidth: "100%",
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "35px",
        paddingTop: "15px",
        paddingBottom: "15px",
        backgroundColor: "#1976d2",
        color: "white",
      }}
    >
      <Box display="flex" alignContent={"center"} alignItems="center">
        <Avatar src={localStorage.getItem("profileUrl") || ""} />
        <Typography marginLeft="10px">Tareas</Typography>
      </Box>
      <IconButton onClick={logout} color="inherit">
        <LogoutIcon />
      </IconButton>
    </Container>
  )
}
