import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Toaster } from "./components/ui/sonner";

/* function getContrastingTextColor(h: number, l: number, s: number): string {
  // Calculate the relative luminance of the color
  const luminance = (0.299 * h + 0.587 * l + 0.114 * s) / 100;

  // Use a threshold value (0.5) to determine whether to use white or black text
  if (luminance > 0.5) {
    return "0 0 0"; // Black text for light backgrounds
  } else {
    return "0 0 100"; // White text for dark backgrounds
  }
} */
/* 
function getRandomHSLColor() {
  const hue = Math.floor(Math.random() * 360); // Random hue between 0 and 360
  const saturation = Math.floor(Math.random() * 100); // Random saturation between 0 and 100
  const lightness = Math.floor(Math.random() * 50) + 50; // Random lightness between 50 and 100 to ensure it's not too dark

  const textColor = getContrastingTextColor(hue, saturation, lightness);

  const hslColor = `${hue} ${saturation}% ${lightness}%`;
  return {
    "--background": hslColor,
    "--forground": textColor,
  };
}
 */
export function Index() {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  /*  const style = React.useMemo(
    () => getRandomHSLColor() as React.CSSProperties,
    []
  ); */

  return (
    <div
      className={
        "flex flex-col print:bg-transparent print:bg-none bg-background"
      }
    >
      <Outlet />
      <Toaster richColors theme={"light"} />
      <div className={"print:hidden"}>
        <TanStackRouterDevtools />
      </div>
    </div>
  );
}
