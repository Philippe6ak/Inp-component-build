import {
  HiShieldCheck,
  HiUsers,
  HiCheckCircle,
  HiLockClosed,
} from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import Row from '../../../ui/Row';
import Heading from '../../../ui/Heading';
import Button from '../../../ui/Button';
import Modal from '../../../ui/Modal';
import TableOperations from '../../../ui/TableOperations';
import Select from '../../../ui/Select';
import Input from '../../../ui/Input';
import Stat from '../../dashboard/Stat';

import SortBy from '../../../ui/SortBy';
import NewPermissions from './NewPermissions';
import { usePermissions } from './UsePermissions';
import { useRole } from '../roles/useRole';

function PermissionsHeader() {
  const navigate = useNavigate();

  const resourceOptions = [
    { value: 'all', label: 'Toutes les ressources' },
    { value: 'users', label: 'Utilisateurs' },
    { value: 'roles', label: 'Rôles' },
    { value: 'dashboard', label: 'Dashboard' },
  ];

  const statusOptions = [
    { value: 'all', label: 'Tous les statuts' },
    { value: 'active', label: 'Actif' },
    { value: 'inactive', label: 'Inactif' },
  ];

  const { permissions } = usePermissions();
  const { role } = useRole();

  const permissionsCount = Array.isArray(permissions)
    ? permissions.length
    : (permissions?.data?.length ?? permissions?.permissions?.length ?? 0);
  const rolesCount = Array.isArray(role)
    ? role.length
    : (role?.data?.length ?? role?.roles?.length ?? 0);

  return (
    <>
      <Row type="horizontal">
        <div>
          <Heading as="h1">Permissions</Heading>
          <p className="text-grey-600 text-sm mt-1">
            Gérez les permissions et attribuez-les aux rôles de
            l&apos;application.
          </p>
        </div>
        <Row type="horizontal">
          <Modal>
            <Modal.Open opens="create-permissions">
              <Button variation="secondary" size="medium">
                + Nouvelle permission
              </Button>
            </Modal.Open>

            <Modal.Window name="create-permissions">
              <NewPermissions />
            </Modal.Window>
          </Modal>
          <Button size="medium" onClick={() => navigate('/roles')}>
            Gérer les rôles
          </Button>
        </Row>
      </Row>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-[2rem]">
        <Stat
          icon={<HiShieldCheck />}
          title="Permissions totales"
          value={permissionsCount}
          color="blue"
        />
        <Stat
          icon={<HiUsers />}
          title="Rôles"
          value={rolesCount}
          color="green"
        />
        <Stat
          icon={<HiCheckCircle />}
          title="Permissions utilisées"
          value="18"
          color="green"
        />
        <Stat
          icon={<HiLockClosed />}
          title="Permissions inutilisées"
          value="6"
          color="yellow"
        />
      </div>

      {/* Search Input */}

      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[1.6rem]">
          <div className="flex-1">
            <Input type="text" placeholder="Rechercher" className="w-full" />
          </div>
        </div>
        <TableOperations>
          <SortBy options={resourceOptions} defaultValue="all" />
          <Select options={statusOptions} defaultValue="all" />
        </TableOperations>
      </div>
    </>
  );
}

export default PermissionsHeader;
