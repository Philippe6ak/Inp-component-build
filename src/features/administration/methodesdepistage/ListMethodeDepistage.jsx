import Button from '../../../ui/Button';
import Empty from '../../../ui/Empty';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Spinner from '../../../ui/Spinner';
import Table from '../../../ui/Table';
import { useSearchParams } from 'react-router-dom';

import NewMethodeDepistage from './NewMethodeDepistage';
import MethodeDepistageRow from './MethodeDepistageRow';
import { useMethodeDepistage } from './useMethodeDepistage';

function ListMethodeDepistage() {
  const [searchParams] = useSearchParams();
  const { isLoading, error, methodesdepistages } = useMethodeDepistage();

  if (isLoading) return <Spinner />;

  if (error) {
    return <p>Erreur lors du chargement des méthodes de dépistage.</p>;
  }

  const methodeDepistageData = Array.isArray(methodesdepistages)
    ? methodesdepistages
    : methodesdepistages?.data || methodesdepistages?.methodesdepistages || [];

  const sortBy = searchParams.get('sortBy') || 'libelle-asc';
  const [field, direction] = sortBy.split('-');
  const sortedMethodeDepistage = [...methodeDepistageData].sort((a, b) => {
    if (!['libelle'].includes(field)) return 0;
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
          <Modal.Open opens="create-methode-depistage">
            <Button>Nouvelle méthode de dépistage</Button>
          </Modal.Open>

          <Modal.Window name="create-methode-depistage">
            <NewMethodeDepistage />
          </Modal.Window>
        </Modal>
      </div>

      {!sortedMethodeDepistage.length ? (
        <Empty ressourceName="methode_depistage" />
      ) : (
        <Table columns="3.5fr 0.5fr">
          <Table.Header>
            <div>Libelle</div>
            <div>Actions</div>
          </Table.Header>

          <Table.Body
            data={sortedMethodeDepistage}
            render={(methodeDepistage) => (
              <MethodeDepistageRow
                methodeDepistage={methodeDepistage}
                key={methodeDepistage.methodesdepistages_id}
              />
            )}
          />
        </Table>
      )}
    </Menus>
  );
}

export default ListMethodeDepistage;
