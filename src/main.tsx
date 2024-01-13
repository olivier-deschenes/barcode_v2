import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  Outlet,
  RouterProvider,
  Router,
  Route,
  RootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import "./index.css";
import "./App.css";
import App from "./App";
import { Generate } from "./pages/generate/Generate";

const rootRoute = new RootRoute({
  component: () => (
    <div className={"flex flex-col print:bg-transparent print:bg-none"}>
      <Outlet />
      <div className={"print:hidden"}>
        <TanStackRouterDevtools />
      </div>
    </div>
  ),
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <App />,
});

const generateRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/generate",
  component: () => <Generate />,
});

const routeTree = rootRoute.addChildren([indexRoute, generateRoute]);

const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
