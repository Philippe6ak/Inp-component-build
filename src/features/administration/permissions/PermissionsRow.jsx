import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import ConfirmDelete from '../../../ui/ConfirmDelete';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Table from '../../../ui/Table';
import { useDeletePermissions } from './useDeletePermissions';
import NewPermissions from './NewPermissions';
import { useNewPermissions } from './useNewPermissions';

function PermissionsRow({ permissions }) {
  const permissionsId = permissions.permissions_id;
  const name = permissions?.name ?? '';
  const menuId = permissionsId;

  const { isDeleting, deletePermissions } = useDeletePermissions();
  const { createPermissions } = useNewPermissions();

  function handleDuplicate() {
    createPermissions({
      name: name ? `Copy of ${name}` : 'Copy',
    });
  }

  return (
    <Table.Row>
      <div>{name}</div>
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
              <NewPermissions permissionsToEdit={permissions} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="permissions"
                disabled={isDeleting}
                onConfirm={() => deletePermissions(permissions)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default PermissionsRow;
