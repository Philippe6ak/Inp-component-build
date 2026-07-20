import Button from '../../../ui/Button';
import Empty from '../../../ui/Empty';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Spinner from '../../../ui/Spinner';
import Table from '../../../ui/Table';

import NewMedicament from './NewMedicament';
import MedicamentRow from './MedicamentsRow';
import { useSearchParams } from 'react-router-dom';
import { medicamentHooks } from '../../../hooks/hookIndex';

function ListMedicament() {
  const { useGetAll } = medicamentHooks;
  const { isLoading, error, data: medicament } = useGetAll();

  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;

  if (error) {
    return <p>Erreur lors du chargement des Medicaments.</p>;
  }

  const medicamentData = Array.isArray(medicament) ? medicament : [];

  const SortBy = searchParams.get('sortBy') || 'code-asc';
  const [field, direction] = SortBy.split('-');
  const sortedMedicaments = [...medicamentData].sort((a, b) => {
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
          <Modal.Open opens="create-medicament">
            <Button>Nouveau Medicament</Button>
          </Modal.Open>

          <Modal.Window name="create-medicament">
            <NewMedicament />
          </Modal.Window>
        </Modal>
      </div>

      {!sortedMedicaments.length ? (
        <Empty ressourceName="medicament" />
      ) : (
        <Table columns="1fr 2fr 2fr 2fr 0.5fr ">
          <Table.Header>
            <div>Code</div>
            <div>Libelle</div>
            <div>Type medicament</div>
            <div>Couts Medicament</div>
            <div></div>
          </Table.Header>

          <Table.Body
            data={sortedMedicaments}
            render={(medicament) => (
              <MedicamentRow
                medicament={medicament}
                key={medicament.medicaments_id}
              />
            )}
          />
        </Table>
      )}
    </Menus>
  );
}

export default ListMedicament;
