import Button from '../../../ui/Button';
import Empty from '../../../ui/Empty';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Spinner from '../../../ui/Spinner';
import Table from '../../../ui/Table';
import NewMedecineType from './NewMedecineType';

import { useMedecineType } from './useMedecineType';
import MedecineTypeRow from './MedecineTypeRow';

function ListMedecineType() {
  const { isLoading, error, medecineType: medecines } = useMedecineType();

  if (isLoading) return <Spinner />;

  if (error) {
    return <p>Erreur lors du chargement des types de médicaments.</p>;
  }

  const medecinesData = Array.isArray(medecines)
    ? medecines
    : medecines?.data || medecines?.typesmedicaments || [];

  const sortedMedecines = [...medecinesData].sort((a, b) =>
    String(a?.code ?? '').localeCompare(String(b?.code ?? ''), undefined, {
      numeric: true,
      sensitivity: 'base',
    })
  );

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
