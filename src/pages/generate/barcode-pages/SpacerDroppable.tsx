import { useDroppable } from "@dnd-kit/core";
import { SpacerType } from "../../../stores/barcodes";
import { Spacer } from "./barcodes/Spacer";

type Props = {
  spacer: SpacerType;
};

export const SpacerDroppable = ({ spacer }: Props) => {
  const { isOver, setNodeRef } = useDroppable({
    id: spacer.id,
    data: spacer,
  });

  return <Spacer ref={setNodeRef} isOver={isOver} spacer={spacer} />;
};
