import { useDroppable } from "@dnd-kit/react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledContainerBox = styled.div`
  background-color: var(--color-grey-100);
  border: 1px solid
    ${({ $isOver }) =>
      $isOver ? "var(--color-brand-600)" : "var(--color-silver-700)"};
  border-radius: var(--border-radius-lg);
  padding: 2.4rem 3.2rem;
  height: auto;
  display: flex;
  align-items: flex-start;
  gap: 2.4rem;
  box-shadow: ${({ $isOver }) => ($isOver ? "var(--shadow-md)" : "none")};
`;

function ContainerBox({ children }) {
  const { ref, isDropTarget } = useDroppable({
    id: "container",
  });

  return (
    <StyledContainerBox ref={ref} $isOver={isDropTarget}>
      {children}
    </StyledContainerBox>
  );
}

ContainerBox.propTypes = {
  children: PropTypes.node,
};

export default ContainerBox;
