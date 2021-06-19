import "./App.css";
import ConferenceGridLayout from "./components/conferenceGridView";

// const LoadableHost = loadable(() => import("./components/host/Host"), {
//   fallback: <Loading />,
// });

// const LoadableCamera = loadable(() => import("./components/camera/Camera"), {
//   fallback: <Loading />,
// });

// const LoadableView = loadable(() => import("./components/conferenceGridView"), {
//   fallback: <Loading />,
// });
// //...chat ko test
// const LoadableChat = loadable(() => import("./components/chatGrid"), {
//   fallback: <Loading />,
// });
// const LoadableCounter = loadable(() => import("./components/counter/Counter"), {
//   resolveComponent: (component) => component.Counter,
//   fallback: <Loading />,
// });
function App() {
  return (
    // <ChatGrid />
    <ConferenceGridLayout />
    // <Router>
    //   <div>
    //     <nav>
    //       <ul>
    //         <li>
    //           <Link to={addURLPath("/")}>Home</Link>
    //         </li>
    //         <li>
    //           <Link to={addURLPath("/about")}>About</Link>
    //         </li>
    //         <li>
    //           <Link to={addURLPath("/team")}>Teams</Link>
    //         </li>
    //         <li>
    //           <Link to={addURLPath("/view")}>View</Link>
    //         </li>
    //         <li>
    //           <Link to={addURLPath("/chat")}>chat</Link>
    //         </li>
    //       </ul>
    //     </nav>
    //     <Switch>
    //       <Route exact path={addURLPath("/")}>
    //         <LoadableCamera />
    //       </Route>
    //       <Route path={addURLPath("/about")}>
    //         <LoadableHost />
    //       </Route>
    //       <Route path={addURLPath("/team")}>
    //         {/* <div>ello</div> */}
    //         <LoadableCounter />
    //       </Route>
    //       <Route path={addURLPath("/view")}>
    //         {/* <div>ello</div> */}
    //         <LoadableView />
    //       </Route>
    //       <Route path={addURLPath("/view")}>
    //         {/* <div>ello</div> */}
    //         <LoadableChat />
    //       </Route>
    //     </Switch>
    //   </div>
    // </Router>
  );
}

export default App;
