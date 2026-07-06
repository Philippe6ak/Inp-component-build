import Button from '../../../ui/Button';
import Empty from '../../../ui/Empty';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Spinner from '../../../ui/Spinner';
import Table from '../../../ui/Table';
import { useSearchParams } from 'react-router-dom';
import NewEtsReferent from './NewEtsReferent';

import { useEtsReferent } from './useEtsReferent';
import EtsReferentRow from './EtsReferentRow';

function ListEtsReferent() {
  const [searchParams] = useSearchParams();
  const {
    isLoading,
    error,
    etablissementsreferents: etablissement,
  } = useEtsReferent();

  if (isLoading) return <Spinner />;

  if (error) {
    return <p>Erreur lors du chargement des etablissements referents.</p>;
  }

  const etablissementData = Array.isArray(etablissement)
    ? etablissement
    : etablissement?.data || etablissement?.etablissementsreferents || [];

  //the following is sorting shenenegans for sorting using values, just take it at face value and don't ask :D
  const sortBy = searchParams.get('sortBy') || 'code-asc';
  const [field, direction] = sortBy.split('-');
  const sortedEtablissement = [...etablissementData].sort((a, b) => {
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
          <Modal.Open opens="create-etablissement">
            <Button>Nouveau Etablissement Référent</Button>
          </Modal.Open>

          <Modal.Window name="create-etablissement">
            <NewEtsReferent />
          </Modal.Window>
        </Modal>
      </div>

      {!sortedEtablissement.length ? (
        <Empty ressourceName="etablissement" />
      ) : (
        <Table columns="1fr 3fr 0.5fr">
          <Table.Header>
            <div>Code</div>
            <div>Libelle</div>
            <div></div>
          </Table.Header>

          <Table.Body
            data={sortedEtablissement}
            render={(etablissement) => (
              <EtsReferentRow
                etablissement={etablissement}
                key={etablissement.etablissementsreferents_id}
              />
            )}
          />
        </Table>
      )}
    </Menus>
  );
}

export default ListEtsReferent;
