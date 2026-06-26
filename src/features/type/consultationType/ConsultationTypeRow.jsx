import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import ConfirmDelete from '../../../ui/ConfirmDelete';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Table from '../../../ui/Table';
import NewConsultationType from './NewConsultationType';

import { useDeleteConsultationType } from './useDeleteConsultationType';
import { useNewConsultationType } from './useNewConsultationType';

function ConsultationTypeRow({ consultation }) {
  const consultationId = consultation.typesconsultations_id;

  const code = consultation?.code ?? '';
  const libelle = consultation?.libelle ?? '';
  const menuId = consultationId;

  const { isDeleting, deleteConsultationType } = useDeleteConsultationType();
  const { createConsultationType } = useNewConsultationType();

  function handleDuplicate() {
    const duplicatedCode = code ? `${code}-COPY` : '';
    const duplicatedLibelle = libelle ? `Copy of ${libelle}` : 'Copy';

    createConsultationType({
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
              <NewConsultationType consultationToEdit={consultation} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="consultations"
                disabled={isDeleting}
                onConfirm={() => deleteConsultationType(consultationId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default ConsultationTypeRow;
