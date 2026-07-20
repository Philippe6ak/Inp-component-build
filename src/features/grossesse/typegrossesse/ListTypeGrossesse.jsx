import Button from '../../../ui/Button';
import Empty from '../../../ui/Empty';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Spinner from '../../../ui/Spinner';
import Table from '../../../ui/Table';
import { useSearchParams } from 'react-router-dom';

import TypegrossesseRow from './TypeGrossesseRow';
import { typeGrossessesHooks } from '../../../hooks/hookIndex';
import NewtypeGrossesse from './NewtypeGrossesse';

function ListTypeGrossesse() {
  const [searchParams] = useSearchParams();
  const { useGetAll } = typeGrossessesHooks;

  const { isLoading, error, data: typegrossesses } = useGetAll();

  if (isLoading) return <Spinner />;

  if (error) {
    return <p>Erreur lors du chargement des types de grossesse referents.</p>;
  }

  const typegrossessesData = Array.isArray(typegrossesses)
    ? typegrossesses
    : [];

  //the following is sorting shenenegans for sorting using values, just take it at face value and don't ask :D
  const sortBy = searchParams.get('sortBy') || 'code-asc';
  const [field, direction] = sortBy.split('-');
  const sortedTypeGrossesse = [...typegrossessesData].sort((a, b) => {
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
            <Button>Nouveau Type de grossesse</Button>
          </Modal.Open>

          <Modal.Window name="create-typegrossesse">
            <NewtypeGrossesse />
          </Modal.Window>
        </Modal>
      </div>

      {!sortedTypeGrossesse.length ? (
        <Empty ressourceName="type_grossesse" />
      ) : (
        <Table columns="1fr 3fr 0.5fr">
          <Table.Header>
            <div>Libelle</div>
            <div></div>
          </Table.Header>

          <Table.Body
            data={sortedTypeGrossesse}
            render={(typegrossesse) => (
              <TypegrossesseRow
                typegrossesse={typegrossesse}
                key={typegrossesse.typegrossesse_id}
              />
            )}
          />
        </Table>
      )}
    </Menus>
  );
}

export default ListTypeGrossesse;
