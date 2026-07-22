import { useEffect, useMemo, useState } from 'react';
import { HiArrowLeft, HiShieldCheck } from 'react-icons/hi2';
import Button from '../../../ui/Button';
import Checkbox from '../../../ui/Checkbox';
import Empty from '../../../ui/Empty';
import Heading from '../../../ui/Heading';
import Row from '../../../ui/Row';
import Spinner from '../../../ui/Spinner';

import { useNavigate, useParams } from 'react-router-dom';
import { useAssignPermissions } from './useAssignPermission';
import { permissionsHooks, rolesHooks } from '../../../hooks/hookIndex';

function RolePermissions() {
  const navigate = useNavigate();
  const { roleId } = useParams();

  // const { isLoading: isLoadingRoles, error: rolesError, role } = useRole();
  const { useGetAll: useGetAllRoles } = rolesHooks;
  const {
    data: role,
    isLoading: isLoadingRoles,
    error: rolesError,
  } = useGetAllRoles();

  const { useGetAll: useGetAllPermissions } = permissionsHooks;
  const {
    isLoading: isLoadingPermissions,
    error: permissionsError,
    data: permissions,
  } = useGetAllPermissions();

  const { assignPermissions, isAssigning } = useAssignPermissions();

  const [selectedPermissionKeys, setSelectedPermissionKeys] = useState([]);

  const rolesData = useMemo(() => role ?? [], [role]);
  const permissionsData = useMemo(() => permissions ?? [], [permissions]);

  const selectedRole = useMemo(
    () =>
      rolesData.find(
        (currentRole) => String(currentRole?.roles_id) === String(roleId)
      ),
    [roleId, rolesData]
  );

  const sortedPermissions = useMemo(() => {
    const normalizedPermissions = permissionsData
      .map((permission) => ({
        ...permission,
        __permissionId: String(permission?.permissions_id ?? ''),
      }))
      .filter((permission) => permission.__permissionId);

    return normalizedPermissions.sort((firstPermission, secondPermission) =>
      String(firstPermission?.name ?? '').localeCompare(
        String(secondPermission?.name ?? ''),
        undefined,
        { numeric: true, sensitivity: 'base' }
      )
    );
  }, [permissionsData]);

  const availablePermissionKeys = useMemo(
    () =>
      sortedPermissions.map((permission) => String(permission.__permissionId)),
    [sortedPermissions]
  );

  useEffect(() => {
    const nextSelectedPermissions =
      selectedRole?.permissions
        ?.map((permission) => String(permission?.permissions_id ?? ''))
        .filter(Boolean)
        .filter((permissionKey) =>
          availablePermissionKeys.includes(permissionKey)
        ) ?? [];

    setSelectedPermissionKeys(nextSelectedPermissions);
  }, [selectedRole, availablePermissionKeys]);

  if (isLoadingRoles || isLoadingPermissions) return <Spinner />;

  if (rolesError || permissionsError) {
    return (
      <p>Erreur lors du chargement des donnees de roles et permissions.</p>
    );
  }

  if (!selectedRole) {
    return (
      <Row type="vertical">
        <div className="flex items-center justify-between gap-4">
          <Heading as="h1">Attribution des permissions</Heading>
          <Button variation="secondary" onClick={() => navigate('/roles')}>
            Retour aux roles
          </Button>
        </div>
        <p>Le role demande est introuvable.</p>
      </Row>
    );
  }

  const totalPermissions = availablePermissionKeys.length;
  const selectedCount = selectedPermissionKeys.length;

  function handleTogglePermission(permissionKey) {
    setSelectedPermissionKeys((currentSelection) =>
      currentSelection.includes(permissionKey)
        ? currentSelection.filter((currentKey) => currentKey !== permissionKey)
        : [...currentSelection, permissionKey]
    );
  }

  function handleSubmit() {
    assignPermissions({
      roles_id: selectedRole.roles_id,
      permissions_id: selectedPermissionKeys,
    });
  }

  return (
    <Row type="vertical">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => navigate('/roles')}
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            <HiArrowLeft className="h-4 w-4" />
            Retour aux roles
          </button>

          <div>
            <Heading as="h1">Attribuer des permissions</Heading>
            <p className="text-grey-600">
              Selectionnez les permissions a associer au role{' '}
              <span className="font-semibold text-grey-700 uppercase">
                {selectedRole?.name ?? 'Sans nom'}
              </span>
              .
            </p>
          </div>
        </div>
      </div>

      {!sortedPermissions.length ? (
        <Empty ressourceName="permissions" />
      ) : (
        <>
          <div className="overflow-hidden rounded-md border border-grey-200 bg-grey-0 shadow-sm">
            <div className="border-b border-grey-200 bg-grey-50 px-6 py-4">
              <div className="flex items-center gap-6">
                <div className="shrink-0">
                  <Heading as="h1" className="text-base">
                    Liste des permissions
                  </Heading>
                  <p className="mt-1 text-xl text-grey-600">
                    Cochez une ou plusieurs permissions puis validez
                    l&apos;attribution.
                  </p>
                </div>

                <div className="ml-auto flex items-center gap-4 rounded-md border border-grey-200 bg-grey-0 px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-2 font-medium text-grey-700">
                    <HiShieldCheck className="h-5 w-5 text-brand-600" />
                    {selectedCount} permission{selectedCount > 1 ? 's' : ''}{' '}
                    sélectionnée{selectedCount > 1 ? 's' : ''}
                  </div>
                  <p className="text-sm text-grey-500">
                    {totalPermissions} permission
                    {totalPermissions > 1 ? 's' : ''} disponible
                    {totalPermissions > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[720px]">
                <div className="grid grid-cols-[minmax(280px,1.4fr)_minmax(180px,0.9fr)_140px] gap-4 border-b border-grey-200 bg-grey-50 px-6 py-3 text-xs font-semibold uppercase tracking-[0.4px] text-grey-600">
                  <div>Permission</div>
                  <div>Identifiant</div>
                  <div className="text-center">Selection</div>
                </div>

                <div className="divide-y divide-grey-100">
                  {sortedPermissions.map((permission) => {
                    const permissionKey = String(permission.__permissionId);
                    const isSelected =
                      selectedPermissionKeys.includes(permissionKey);

                    return (
                      <div
                        key={permissionKey}
                        className="grid grid-cols-[minmax(280px,1.4fr)_minmax(180px,0.9fr)_140px] items-center gap-4 px-6 py-4"
                      >
                        <div className="min-w-0">
                          <p className="font-medium text-grey-700 lowercase first-letter:uppercase">
                            {permission?.name ?? 'Permission sans nom'}
                          </p>
                        </div>

                        <div className="text-sm text-grey-500">
                          {permission.__permissionId}
                        </div>

                        <div className="flex justify-center">
                          <Checkbox
                            id={`assign-permission-${permissionKey}`}
                            checked={isSelected}
                            onChange={() =>
                              handleTogglePermission(permissionKey)
                            }
                            disabled={isAssigning}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <div className="flex gap-3">
              <Button
                type="button"
                variation="secondary"
                onClick={() => navigate('/roles')}
                disabled={isAssigning}
              >
                Annuler
              </Button>
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isAssigning}
              >
                {isAssigning ? 'Envoi...' : "Terminer l'attribution"}
              </Button>
            </div>
          </div>
        </>
      )}
    </Row>
  );
}

export default RolePermissions;
