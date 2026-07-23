import { HiPencil, HiTrash } from 'react-icons/hi2';
import ConfirmDelete from '../../../ui/ConfirmDelete';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Table from '../../../ui/Table';
import Checkbox from '../../../ui/Checkbox';

import NewPermissions from './NewPermissions';
import { permissionsHooks } from '../../../hooks/hookIndex';

function PermissionsRow({ permission }) {
  const permissionId = permission.permissions_id;
  const name = permission?.name ?? '';
  const menuId = permissionId;

  const { useDelete } = permissionsHooks;
  const { isDeleting, delete: deletePermissions } = useDelete();

  return (
    <Table.Row>
      <div>{name}</div>
      <div></div>
      <div></div>
      <div className="flex gap-[0.8rem] justify-end">
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
              <NewPermissions permissionsToEdit={permission} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="permissions"
                disabled={isDeleting}
                onConfirm={() => deletePermissions(permission)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default PermissionsRow;
