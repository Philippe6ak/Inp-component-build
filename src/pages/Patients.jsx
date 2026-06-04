import Heading from '../ui/Heading';
import Row from '../ui/Row';
import PatientsTable from '../features/patient/PatientsTable';
import PatientsTableOperations from '../features/patient/PatientsTableOperations';

function Patients() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Patients</Heading>
        <PatientsTableOperations />
      </Row>
      <PatientsTable />
    </>
  );
}

export default Patients;
