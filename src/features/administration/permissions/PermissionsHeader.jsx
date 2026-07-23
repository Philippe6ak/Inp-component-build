import { HiShieldCheck } from 'react-icons/hi';
import Row from '../../../ui/Row';
import Heading from '../../../ui/Heading';
import Button from '../../../ui/Button';
import Modal from '../../../ui/Modal';
import NewPermissions from './NewPermissions';
import { useNavigate } from 'react-router-dom';

function PermissionsHeader({ permissions }) {
  const navigate = useNavigate();
  const permissionsCount = permissions?.length ?? 0;

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

      <div className="flex items-center gap-2 text-sm text-grey-600">
        <HiShieldCheck className="h-4 w-4 text-brand-600" />
        <span>
          {permissionsCount} permission{permissionsCount > 1 ? 's' : ''} au
          total
        </span>
      </div>
    </>
  );
}

export default PermissionsHeader;
