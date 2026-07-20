import Button from '../../../ui/Button';
import Empty from '../../../ui/Empty';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Spinner from '../../../ui/Spinner';
import Table from '../../../ui/Table';
import NewQuartier from './NewQuartier';
import QuartierRow from './QuartierRow';
import { useQuartiers } from './useQuartiers';
import { useSearchParams } from 'react-router-dom';

function ListQuartiers() {
  const { isLoading, error, quartiers } = useQuartiers();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  if (error) {
    return <p>Erreur lors du chargement des quartiers.</p>;
  }

  const quartiersData = Array.isArray(quartiers)
    ? quartiers
    : quartiers?.data || quartiers?.quartiers || [];

  const sortBy = searchParams.get('sortBy') || 'name-asc';
  const [field, direction] = sortBy.split('-');
  const sortedQuartiers = [...quartiersData].sort((a, b) => {
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
          <Modal.Open opens="create-quartier">
            <Button>Nouveau quartier</Button>
          </Modal.Open>

          <Modal.Window name="create-quartier">
            <NewQuartier />
          </Modal.Window>
        </Modal>
      </div>

      {!sortedQuartiers.length ? (
        <Empty ressourceName="quartiers" />
      ) : (
        <Table columns="2fr 2fr 0.5fr">
          <Table.Header>
            <div>Code</div>
            <div>Libellé</div>
            <div>Actions</div>
          </Table.Header>

          <Table.Body
            data={sortedQuartiers}
            render={(quartiers) => (
              <QuartierRow quartier={quartiers} key={quartiers.quartiers_id} />
            )}
          />
        </Table>
      )}
    </Menus>
  );
}

export default ListQuartiers;
