import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { addURLPath } from "../../utils/utils";
import { Loading } from "../Loading/Loading";
import loadable from "@loadable/component";
import Landing from "../../Landing";



const LoadableHost = loadable(() => import("../host/Host"), {
    fallback: <Loading />,
  });

const Header = () => {
return (
<Router>
    <div>
        <Toolbar>
            <Grid container direction="row-reverse" >
                <Grid item xs={1}>
                    <Typography variant="h6">
                        <MenuIcon/>
                    </Typography>
                </Grid>

                <Grid item xs={1}>
                    <Typography variant="h6">
                        <Link to={addURLPath("/team")}>Team</Link>
                    </Typography>
                </Grid>

                <Grid item xs={1}>
                    <Typography variant="h6">
                        <Link to={addURLPath("/about")}>About</Link>
                    </Typography>
                </Grid>

                <Grid item xs={1}>
                    <Typography variant="h6">
                        <Link to={addURLPath("/")}>Home</Link>
                    </Typography>
                </Grid>
            </Grid>
        </Toolbar>

        <Switch>
            <Route exact path={addURLPath("/")}>
            </Route>

            <Route path={addURLPath("/about")}>
                <LoadableHost />
            </Route>

            <Route path={addURLPath("/team")}>
            </Route>
        </Switch>
    </div>
</Router>
    )
}

export default Header
