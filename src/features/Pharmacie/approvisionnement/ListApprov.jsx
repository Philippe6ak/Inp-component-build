import Button from '../../../ui/Button';
import Empty from '../../../ui/Empty';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Spinner from '../../../ui/Spinner';
import Table from '../../../ui/Table';

import NewApprov from './NewApprov';
import ApprovisionnementRow from './ApprovisionnementRow';
import { approvisionnementsHooks } from '../../../hooks/hookIndex';

import { useSearchParams } from 'react-router-dom';

function ListApprov() {
  const { useGetAll } = approvisionnementsHooks;
  const { isLoading, error, data: approvisionnements } = useGetAll();

  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;

  if (error) {
    return <p>Erreur lors du chargement des approvisionnements.</p>;
  }

  const approvisionnementData = Array.isArray(approvisionnements)
    ? approvisionnements
    : [];

  const sortBy = searchParams.get('sortBy') || 'libelle-asc';
  const [field, direction] = sortBy.split('-');
  const sortedApprovisionnements = [...approvisionnementData].sort((a, b) => {
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
          <Modal.Open opens="create-approvisionnement">
            <Button>Nouvel approvisionnement</Button>
          </Modal.Open>

          <Modal.Window name="create-approvisionnement">
            <NewApprov />
          </Modal.Window>
        </Modal>
      </div>

      {!sortedApprovisionnements.length ? (
        <Empty ressourceName="approvisionnement" />
      ) : (
        <Table columns="2fr 2fr 1fr 0.6fr">
          <Table.Header>
            <div>Libellé</div>
            <div>Médicaments</div>
            <div>Qté totale</div>
            <div>Actions</div>
          </Table.Header>

          <Table.Body
            data={sortedApprovisionnements}
            render={(approvisionnement) => (
              <ApprovisionnementRow
                approvisionnement={approvisionnement}
                key={approvisionnement.approvisionnements_id}
              />
            )}
          />
        </Table>
      )}
    </Menus>
  );
}

export default ListApprov;
