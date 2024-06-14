import { PropsWithChildren } from "react";

type Props = object;

export const KeyboardKey = ({ children }: PropsWithChildren<Props>) => {
  return (
    <kbd
      className={
        "bg-primary/10 px-1.5 py-0.5 rounded-md border-primary border text-primary font-bold"
      }
    >
      {children}
    </kbd>
  );
};
