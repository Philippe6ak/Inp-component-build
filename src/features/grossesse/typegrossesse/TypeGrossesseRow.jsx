import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import ConfirmDelete from '../../../ui/ConfirmDelete';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Table from '../../../ui/Table';

import { typeGrossessesHooks } from '../../../hooks/hookIndex';
import NewtypeGrossesse from './NewtypeGrossesse';

function TypeGrossesseRow({ typeGrossesse }) {
  const typeGrossesserefId = typeGrossesse.typesgrossesses_id;

  const libelle = typeGrossesse?.libelle ?? '';
  const menuId = typeGrossesserefId;

  const { useDelete } = typeGrossessesHooks;
  const { isDeleting, delete: deletetypeGrossesse } = useDelete();

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
              <NewtypeGrossesse typeGrossesseToEdit={typeGrossesse} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="typegrossessesreferents"
                disabled={isDeleting}
                onConfirm={() => deletetypeGrossesse(typeGrossesserefId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default TypeGrossesseRow;
