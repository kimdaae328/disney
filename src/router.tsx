import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Characters } from "./routes/Characters";
import { Character } from "./routes/Character";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Characters />,
      },
      {
        path: "/characters/:characterId",
        element: <Character />,
      },
    ],
  },
]);

export default router;
