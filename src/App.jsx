import { useState } from "react";
import Login from "./Login";
import Header from "./Header";
import Content from "./Content";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      {isAuthenticated ? (
        <>
          <Header />
          <Content />
        </>
      ) : (
        <Login onLoginSuccess={() => setIsAuthenticated(true)} />
      )}
    </>
  );
}

export default App;