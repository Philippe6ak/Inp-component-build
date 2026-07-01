import Button from '../../../ui/Button';
import Empty from '../../../ui/Empty';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Spinner from '../../../ui/Spinner';
import Table from '../../../ui/Table';
import NewSpecialty from './NewSpecialty';
import { useSpecialty } from './useSpecialty';
import SpecialtyRow from './SpecialtyRow';
import { useSearchParams } from 'react-router-dom';

function ListSpecialty() {
  const { isLoading, error, specialties } = useSpecialty();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  if (error) {
    return <p>Erreur lors du chargement des specialites.</p>;
  }

  const specialtiesData = Array.isArray(specialties)
    ? specialties
    : specialties?.data || specialties?.specialites || [];

  const sortBy = searchParams.get('sortBy') || 'code-asc';
  const [field, direction] = sortBy.split('-');
  const sortedSpecialties = [...specialtiesData].sort((a, b) => {
    if (!['code', 'libelle'].includes(field)) return 0;
    const firstValue = String(a?.[field] ?? '');
    const secondValue = String(b?.[field] ?? '');
    const result = firstValue.localeCompare(secondValue, undefined, {
      numeric: true,
      sensitivity: 'base',
    });
    return direction === 'desc' ? -result : result;
  });

  return (
    <Menus>
      <div className="mb-[1.6rem] flex justify-end">
        <Modal>
          <Modal.Open opens="create-specialty">
            <Button>Nouvelle specialité</Button>
          </Modal.Open>

          <Modal.Window name="create-specialty">
            <NewSpecialty />
          </Modal.Window>
        </Modal>
      </div>

      {!sortedSpecialties.length ? (
        <Empty ressourceName="specialites" />
      ) : (
        <Table columns="1fr 3fr 0.5fr">
          <Table.Header>
            <div>Code</div>
            <div>Libelle</div>
            <div></div>
          </Table.Header>

          <Table.Body
            data={sortedSpecialties}
            render={(specialty) => (
              <SpecialtyRow
                specialty={specialty}
                key={specialty.specialites_id}
              />
            )}
          />
        </Table>
      )}
    </Menus>
  );
}

export default ListSpecialty;
