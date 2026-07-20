import { HiPencil, HiTrash } from 'react-icons/hi2';
import PropTypes from 'prop-types';
import ConfirmDelete from '../../../ui/ConfirmDelete';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Table from '../../../ui/Table';
import ApprovDetails from './ApprovDetails';
import NewApprov from './NewApprov';
import { approvisionnementsHooks } from '../../../hooks/hookIndex';

const MAX_FULL_NAMES = 3;

// Au-delà de MAX_FULL_NAMES médicaments, on abrège chaque nom à 3 lettres
// pour que la colonne reste lisible dans le tableau.
const MAX_DISPLAY = 2;

function getMedicamentsSummary(lignes) {
  if (!lignes?.length) return '-';

  if (lignes.length <= MAX_DISPLAY) {
    return lignes.map((l) => l.medicament_libelle).join(', ');
  }

  const displayed = lignes
    .slice(0, MAX_DISPLAY)
    .map((l) => l.medicament_libelle)
    .join(', ');

  const remaining = lignes.length - MAX_DISPLAY;

  return `${displayed} +${remaining}`;
}

function ApprovisionnementRow({ approvisionnement }) {
  const approvisionnementId = approvisionnement.approvisionnements_id;
  const lignes = approvisionnement.approvisionnementsmedicaments ?? [];
  const totalQty = lignes.reduce((sum, l) => sum + Number(l.quantite || 0), 0);

  const { useDelete } = approvisionnementsHooks;
  const { isDeleting, delete: deleteApprovisionnement } = useDelete();

  const libelle = approvisionnement.libelle;

  return (
    <Modal>
      <Modal.Open opens="view">
        <Table.Row
          className="cursor-pointer hover:bg-grey-50"
          onClick={() => console.log('Row cliquée')}
        >
          {' '}
          <div className="font-medium">{libelle}</div>
          <div>{getMedicamentsSummary(lignes)}</div>
          <div>{totalQty}</div>
          {/* stopPropagation pour que le clic sur le menu n'ouvre pas aussi les détails */}
          <div onClick={(e) => e.stopPropagation()}>
            <Menus.Menu>
              <Menus.Toggle id={approvisionnementId} />
              <Menus.List id={approvisionnementId}>
                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Modifier</Menus.Button>
                </Modal.Open>
                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Supprimer</Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>
          </div>
        </Table.Row>
      </Modal.Open>

      <Modal.Window name="view">
        <ApprovDetails approvisionnement={approvisionnement} />
      </Modal.Window>

      <Modal.Window name="edit">
        <NewApprov approvisionnementToEdit={approvisionnement} />
      </Modal.Window>

      <Modal.Window name="delete">
        <ConfirmDelete
          resourceName="approvisionnement"
          disabled={isDeleting}
          onConfirm={() => deleteApprovisionnement(approvisionnementId)}
        />
      </Modal.Window>
    </Modal>
  );
}

ApprovisionnementRow.propTypes = {
  approvisionnement: PropTypes.shape({
    approvisionnements_id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    libelle: PropTypes.string,
    lignes: PropTypes.array,
  }).isRequired,
};

export default ApprovisionnementRow;
