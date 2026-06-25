import Button from '../../../ui/Button';
import Empty from '../../../ui/Empty';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Spinner from '../../../ui/Spinner';
import Table from '../../../ui/Table';

import NewExamen from './NewExamen';
import ExamensRow from './ExamensRow';
import { UseExamen } from './useExam';
import { useSearchParams } from 'react-router-dom';

function ListExamen() {
  const { isLoading, error, examen } = UseExamen();
  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;

  if (error) {
    return <p>Erreur lors du chargement des Examens.</p>;
  }

  const examensData = Array.isArray(examen)
    ? examen
    : examen?.data || examen?.examens || [];

  const SortBy = searchParams.get('sortBy') || 'code-asc';
  const [field, direction] = SortBy.split('-');
  const sortedExamens = [...examensData].sort((a, b) => {
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
          <Modal.Open opens="create-examen">
            <Button>Nouveau Examen</Button>
          </Modal.Open>

          <Modal.Window name="create-examen">
            <NewExamen />
          </Modal.Window>
        </Modal>
      </div>

      {!sortedExamens.length ? (
        <Empty ressourceName="examens" />
      ) : (
        <Table columns="1fr 2fr 2fr 1fr 0.5fr ">
          <Table.Header>
            <div>Code</div>
            <div>Libelle</div>
            <div>Type Examen</div>
            <div>Couts Examen</div>
            <div></div>
          </Table.Header>

          <Table.Body
            data={sortedExamens}
            render={(examen) => (
              <ExamensRow examen={examen} key={examen.examens_id} />
            )}
          />
        </Table>
      )}
    </Menus>
  );
}

export default ListExamen;
