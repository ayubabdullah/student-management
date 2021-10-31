import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import { Container } from "react-bootstrap";
export default function App() {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  return (
    <Container className="mt-4">
      <Router>
        <Navbar isOpenCreateModal={isOpenCreateModal} setIsOpenCreateModal={setIsOpenCreateModal} />
        <Switch>
          <Route exact path="/">
            <Home isOpenCreateModal={isOpenCreateModal} setIsOpenCreateModal={setIsOpenCreateModal} />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
};
