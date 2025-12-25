import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("loading...");

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.text())
      .then((text) => setMessage(text))
      .catch(() => setMessage("error"));
  }, []);

  return <h1>{message}</h1>;
}

export default App;