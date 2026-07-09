import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import ConfirmDelete from '../../../ui/ConfirmDelete';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Table from '../../../ui/Table';

import { useDeleteMethodeDepistage } from './useDeleteMethodeDepistage';
import { useNewMethodeDepistage } from './useNewMethodeDepistage';
import NewMethodeDepistage from './NewMethodeDepistage';

function MethodeDepistageRow({ methodeDepistage }) {
  const methodeDepistagerefId = methodeDepistage.methodesdepistages_id;
  const libelle = methodeDepistage?.libelle ?? '';
  const menuId = methodeDepistagerefId;

  const { isDeleting, deleteMethodeDepistage } = useDeleteMethodeDepistage();
  const { createMethodeDepistage } = useNewMethodeDepistage();

  function handleDuplicate() {
    const duplicatedLibelle = libelle ? `Copy of ${libelle}` : 'Copy';

    createMethodeDepistage({
      libelle: duplicatedLibelle,
    });
  }

  return (
    <Table.Row>
      <div>{libelle}</div>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={menuId} />

            <Menus.List id={menuId}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                Duplicate
              </Menus.Button>

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
