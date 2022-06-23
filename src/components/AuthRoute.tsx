import { Typography } from "@mui/material"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export interface IAuthRouteProps {
  children: any
}

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = (props) => {
  const { children } = props
  const auth = getAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const AuthCheck = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false)
      } else {
        console.log("unauthorized")
        navigate("/login")
      }
    })

    return () => AuthCheck()
  }, [auth, navigate])

  if (loading) return <Typography>Cargando...</Typography>

  return <>{children}</>
}

export default AuthRoute
