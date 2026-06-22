import { useNavigate } from 'react-router-dom';

import Button from '../../ui/Button';
import Empty from '../../ui/Empty';
import Menus from '../../ui/Menus';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import { useSpecialty } from './useSpecialty';

function ListSpecialty() {
  const { isLoading, error, specialties } = useSpecialty();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  if (error) {
    return <p>Erreur lors du chargement des specialites.</p>;
  }

  const specialtiesData = Array.isArray(specialties)
    ? specialties
    : specialties?.data || specialties?.specialites || [];

  const sortedSpecialties = [...specialtiesData].sort((a, b) =>
    String(a?.code ?? '').localeCompare(String(b?.code ?? ''), undefined, {
      numeric: true,
      sensitivity: 'base',
    })
  );

  if (!sortedSpecialties.length) return <Empty ressourceName="specialites" />;

  return (
    <Menus>
      <div className="mb-[1.6rem] flex justify-end">
        <Button onClick={() => navigate('/specialties/new')}>
          Nouvelle specialité
        </Button>
      </div>

      <Table columns="1fr 3fr">
        <Table.Header>
          <div>Code</div>
          <div>Libelle</div>
        </Table.Header>

        <Table.Body
          data={sortedSpecialties}
          render={(specialty, index) => (
            <Table.Row key={specialty?.id ?? `${specialty?.code}-${index}`}>
              <div>{specialty?.code}</div>
              <div>{specialty?.libelle}</div>
            </Table.Row>
          )}
        />
      </Table>
    </Menus>
  );
}

export default ListSpecialty;
