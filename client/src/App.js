import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/login/Login";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
