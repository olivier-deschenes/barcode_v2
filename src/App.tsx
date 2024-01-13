import { Link } from "@tanstack/react-router";
import "./App.css";
import { buttonVariants } from "./components/ui/button";
import { Label } from "./components/ui/label";
import { Switch } from "./components/ui/switch";

function App() {
  return (
    <>
      <div
        className={
          "w-screen h-screen flex justify-center items-center flex-col gap-10 print:gap-0"
        }
      >
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" />
          <Label htmlFor="airplane-mode">Airplane Mode</Label>
        </div>
        <div>
          <Link
            className={buttonVariants({ variant: "outline" })}
            to="/generate"
          >
            Generate
          </Link>
        </div>
      </div>
    </>
  );
}

export default App;
