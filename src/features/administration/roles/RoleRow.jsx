import { HiPencil, HiTrash } from 'react-icons/hi2';
import ConfirmDelete from '../../../ui/ConfirmDelete';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Table from '../../../ui/Table';
import { useDeleteRole } from './useDeleteRole';
import NewRole from './NewRole';

function RolesRow({ role }) {
  const roleId = role.roles_id;
  const name = role?.name ?? '';
  const menuId = roleId;

  const { isDeleting, deleteRole } = useDeleteRole();

  return (
    <Table.Row>
      <div>{name}</div>
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
              <NewRole roleToEdit={role} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="roles"
                disabled={isDeleting}
                onConfirm={() => deleteRole(roleId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default RolesRow;
