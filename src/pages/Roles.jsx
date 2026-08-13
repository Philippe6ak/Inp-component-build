import ListRoles from '../features/administration/roles/ListRoles';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Roles() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Librairie des roles</Heading>
      </Row>
      <ListRoles />
    </>
  );
}

export default Roles;
