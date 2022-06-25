import { Avatar, Container, IconButton } from "@mui/material"
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
      <Avatar src={localStorage.getItem("profileUrl") || ""} />
      <IconButton onClick={logout} color="inherit">
        <LogoutIcon />
      </IconButton>
    </Container>
  )
}
