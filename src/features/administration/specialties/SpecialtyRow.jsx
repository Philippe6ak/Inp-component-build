import { HiPencil, HiTrash } from 'react-icons/hi2';
import ConfirmDelete from '../../../ui/ConfirmDelete';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Table from '../../../ui/Table';

import NewSpecialty from './NewSpecialty';
import { specialitesHooks } from '../../../hooks/hookIndex';

function SpecialtyRow({ specialty }) {
  const specialtyId = specialty.specialites_id;

  const code = specialty?.code ?? '';
  const libelle = specialty?.libelle ?? '';

  const { useDelete } = specialitesHooks;
  const { delete: deleteSpecialty, isDeleting } = useDelete();

  return (
    <Table.Row>
      <div>{code}</div>
      <div>{libelle}</div>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={specialtyId} />

            <Menus.List id={specialtyId}>
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <NewSpecialty specialtyToEdit={specialty} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="specialties"
                disabled={isDeleting}
                onConfirm={() => deleteSpecialty(specialtyId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default SpecialtyRow;
