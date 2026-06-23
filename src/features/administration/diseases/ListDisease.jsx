import Button from '../../../ui/Button';
import Empty from '../../../ui/Empty';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Spinner from '../../../ui/Spinner';
import Table from '../../../ui/Table';
import NewDisease from './NewDisease';
import DiseaseRow from './DiseaseRow';
import { useDisease } from './useDisease';

function ListDisease() {
  const { isLoading, error, disease } = useDisease();

  if (isLoading) return <Spinner />;

  if (error) {
    return <p>Erreur lors du chargement des maladies.</p>;
  }

  const diseasesData = Array.isArray(disease)
    ? disease
    : disease?.data || disease?.maladies || [];

  const sortedDiseases = [...diseasesData].sort((a, b) =>
    String(a?.code ?? '').localeCompare(String(b?.code ?? ''), undefined, {
      numeric: true,
      sensitivity: 'base',
    })
  );

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
