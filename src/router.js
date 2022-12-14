import { createHashRouter } from "react-router-dom";

import Home from "./Home";
import Answer from "./Answer";
import Display from "./Display";
import Remote from "./Remote";

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/answer",
    element: <Answer />,
  },
  {
    path: "/display",
    element: <Display />,
  },
  {
    path: "/remote",
    element: <Remote />,
  }
]);

export default router;
