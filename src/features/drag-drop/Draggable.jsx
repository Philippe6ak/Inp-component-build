import { useSortable } from "@dnd-kit/react/sortable";
import styled from "styled-components";
import PropTypes from "prop-types";

const DraggableBox = styled.div`
  position: relative;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  color: var(--color-grey-800);
  padding: 1.6rem 2rem;
  min-width: 20rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  cursor: grab;
  box-shadow: ${({ $isDragging }) =>
    $isDragging ? "var(--shadow-md)" : "var(--shadow-sm)"};
  transform: ${({ $isDragging }) =>
    $isDragging ? "rotate(-1deg) scale(1.03)" : "none"};
  background-image: linear-gradient(
    90deg,
    var(--color-grey-0) 0%,
    var(--color-brand-50) 100%
  );

  &::after {
    content: "";
    position: absolute;
    right: 1rem;
    top: 50%;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    transform: translateY(-50%);
    background-color: ${({ $isDragging }) =>
      $isDragging ? "var(--color-brand-600)" : "var(--color-indigo-700)"};
    opacity: 0.8;
  }

  &:active {
    cursor: grabbing;
  }
`;

function Draggable({ id, label, index, group = "items" }) {
  const { ref, isDragging } = useSortable({
    id,
    index,
    group,
  });

  return (
    <DraggableBox ref={ref} $isDragging={isDragging}>
      {label}
    </DraggableBox>
  );
}

Draggable.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  group: PropTypes.string,
};

export default Draggable;
