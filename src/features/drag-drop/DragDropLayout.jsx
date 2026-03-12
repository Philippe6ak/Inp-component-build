import { DragDropProvider } from "@dnd-kit/react";
import {
  PointerSensor,
  KeyboardSensor,
  AutoScroller,
  Accessibility,
} from "@dnd-kit/dom";

import Draggable from "./Draggable";
import Droppable from "./Droppable";
import ContainerBox from "./ContainerBox";
import { useState } from "react";
import styled from "styled-components";

const DraggablesColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const draggableItems = [
  { id: "draggable-1", label: "Draggable item 1" },
  { id: "draggable-2", label: "Draggable item 2" },
  { id: "draggable-3", label: "Draggable item 3" },
];

const itemById = Object.fromEntries(
  draggableItems.map((item) => [item.id, item]),
);

function DragDropLayout() {
  const [droppedIds, setDroppedIds] = useState([]);
  const [itemOrder, setItemOrder] = useState(
    draggableItems.map((item) => item.id),
  );

  const orderedItems = itemOrder.map((id) => itemById[id]).filter(Boolean);

  const availableItems = orderedItems.filter(
    (item) => !droppedIds.includes(item.id),
  );
  const droppedItems = orderedItems.filter((item) =>
    droppedIds.includes(item.id),
  );

  function moveIdBeforeTarget(order, sourceId, targetId) {
    const sourceIndex = order.indexOf(sourceId);
    const targetIndex = order.indexOf(targetId);

    if (sourceIndex === -1 || targetIndex === -1 || sourceId === targetId) {
      return order;
    }

    const nextOrder = [...order];
    nextOrder.splice(sourceIndex, 1);
    const adjustedTargetIndex = nextOrder.indexOf(targetId);
    nextOrder.splice(adjustedTargetIndex, 0, sourceId);
    return nextOrder;
  }

  return (
    <DragDropProvider
      sensors={[PointerSensor, KeyboardSensor]}
      plugins={(defaults) => [...defaults, AutoScroller, Accessibility]}
      onDragEnd={(event) => {
        if (event.canceled) return;

        const { source, target } = event.operation;
        const sourceId = source?.id;
        const targetId = target?.id;

        if (!sourceId) return;

        if (targetId && itemById[targetId]) {
          setItemOrder((currentOrder) =>
            moveIdBeforeTarget(currentOrder, sourceId, targetId),
          );

          setDroppedIds((currentIds) => {
            const targetIsDropped = currentIds.includes(targetId);
            if (targetIsDropped) {
              return currentIds.includes(sourceId)
                ? currentIds
                : [...currentIds, sourceId];
            }

            return currentIds.filter((id) => id !== sourceId);
          });
          return;
        }

        if (target?.id === "droppable") {
          setDroppedIds((currentIds) =>
            currentIds.includes(sourceId)
              ? currentIds
              : [...currentIds, sourceId],
          );
          return;
        }

        if (target?.id === "container" || !target) {
          setDroppedIds((currentIds) =>
            currentIds.filter((id) => id !== sourceId),
          );
        }
      }}
    >
      <ContainerBox>
        <DraggablesColumn>
          {availableItems.map((item, index) => (
            <Draggable
              key={item.id}
              id={item.id}
              label={item.label}
              index={index}
              group="items"
            />
          ))}
        </DraggablesColumn>

        <Droppable id="droppable">
          {droppedItems.map((item, index) => (
            <Draggable
              key={item.id}
              id={item.id}
              label={item.label}
              index={index}
              group="items"
            />
          ))}
        </Droppable>
      </ContainerBox>
    </DragDropProvider>
  );
}

export default DragDropLayout;
