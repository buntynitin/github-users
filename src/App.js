import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Home, Detail, NotFound } from './Main/'
import { StateProvider } from './Main/StateProvider'
import reducer, { initialState } from './Main/reducer';

function App() {
  return (
    <Router>
      <Switch>
      
        <Route exact path="/">
        <StateProvider initialState={ initialState } reducer={reducer}>
          <Home />
        </StateProvider>
        </Route>

        <Route exact path="/detail">
        <StateProvider initialState={ initialState } reducer={reducer}>
          <Detail />
          </StateProvider>
        </Route>

        <Route path="*">
          <NotFound />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
