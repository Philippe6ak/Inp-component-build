import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import ConfirmDelete from '../../../ui/ConfirmDelete';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Table from '../../../ui/Table';
import { useDeleteQuartier } from './useDeleteQuartier';
import NewQuartier from './NewQuartier';
import { useNewQuartier } from './useNewQuartier';

function QuartierRow({ quartier }) {
  const quartierId = quartier.quartiers_id;
  const code = quartier?.code ?? '';
  const libelle = quartier?.libelle ?? '';
  const menuId = quartierId;

  const { isDeleting, deleteQuartier } = useDeleteQuartier();
  const { createQuartier } = useNewQuartier();

  function handleDuplicate() {
    createQuartier({
      libelle: libelle ? `Copy of ${libelle}` : 'Copy',
      code: code ? `${code}-COPY` : '',
    });
  }

  return (
    <Table.Row>
      <div>{code}</div>
      <div>{libelle}</div>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={menuId} />

            <Menus.List id={menuId}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                Dupliquer
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Modifier</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Supprimer</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <NewQuartier quartierToEdit={quartier} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="quartier"
                disabled={isDeleting}
                onConfirm={() => deleteQuartier(quartierId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default QuartierRow;
