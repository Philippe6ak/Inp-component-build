/* eslint-disable react/prop-types */
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Menus from '../../ui/Menus';
import Modal from '../../ui/Modal';
import Table from '../../ui/Table';
import NewSpecialty from './NewSpecialty';
import { useDeleteSpecialty } from './useDeleteSpecialty';
import { useNewSpecialty } from './useNewSpecialty';

function SpecialtyRow({ specialty }) {
  const specialtyId = specialty.specialites_id;

  const code = specialty?.code ?? '';
  const libelle = specialty?.libelle ?? '';
  const menuId = specialtyId;

  const { isDeleting, deleteSpecialty } = useDeleteSpecialty();
  const { createSpecialty } = useNewSpecialty();

  function handleDuplicate() {
    const duplicatedCode = code ? `${code}-COPY` : '';
    const duplicatedLibelle = libelle ? `Copy of ${libelle}` : 'Copy';

    createSpecialty({
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
