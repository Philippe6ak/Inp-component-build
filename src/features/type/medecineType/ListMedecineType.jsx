import Button from '../../../ui/Button';
import Empty from '../../../ui/Empty';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Spinner from '../../../ui/Spinner';
import Table from '../../../ui/Table';
import NewMedecineType from './NewMedecineType';
import MedecineTypeRow from './MedecineTypeRow';

import { typeMedecinesHooks } from '../../../hooks/hookIndex';
import { useSearchParams } from 'react-router-dom';

function ListMedecineType() {
  const [searchParams] = useSearchParams();

  const { useGetAll } = typeMedecinesHooks;
  const { isLoading, error, data: medecines } = useGetAll();

  if (isLoading) return <Spinner />;

  if (error) {
    return <p>Erreur lors du chargement des types de médicaments.</p>;
  }

  const medecinesData = Array.isArray(medecines) ? medecines : [];

  const sortBy = searchParams.get('sortBy') || 'code-asc';
  const [field, direction] = sortBy.split('-');
  const sortedMedecines = [...medecinesData].sort((a, b) => {
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
          <Modal.Open opens="create-medecine">
            <Button>Nouveau type de médicament</Button>
          </Modal.Open>

          <Modal.Window name="create-medecine">
            <NewMedecineType />
          </Modal.Window>
        </Modal>
      </div>

      {!sortedMedecines.length ? (
        <Empty ressourceName="medecines" />
      ) : (
        <Table columns="1fr 3fr 0.5fr">
          <Table.Header>
            <div>Code</div>
            <div>Libelle</div>
            <div></div>
          </Table.Header>

          <Table.Body
            data={sortedMedecines}
            render={(medecine) => (
              <MedecineTypeRow
                medecine={medecine}
                key={medecine.typesmedicaments_id}
              />
            )}
          />
        </Table>
      )}
    </Menus>
  );
}

export default ListMedecineType;
