import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import ConfirmDelete from '../../../ui/ConfirmDelete';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Table from '../../../ui/Table';
import NewMedecineType from './NewMedecineType';

import { useDeleteMedecineType } from './useDeleteMedecineType';
import { useNewMedecineType } from './useNewMedecineType';

function MedecineTypeRow({ medecine }) {
  const medecineId = medecine.typesmedicaments_id;

  const code = medecine?.code ?? '';
  const libelle = medecine?.libelle ?? '';
  const menuId = medecineId;

  const { isDeleting, deleteMedecineType } = useDeleteMedecineType();
  const { createMedecineType } = useNewMedecineType();

  function handleDuplicate() {
    const duplicatedCode = code ? `${code}-COPY` : '';
    const duplicatedLibelle = libelle ? `Copy of ${libelle}` : 'Copy';

    createMedecineType({
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
              <NewMedecineType medecineToEdit={medecine} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="medecines"
                disabled={isDeleting}
                onConfirm={() => deleteMedecineType(medecineId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default MedecineTypeRow;
