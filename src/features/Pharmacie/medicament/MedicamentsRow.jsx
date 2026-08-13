import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import ConfirmDelete from '../../../ui/ConfirmDelete';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Table from '../../../ui/Table';
import { medicamentHooks } from '../../../hooks/hookIndex';
import NewMedicament from './NewMedicament';

function MedicamentRow({ medicament }) {
  const medicamentId = Number(medicament.medicaments_id);
  const code = medicament?.code ?? '';
  const libelle = medicament?.libelle ?? '';
  const libelleTypeMedicament = medicament?.type_medicament_libelle ?? '';
  const coutsmontant = medicament?.cout_montant ?? '';
  const menuId = medicamentId;

  const { useDelete } = medicamentHooks;
  const { isDeleting, delete: deleteMedicament } = useDelete();

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
