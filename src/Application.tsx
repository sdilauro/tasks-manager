import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/Home"
import LoginPage from "./pages/Login"

import AuthRoute from "./components/AuthRoute"


export interface IapplicationProps {}

const Application: React.FunctionComponent<IapplicationProps> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthRoute>
              <HomePage />
            </AuthRoute>
          }
        />
        <Route
          path="/login"
          element={
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default Application
