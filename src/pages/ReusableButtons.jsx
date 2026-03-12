import ReusableButtonsLayout from "../features/Buttons/ReusableButtonsLayout";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function ReusableButtons() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Reusable Buttons</Heading>
      </Row>
      <ReusableButtonsLayout />
    </>
  );
}

export default ReusableButtons;
