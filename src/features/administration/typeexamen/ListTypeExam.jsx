import Button from '../../../ui/Button';
import Empty from '../../../ui/Empty';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Spinner from '../../../ui/Spinner';
import Table from '../../../ui/Table';
import NewTypeExam from './NewTypeExam';
import { useTypeExam } from './useTypeExam';
import RowTypeExam from './RowTypeExam';

function ListTypeExam() {
  const { isLoading, error, examens } = useTypeExam();

  if (isLoading) return <Spinner />;

  if (error) {
    return <p>Erreur lors du chargement des examens.</p>;
  }

  const typexamData = Array.isArray(examens)
    ? examens
    : examens?.data || examens?.examens || [];

  const sortedTypExam = [...typexamData].sort((a, b) =>
    String(a?.code ?? '').localeCompare(String(b?.code ?? ''), undefined, {
      numeric: true,
      sensitivity: 'base',
    })
  );

  return (
    <Menus>
      <div className="mb-[1.6rem] flex justify-end">
        <Modal>
          <Modal.Open opens="create-typexamen">
            <Button>Nouveau type examen</Button>
          </Modal.Open>

          <Modal.Window name="create-typexamen">
            <NewTypeExam />
          </Modal.Window>
        </Modal>
      </div>

      {!sortedTypExam.length ? (
        <Empty ressourceName="examens" />
      ) : (
        <Table columns="1fr 3fr 0.5fr">
          <Table.Header>
            <div>Code</div>
            <div>Libelle</div>
            <div></div>
          </Table.Header>

          <Table.Body
            data={sortedTypExam}
            render={(examens) => (
              <RowTypeExam examens={examens} key={examens.typesexamens_id} />
            )}
          />
        </Table>
      )}
    </Menus>
  );
}

export default ListTypeExam;
