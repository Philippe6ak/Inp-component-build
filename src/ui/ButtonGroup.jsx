// import styled from "styled-components";

// const ButtonGroup = styled.div`
//   display: flex;
//   gap: 1.2rem;
//   justify-content: flex-end;
// `;

function ButtonGroup({ children }) {
  return <div className="flex gap-2 justify-end">{children}</div>;
}

export default ButtonGroup;
