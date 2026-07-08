import { useEffect, useMemo, useState } from 'react';
import { HiArrowLeft, HiShieldCheck } from 'react-icons/hi2';
import { useNavigate, useParams } from 'react-router-dom';
import { usePermissions } from '../permissions/usePermissions';
import { useAssignPermissions } from './useAssignPermission';
import { useRole } from './useRole';
import Button from '../../../ui/Button';
import Checkbox from '../../../ui/Checkbox';
import Empty from '../../../ui/Empty';
import Heading from '../../../ui/Heading';
import Row from '../../../ui/Row';
import Spinner from '../../../ui/Spinner';

function normalizePermissionsResponse(permissions) {
  if (Array.isArray(permissions)) return permissions;
  if (Array.isArray(permissions?.data)) return permissions.data;
  if (Array.isArray(permissions?.permissions)) return permissions.permissions;
  return [];
}

function normalizeRolesResponse(role) {
  if (Array.isArray(role)) return role;
  if (Array.isArray(role?.data)) return role.data;
  if (Array.isArray(role?.roles)) return role.roles;
  return [];
}

function extractAssignedPermissionKeys(role) {
  if (!role) return [];

  const candidates = [
    role.permissions,
    role.role_permissions,
    role.assigned_permissions,
    role.permissions_ids,
    role.permission_ids,
  ].filter(Boolean);

  const permissionKeys = candidates.flatMap((candidate) => {
    if (!Array.isArray(candidate)) return [];

    return candidate
      .map((permission) => {
        if (
          permission &&
          typeof permission === 'object' &&
          permission.permissions_id !== undefined
        ) {
          return String(permission.permissions_id);
        }

        if (
          permission &&
          typeof permission === 'object' &&
          permission.permission_id !== undefined
        ) {
          return String(permission.permission_id);
        }

        if (
          permission &&
          typeof permission === 'object' &&
          permission.id !== undefined
        ) {
          return String(permission.id);
        }

        if (permission !== undefined && permission !== null) {
          return String(permission);
        }

        return null;
      })
      .filter(Boolean);
  });

  return [...new Set(permissionKeys)];
}

function getPermissionId(permission) {
  if (!permission || typeof permission !== 'object') return null;

  if (
    permission.permissions_id !== undefined &&
    permission.permissions_id !== null
  ) {
    return permission.permissions_id;
  }

  if (
    permission.permission_id !== undefined &&
    permission.permission_id !== null
  ) {
    return permission.permission_id;
  }

  if (permission.id !== undefined && permission.id !== null) {
    return permission.id;
  }

  return null;
}

function RolePermissions() {
  const navigate = useNavigate();
  const { roleId } = useParams();

  const { isLoading: isLoadingRoles, error: rolesError, role } = useRole();
  const {
    isLoading: isLoadingPermissions,
    error: permissionsError,
    permissions,
  } = usePermissions();
  const { assignPermissions, isAssigning } = useAssignPermissions();

  const [selectedPermissionKeys, setSelectedPermissionKeys] = useState([]);

  const rolesData = useMemo(() => normalizeRolesResponse(role), [role]);
  const permissionsData = useMemo(
    () => normalizePermissionsResponse(permissions),
    [permissions]
  );

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
        __permissionId: getPermissionId(permission),
      }))
      .filter((permission) => permission.__permissionId !== null);

    return normalizedPermissions.sort((firstPermission, secondPermission) =>
      String(firstPermission?.name ?? '').localeCompare(
        String(secondPermission?.name ?? ''),
        undefined,
        { numeric: true, sensitivity: 'base' }
      )
    );
  }, [permissionsData]);

  const permissionIdMap = useMemo(
    () =>
      new Map(
        sortedPermissions.map((permission) => [
          String(permission.__permissionId),
          permission.__permissionId,
        ])
      ),
    [sortedPermissions]
  );

  const availablePermissionKeys = useMemo(
    () =>
      sortedPermissions.map((permission) => String(permission.__permissionId)),
    [sortedPermissions]
  );

  useEffect(() => {
    const nextSelectedPermissions = extractAssignedPermissionKeys(
      selectedRole
    ).filter((permissionKey) => permissionIdMap.has(permissionKey));

    setSelectedPermissionKeys(nextSelectedPermissions);
  }, [selectedRole, permissionIdMap]);

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
  const areAllSelected =
    totalPermissions > 0 && selectedCount === totalPermissions;

  function handleTogglePermission(permissionKey) {
    setSelectedPermissionKeys((currentSelection) =>
      currentSelection.includes(permissionKey)
        ? currentSelection.filter((currentKey) => currentKey !== permissionKey)
        : [...currentSelection, permissionKey]
    );
  }

  function handleToggleAll() {
    setSelectedPermissionKeys(
      areAllSelected ? [] : [...availablePermissionKeys]
    );
  }

  function handleSubmit() {
    assignPermissions({
      roles_id: selectedRole.roles_id,
      permissions_id: selectedPermissionKeys
        .map((permissionKey) => permissionIdMap.get(permissionKey))
        .filter((permissionId) => permissionId !== undefined),
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
            <p className="text-sm text-grey-600">
              Selectionnez les permissions a associer au role{' '}
              <span className="font-semibold text-grey-700">
                {selectedRole?.name ?? 'Sans nom'}
              </span>
              .
            </p>
          </div>
        </div>

        <div className="rounded-md border border-grey-200 bg-grey-0 px-4 py-3 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-medium text-grey-700">
            <HiShieldCheck className="h-5 w-5 text-brand-600" />
            {selectedCount} permission{selectedCount > 1 ? 's' : ''}{' '}
            selectionnee{selectedCount > 1 ? 's' : ''}
          </div>
          <p className="mt-1 text-xs text-grey-500">
            {totalPermissions} permission{totalPermissions > 1 ? 's' : ''}{' '}
            disponible{totalPermissions > 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {!sortedPermissions.length ? (
        <Empty ressourceName="permissions" />
      ) : (
        <>
          <div className="overflow-hidden rounded-md border border-grey-200 bg-grey-0 shadow-sm">
            <div className="border-b border-grey-200 bg-grey-50 px-6 py-4">
              <div className="grid gap-4 md:grid-cols-[minmax(220px,1.3fr)_minmax(160px,0.8fr)_120px] md:items-center">
                <div>
                  <Heading as="h3" className="text-base">
                    Liste des permissions
                  </Heading>
                  <p className="mt-1 text-sm text-grey-600">
                    Cochez une ou plusieurs permissions puis validez
                    l&apos;attribution.
                  </p>
                </div>

                <div className="text-sm text-grey-600">
                  Role ID: {selectedRole.roles_id}
                </div>

                <div className="flex justify-start md:justify-end">
                  <Checkbox
                    id="select-all-permissions"
                    checked={areAllSelected}
                    onChange={handleToggleAll}
                    disabled={isAssigning}
                  >
                    Tout selectionner
                  </Checkbox>
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
                          <p className="font-medium text-grey-700">
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

          <div className="flex flex-col gap-3 justify-end">
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
                {isAssigning ? 'Envoi...' : 'Attribuer les permissions'}
              </Button>
            </div>
          </div>
        </>
      )}
    </Row>
  );
}

export default RolePermissions;
