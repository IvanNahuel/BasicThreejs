import { useState } from "react";
import { Model3D } from "./components/Model3D";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Model3D />
    </>
  )
}

export default App
