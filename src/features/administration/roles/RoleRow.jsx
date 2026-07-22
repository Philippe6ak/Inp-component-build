import { HiPencil, HiTrash } from 'react-icons/hi2';
import ConfirmDelete from '../../../ui/ConfirmDelete';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Table from '../../../ui/Table';

import NewRole from './NewRole';
import { useNavigate } from 'react-router-dom';
import { rolesHooks } from '../../../hooks/hookIndex';

function RoleRow({ role }) {
  const roleId = role.roles_id;
  const name = role?.name ?? '';
  const menuId = roleId;
  const navigate = useNavigate();

  const { useDelete } = rolesHooks;
  const { delete: deleteRole, isDeleting } = useDelete();

  return (
    <Table.Row>
      <div>{name}</div>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={menuId} />

            <Menus.List id={menuId}>
              <Menus.Button
                icon={<HiPencil />}
                onClick={() => navigate(`/roles/${roleId}/permissions`)}
              >
                Attribuer des permissions
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>
                  Modifier le role
                </Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Supprimer</Menus.Button>
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

export default RoleRow;
