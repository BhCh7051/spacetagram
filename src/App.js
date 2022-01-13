import "./css/App.css";
import "./css/ImageGrid.css";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import {useEffect} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {createTheme, responsiveFontSizes, ThemeProvider,} from "@material-ui/core/styles";

let theme = createTheme();
theme = responsiveFontSizes(theme);
const App = ({hideLoader}) => {
    useEffect(hideLoader, []);
    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <Router>
                    <Header/>

                    <Switch>
                        <Route path="/" exact>
                            <HomePage/>
                        </Route>

                        <Route path="/s/:searchTerm">
                            <SearchPage/>
                        </Route>
                    </Switch>
                </Router>
            </ThemeProvider>
        </div>
    );
};

export default App;
