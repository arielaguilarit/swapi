import React from "react";
import { Navbar, Container, Nav, NavItem} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";
import Navegation from "./components/Navegation";
import Personajes from "./components/Personajes";
import Planetas from "./components/Planetas";

function App() {
  return (
    <div className="App">
      <Navegation />

      <Container fluid >
        <Routes>
          <Route path="/" element={<Personajes />}>
            Mis Personajes
          </Route>
          <Route exact path="/planetas" element={<Planetas />}>
            Planetas
          </Route>
        </Routes>
      </Container>
    </div>
  );
}


export default App;
