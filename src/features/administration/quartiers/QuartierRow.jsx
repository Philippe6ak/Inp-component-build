import { HiPencil, HiTrash } from 'react-icons/hi2';
import ConfirmDelete from '../../../ui/ConfirmDelete';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Table from '../../../ui/Table';
import NewQuartier from './NewQuartier';

import { quartierHooks } from '../../../hooks/hookIndex';

function QuartierRow({ quartier }) {
  const quartierId = quartier.quartiers_id;

  const code = quartier?.code ?? '';
  const libelle = quartier?.libelle ?? '';
  const menuId = quartierId;

  const { useDelete } = quartierHooks;
  const { isDeleting, delete: deleteQuartier } = useDelete();

  return (
    <Table.Row>
      <div>{code}</div>
      <div>{libelle}</div>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={menuId} />

            <Menus.List id={menuId}>
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
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
