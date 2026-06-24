import Button from '../../../ui/Button';
import Empty from '../../../ui/Empty';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Spinner from '../../../ui/Spinner';
import Table from '../../../ui/Table';
import { useSearchParams } from 'react-router-dom';
import NewDiseaseType from './NewDiseaseType';

import { useDiseaseType } from './useDiseaseType';
import DiseaseTypeRow from './DiseaseTypeRow';

function ListDiseaseType() {
  const [searchParams] = useSearchParams();
  const { isLoading, error, diseaseType: diseases } = useDiseaseType();

  if (isLoading) return <Spinner />;

  if (error) {
    return <p>Erreur lors du chargement des maladies.</p>;
  }

  const diseasesData = Array.isArray(diseases)
    ? diseases
    : diseases?.data || diseases?.maladies || [];

  //the following is sorting shenenegans for sorting using values, just take it at face value and don't ask :D
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
            <Button>Nouveau type de Maladie</Button>
          </Modal.Open>

          <Modal.Window name="create-disease">
            <NewDiseaseType />
          </Modal.Window>
        </Modal>
      </div>

      {!sortedDiseases.length ? (
        <Empty ressourceName="diseases" />
      ) : (
        <Table columns="1fr 3fr 0.5fr">
          <Table.Header>
            <div>Code</div>
            <div>Libelle</div>
            <div></div>
          </Table.Header>

          <Table.Body
            data={sortedDiseases}
            render={(diseases) => (
              <DiseaseTypeRow
                disease={diseases}
                key={diseases.typesmaladies_id}
              />
            )}
          />
        </Table>
      )}
    </Menus>
  );
}

export default ListDiseaseType;
