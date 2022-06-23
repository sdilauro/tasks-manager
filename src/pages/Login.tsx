import { Box, Button, Typography } from "@mui/material"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export interface ILoginPageProps {}

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
  localStorage.removeItem("uid")
  const auth = getAuth()
  const navigate = useNavigate()
  const [authing, setAuthing] = useState<boolean>(false)

  const signInWithGoogle = async () => {
    setAuthing(true)
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        localStorage.setItem("uid", response.user.uid)
        navigate("/")
      })
      .catch((error) => {
        console.log(error)
        setAuthing(false)
      })
  }

  return (
    <Box
      width={"100%"}
      height={"100vh"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignContent={"center"}
      alignItems={"center"}
    >
      <Box margin={"50px"}>
        <img src="./logo512.png" height={"150"} alt="Logo"></img>
      </Box>
      <Typography>Oh, parece que no estás conectado...</Typography>
      <Button
        sx={{ width: "150px", margin: "50px" }}
        onClick={() => signInWithGoogle()}
        variant="contained"
      >
        Iniciar sesión
      </Button>
    </Box>
  )
}

export default LoginPage
