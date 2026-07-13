import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import ConfirmDelete from '../../../ui/ConfirmDelete';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Table from '../../../ui/Table';

import { methodesDepistageHooks } from '../../../hooks/hookIndex';
import NewMethodeDepistage from './NewMethodeDepistage';

function MethodeDepistageRow({ methodeDepistage }) {
  const methodeDepistagerefId = methodeDepistage.methodesdepistages_id;
  const libelle = methodeDepistage?.libelle ?? '';
  const menuId = methodeDepistagerefId;

  const { useDelete } = methodesDepistageHooks;
  const { delete: deleteMethodeDepistage, isDeleting } = useDelete();

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
              <NewMethodeDepistage methodeDepistageToEdit={methodeDepistage} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="methodesdepistages"
                disabled={isDeleting}
                onConfirm={() => deleteMethodeDepistage(methodeDepistagerefId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default MethodeDepistageRow;
