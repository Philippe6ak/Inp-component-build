import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import ConfirmDelete from '../../../ui/ConfirmDelete';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Table from '../../../ui/Table';
import NewConsultationType from './NewConsultationType';

import { typeConsultationsHooks } from '../../../hooks/hookIndex';

function ConsultationTypeRow({ consultation }) {
  const consultationId = consultation.typesconsultations_id;

  const code = consultation?.code ?? '';
  const libelle = consultation?.libelle ?? '';
  const menuId = consultationId;

  const { useDelete } = typeConsultationsHooks;
  const { delete: deleteConsultationType, isDeleting } = useDelete();

  return (
    <Table.Row>
      <div>{code}</div>
      <div>{libelle}</div>
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
