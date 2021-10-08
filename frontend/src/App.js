import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import { Box, ThemeProvider } from "@material-ui/core";
import theme from "./theme";
import Landing from "./components/pages/Landing";
import Login from "./components/pages/Login";
import Registration from "./components/pages/Registration";
import Cart from "./components/pages/Cart";
import Item from "./components/pages/Item";
import Profile from "./components/pages/Profile";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Box component="main">
          <Header />
          <Route path="/" component={Landing} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/registration" component={Registration} exact />
          <Route path="/profile" component={Profile} exact />
          <Route path="/cart/:id?" component={Cart} />
          <Route path="/item/:id" component={Item} />
        </Box>
      </ThemeProvider>
    </Router>
  );
}

export default App;
