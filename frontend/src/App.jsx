import { Route, Routes } from "react-router-dom"
import RegistroPag from "./pages/RegistroPag"
import IngresoPag from "./pages/IngresoPag"

function App() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-rose-900 to-red-900 flex items-center justify-center relative overflow-hidden">

        <Routes>
            <Route path='/' element={"Inicio"}/>
            <Route path='/registro' element={<RegistroPag/>}/>
            <Route path='/ingreso' element={<IngresoPag/>}/>
        </Routes>
    </div>
  )
}

export default App
