import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import ConfirmDelete from '../../../ui/ConfirmDelete';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Table from '../../../ui/Table';

import { etatGrossessesHooks } from '../../../hooks/hookIndex';
import NewEtatgrossesse from './NewetatGrossesse';
function EtatgrossesseRow({ etatgrossesse }) {
  const etatgrossesserefId = etatgrossesse.etatgrossesse;

  const libelle = etatgrossesse?.libelle ?? '';
  const menuId = etatgrossesserefId;

  const { useDelete } = etatGrossessesHooks;
  const { isDeleting, delete: deleteEtatGrossesse } = useDelete();

  return (
    <Table.Row>
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
              <NewEtatgrossesse etatgrossesseToEdit={etatgrossesse} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="etatgrossesses"
                disabled={isDeleting}
                onConfirm={() => deleteEtatGrossesse(etatgrossesserefId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default EtatgrossesseRow;
