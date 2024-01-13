import { PlusCircledIcon } from "@radix-ui/react-icons";

type Props = {
  value: string;
  id: string;
};

export function Spacer({ value, id }: Props) {
  return (
    <div
      className={
        "bg-slate-100 h-full w-full justify-center items-center flex hover:bg-amber-400/55 cursor-pointer"
      }
    >
      <div className={"scale-150"}>
        <PlusCircledIcon />
      </div>
    </div>
  );
}
