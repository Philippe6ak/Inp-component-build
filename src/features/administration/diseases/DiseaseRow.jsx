import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import ConfirmDelete from '../../../ui/ConfirmDelete';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Table from '../../../ui/Table';
import { useDeleteDisease } from './useDeleteDisease';
import { useNewDisease } from './useNewDisease';
import NewDisease from './NewDisease';

function DiseaseRow({ disease }) {
  const diseaseId = disease.maladies_id;
  const code = disease?.code ?? '';
  const libelle = disease?.libelle ?? '';
  const libelleTypeMaladie = disease?.type_maladie_libelle ?? '';
  const menuId = diseaseId;

  const { isDeleting, deleteDisease } = useDeleteDisease();
  const { createDisease } = useNewDisease();

  function handleDuplicate() {
    createDisease({
      libelle: libelle ? `Copy of ${libelle}` : 'Copy',
      code: code ? `${code}-COPY` : '',
      typesmaladies_id: disease.typesmaladies_id,
    });
  }

  return (
    <Table.Row>
      <div>{code}</div>
      <div>{libelle}</div>
      <div>{libelleTypeMaladie}</div>
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
              <NewDisease diseaseToEdit={disease} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="diseases"
                disabled={isDeleting}
                onConfirm={() => deleteDisease(diseaseId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default DiseaseRow;
