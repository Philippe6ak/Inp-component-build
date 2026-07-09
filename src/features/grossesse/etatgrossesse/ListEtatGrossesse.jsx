import Button from '../../../ui/Button';
import Empty from '../../../ui/Empty';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Spinner from '../../../ui/Spinner';
import Table from '../../../ui/Table';
import { useSearchParams } from 'react-router-dom';

import NewetatGrossesse from './NewetatGrossesse';
import EtatgrossesseRow from './EtatGrossesseRow';
import { useEtatGrossesse } from './useEtatGrossesse';

function ListEtatGrossesse() {
  const [searchParams] = useSearchParams();
  const { isLoading, error, etatsgrossesses } = useEtatGrossesse();

  if (isLoading) return <Spinner />;

  if (error) {
    return <p>Erreur lors du chargement des etatgrossesses referents.</p>;
  }

  const etatgrossesseData = Array.isArray(etatsgrossesses)
    ? etatsgrossesses
    : etatsgrossesses?.data || etatsgrossesses?.etatgrossesse || [];

  //the following is sorting shenenegans for sorting using values, just take it at face value and don't ask :D
  const sortBy = searchParams.get('sortBy') || 'code-asc';
  const [field, direction] = sortBy.split('-');
  const sortedEtatGrossesse = [...etatgrossesseData].sort((a, b) => {
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
          <Modal.Open opens="create-etatgrossesse">
            <Button>Nouvel Etat de grossesse</Button>
          </Modal.Open>

          <Modal.Window name="create-etatgrossesse">
            <NewetatGrossesse />
          </Modal.Window>
        </Modal>
      </div>

      {!sortedEtatGrossesse.length ? (
        <Empty ressourceName="etat_grossesse" />
      ) : (
        <Table columns="1fr 3fr 0.5fr">
          <Table.Header>
            <div>Libelle</div>
            <div></div>
          </Table.Header>

          <Table.Body
            data={sortedEtatGrossesse}
            render={(etatgrossesse) => (
              <EtatgrossesseRow
                etatgrossesse={etatgrossesse}
                key={etatgrossesse.etatsgrossesses_id}
              />
            )}
          />
        </Table>
      )}
    </Menus>
  );
}

export default ListEtatGrossesse;
