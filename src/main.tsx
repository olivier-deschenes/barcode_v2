import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  Router,
  Route,
  RootRoute,
  lazyRouteComponent,
} from "@tanstack/react-router";
import "./index.css";
import "./App.css";

const rootRoute = new RootRoute({
  component: lazyRouteComponent(() => import("./Index"), "Index"),
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: lazyRouteComponent(() => import("./App")),
});

const generateRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/generate",
  component: lazyRouteComponent(
    () => import("./pages/generate/Generate"),
    "Generate"
  ),
  errorComponent: lazyRouteComponent(
    () => import("./components/Error"),
    "Error"
  ),
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
