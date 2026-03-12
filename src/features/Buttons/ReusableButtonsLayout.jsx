import styled from "styled-components";
import { HiEye, HiPencil, HiSquare2Stack } from "react-icons/hi2";

import Button from "../../ui/Button";
import Menus from "../../ui/Menus";

const variations = ["primary", "secondary", "danger"];
const sizes = ["small", "medium", "large"];

const Wrapper = styled.div`
  display: grid;
  gap: 2.4rem;
`;

const DefaultExample = styled.div`
  display: grid;
  gap: 1.2rem;
  padding: 2rem;
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  background-color: var(--color-grey-0);
`;

const ExampleTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
`;

const Hint = styled.p`
  font-size: 1.3rem;
  color: var(--color-grey-500);
`;

const VariationsGrid = styled.div`
  display: grid;
  gap: 1.6rem;
`;

const VariationCard = styled.div`
  display: grid;
  gap: 1.6rem;
  padding: 2rem;
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  background-color: var(--color-grey-0);
`;

const VariationTitle = styled.h4`
  font-size: 1.5rem;
  font-weight: 600;
  text-transform: capitalize;
`;

const ButtonsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  align-items: center;
`;

const DropdownCard = styled.div`
  display: grid;
  gap: 1.2rem;
  padding: 2rem;
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  background-color: var(--color-grey-0);
`;

const DropdownPreview = styled.div`
  width: 100%;
  min-height: 6rem;
  padding: 1rem;
  border: 1px dashed var(--color-grey-300);
  border-radius: var(--border-radius-md);
  background-color: var(--color-grey-50);
`;

function ReusableButtonsLayout() {
  return (
    <Wrapper>
      <DefaultExample>
        <ExampleTitle>Default Button</ExampleTitle>
        <ButtonsRow>
          <Button>Default action</Button>
        </ButtonsRow>
        <Hint>
          Uses default props: size=&quot;medium&quot; and
          variation=&quot;primary&quot;.
        </Hint>
      </DefaultExample>

      <DropdownCard>
        <ExampleTitle>Dropdown Menu</ExampleTitle>
        <Hint>Click the three-dot toggle to open a generic actions menu.</Hint>
        <DropdownPreview>
          <Menus>
            <Menus.Menu>
              <Menus.Toggle id="generic-options" />

              <Menus.List id="generic-options">
                <Menus.Button icon={<HiEye />}>Option 1</Menus.Button>
                <Menus.Button icon={<HiPencil />}>Option 2</Menus.Button>
                <Menus.Button icon={<HiSquare2Stack />}>Option 3</Menus.Button>
              </Menus.List>
            </Menus.Menu>
          </Menus>
        </DropdownPreview>
      </DropdownCard>

      <VariationsGrid>
        {variations.map((variation) => (
          <VariationCard key={variation}>
            <VariationTitle>{variation}</VariationTitle>
            <ButtonsRow>
              {sizes.map((size) => (
                <Button
                  key={`${variation}-${size}`}
                  size={size}
                  variation={variation}
                >
                  {size}
                </Button>
              ))}
            </ButtonsRow>
          </VariationCard>
        ))}
      </VariationsGrid>
    </Wrapper>
  );
}

export default ReusableButtonsLayout;
