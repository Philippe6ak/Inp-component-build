import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import ConfirmDelete from '../../../ui/ConfirmDelete';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Table from '../../../ui/Table';

import { useDeleteService } from './useDeleteService';
import { useNewService } from './useNewService';
import NewService from './NewService';

function ServicesRow({ service }) {
  const serviceId = service.services_id;

  const code = service?.code ?? '';
  const libelle = service?.libelle ?? '';
  const menuId = serviceId;

  const { isDeleting, deleteService } = useDeleteService();
  const { createService } = useNewService();

  function handleDuplicate() {
    const duplicatedCode = code ? `${code}-COPY` : '';
    const duplicatedLibelle = libelle ? `Copy of ${libelle}` : 'Copy';

    createService({
      code: duplicatedCode,
      libelle: duplicatedLibelle,
    });
  }

  return (
    <Table.Row>
      <div>{code}</div>
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
              <NewService serviceToEdit={service} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="service"
                disabled={isDeleting}
                onConfirm={() => deleteService(serviceId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default ServicesRow;
