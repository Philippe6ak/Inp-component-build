import { useDroppable } from "@dnd-kit/react";
import { Children } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const DroppableBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-color: var(--color-yellow-100);
  border: 2px solid transparent;
  border-radius: var(--border-radius-md);
  color: var(--color-grey-800);
  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;
  width: 300px;
  height: 300px;
  background-image:
    linear-gradient(var(--color-yellow-100), var(--color-yellow-100)),
    repeating-linear-gradient(
      135deg,
      var(--color-brand-600) 0 10px,
      var(--color-indigo-700) 10px 20px
    );
  background-origin: border-box;
  background-clip: padding-box, border-box;
  box-shadow: var(--shadow-sm);

  &::before {
    content: "";
    position: absolute;
    inset: 1rem;
    border: 2px dashed
      ${({ $isOver }) =>
        $isOver ? "var(--color-brand-600)" : "var(--color-yellow-700)"};
    border-radius: var(--border-radius-sm);
    pointer-events: none;
    opacity: ${({ $isOver }) => ($isOver ? 1 : 0.55)};
  }

  transform: ${({ $isOver }) => ($isOver ? "scale(1.02)" : "scale(1)")};
  box-shadow: ${({ $isOver }) =>
    $isOver ? "var(--shadow-md)" : "var(--shadow-sm)"};
`;

const DropHint = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-yellow-700);
`;

function Droppable({ id, children }) {
  const { ref, isOver } = useDroppable({
    id,
  });
  const hasChildren = Children.count(children) > 0;

  return (
    <DroppableBox ref={ref} $isOver={isOver}>
      {!hasChildren && <DropHint>drop here</DropHint>}
      {children}
    </DroppableBox>
  );
}

Droppable.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Droppable;
