import Button from '../../../ui/Button';
import Empty from '../../../ui/Empty';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Spinner from '../../../ui/Spinner';
import Table from '../../../ui/Table';
import { useSearchParams } from 'react-router-dom';

import NewtypeGrossesse from './NewtypeGrossesse';
import TypeGrossesseRow from './TypeGrossesseRow';
import { Usetypegrossesse } from './usetypeGrossesse';

function ListTypeGrossesse() {
  const [searchParams] = useSearchParams();
  const { isLoading, error, typegrossesses } = Usetypegrossesse();

  if (isLoading) return <Spinner />;

  if (error) {
    return <p>Erreur lors du chargement des typegrossesses referents.</p>;
  }

  const typegrossesseData = Array.isArray(typegrossesses)
    ? typegrossesses
    : typegrossesses?.data || typegrossesses?.typegrossesses || [];

  //the following is sorting shenenegans for sorting using values, just take it at face value and don't ask :D
  const sortBy = searchParams.get('sortBy') || 'code-asc';
  const [field, direction] = sortBy.split('-');
  const sortedTypeGrossesse = [...typegrossesseData].sort((a, b) => {
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
          <Modal.Open opens="create-typegrossesse">
            <Button>Nouvel Type de grossesse</Button>
          </Modal.Open>

          <Modal.Window name="create-typegrossesse">
            <NewtypeGrossesse />
          </Modal.Window>
        </Modal>
      </div>

      {!sortedTypeGrossesse.length ? (
        <Empty ressourceName="type_grossesse" />
      ) : (
        <Table columns=" 2fr 1fr">
          <Table.Header>
            <div>Libelle</div>
            <div>Actions</div>
          </Table.Header>

          <Table.Body
            data={sortedTypeGrossesse}
            render={(typegrossesses) => (
              <TypeGrossesseRow
                typeGrossesse={typegrossesses}
                key={typegrossesses.typeGrossesses_id}
              />
            )}
          />
        </Table>
      )}
    </Menus>
  );
}

export default ListTypeGrossesse;
