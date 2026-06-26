import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import ConfirmDelete from '../../../ui/ConfirmDelete';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Table from '../../../ui/Table';
import { UseDeleteMedication } from './useDeleteMedicament';
import { UseNewMedications } from './useNewMedicament';
import NewMedicament from './NewMedicament';

function MedicamentRow({ medicament }) {
  const medicamentId = Number(medicament.medicaments_id);
  const code = medicament?.code ?? '';
  const libelle = medicament?.libelle ?? '';
  const libelleTypeMedicament = medicament?.type_medicament_libelle ?? '';
  const coutsmontant = medicament?.cout_montant ?? '';
  const menuId = medicamentId;

  const { isDeleting, deleteMedicament } = UseDeleteMedication();
  const { createMedication } = UseNewMedications();

  function handleDuplicate() {
    createMedication({
      libelle: libelle ? `Copy of ${libelle}` : 'Copy',
      code: code ? `${code}-COPY` : '',
      typesmedicaments_id: Number(medicament.typesmedicaments_id),
      montant: medicament.cout_montant,
    });
  }

  return (
    <Table.Row>
      <div>{code}</div>
      <div>{libelle}</div>
      <div>{libelleTypeMedicament}</div>
      <div>{coutsmontant}</div>
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
              <NewMedicament medicamentToEdit={medicament} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="medicament"
                disabled={isDeleting}
                onConfirm={() => deleteMedicament(medicament)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default MedicamentRow;
