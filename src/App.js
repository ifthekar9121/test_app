import './App.css';
import Navigation from './components/partials/Navbar';
import Home from './components/pages/Home';
import Category from './components/pages/Category';
import AddCategory from './components/pages/AddCategory';
import {
  Switch,
  Route
} from "react-router-dom";


function App() {
  return (
    <>
      <Navigation/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/category" component={Category} />
        <Route exact path="/category/add" component={AddCategory} />
      </Switch>
    </>
  );
}

export default App;
