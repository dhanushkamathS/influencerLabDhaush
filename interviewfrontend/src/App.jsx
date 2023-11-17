import { useState } from "react";
import Navbar from "./components/Navbar";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <h1 className="text-3xl text-red-500 font-bold underline">
        Hello world!
      </h1>
    </>
  );
}

export default App;
