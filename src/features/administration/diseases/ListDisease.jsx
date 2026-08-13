import Button from '../../../ui/Button';
import Empty from '../../../ui/Empty';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Spinner from '../../../ui/Spinner';
import Table from '../../../ui/Table';
import NewDisease from './NewDisease';
import DiseaseRow from './DiseaseRow';
import { diseaseHooks } from '../../../hooks/hookIndex';
import { useSearchParams } from 'react-router-dom';

function ListDisease() {
  // nouvelle facon d'utiliser les custom hooks
  const { useGetAll } = diseaseHooks;
  const { isLoading, error, data: disease } = useGetAll();

  console.log(disease);

  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  if (error) {
    return <p>Erreur lors du chargement des maladies.</p>;
  }

  const diseasesData = Array.isArray(disease) ? disease : [];

  const sortBy = searchParams.get('sortBy') || 'code-asc';
  const [field, direction] = sortBy.split('-');
  const sortedDiseases = [...diseasesData].sort((a, b) => {
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
          <Modal.Open opens="create-disease">
            <Button>Nouvelle Maladie</Button>
          </Modal.Open>

          <Modal.Window name="create-disease">
            <NewDisease />
          </Modal.Window>
        </Modal>
      </div>

      {!sortedDiseases.length ? (
        <Empty ressourceName="diseases" />
      ) : (
        <Table columns="1fr 2fr 2fr 0.5fr">
          <Table.Header>
            <div>Code</div>
            <div>Libelle</div>
            <div>Type Maladie</div>
            <div></div>
          </Table.Header>

          <Table.Body
            data={sortedDiseases}
            render={(disease) => (
              <DiseaseRow disease={disease} key={disease.maladies_id} />
            )}
          />
        </Table>
      )}
    </Menus>
  );
}

export default ListDisease;
