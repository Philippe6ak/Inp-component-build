import Button from '../../../ui/Button';
import Empty from '../../../ui/Empty';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Spinner from '../../../ui/Spinner';
import Table from '../../../ui/Table';

import NewTypeExam from './NewTypeExam';

import { typeExamensHooks } from '../../../hooks/hookIndex';

import RowTypeExam from './RowTypeExam';
import { useSearchParams } from 'react-router-dom';

function ListTypeExam() {
  const { useGetAll } = typeExamensHooks;
  const { isLoading, error, data: examens } = useGetAll();

  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  if (error) {
    return <p>Erreur lors du chargement des examens.</p>;
  }

  const typexamData = Array.isArray(examens) ? examens : [];

  const sortBy = searchParams.get('sortBy') || 'code-asc';
  const [field, direction] = sortBy.split('-');
  const sortedTypExam = [...typexamData].sort((a, b) => {
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
