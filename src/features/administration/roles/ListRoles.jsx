import Button from '../../../ui/Button';
import Empty from '../../../ui/Empty';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Spinner from '../../../ui/Spinner';
import Table from '../../../ui/Table';

import NewRole from './NewRole';
import RoleRow from './RoleRow';
import { rolesHooks } from '../../../hooks/hookIndex';
import { useSearchParams } from 'react-router-dom';

function ListRoles() {
  const { useGetAll } = rolesHooks;
  const { isLoading, error, data: role } = useGetAll();

  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  if (error) {
    return <p>Erreur lors du chargement des rôles.</p>;
  }

  const rolesData = Array.isArray(role)
    ? role
    : role?.data || role?.roles || [];

  const sortBy = searchParams.get('sortBy') || 'name-asc';
  const [field, direction] = sortBy.split('-');
  const sortedRoles = [...rolesData].sort((a, b) => {
    if (!['name'].includes(field)) return 0;
    const firstValue = String(a?.[field] ?? '');
    const secondValue = String(b?.[field] ?? '');
    const result = firstValue.localeCompare(secondValue, undefined, {
      numeric: true,
      sensitivity: 'base',
    });
    return direction === 'desc' ? -result : result;
  });

  return (
    <Menus>
      <div className="mb-[1.6rem] flex justify-end">
        <Modal>
          <Modal.Open opens="create-role">
            <Button>Nouveau Rôle</Button>
          </Modal.Open>

          <Modal.Window name="create-role">
            <NewRole />
          </Modal.Window>
        </Modal>
      </div>

      {!sortedRoles.length ? (
        <Empty ressourceName="roles" />
      ) : (
        <Table columns="1fr 0.5fr">
          <Table.Header>
            <div>Role</div>
            <div></div>
          </Table.Header>

          <Table.Body
            data={sortedRoles}
            render={(role) => <RoleRow role={role} key={role.roles_id} />}
          />
        </Table>
      )}
    </Menus>
  );
}

export default ListRoles;
