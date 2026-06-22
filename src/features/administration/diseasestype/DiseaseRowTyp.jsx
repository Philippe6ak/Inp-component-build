import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import ConfirmDelete from '../../../ui/ConfirmDelete';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Table from '../../../ui/Table';
import { useDeleteDisease } from './useDeleteDiseaseTyp';
import { useNewDisease } from './useNewDiseaseTyp';
import NewDisease from './NewDiseaseTyp';

function DiseaseRow({ disease }) {
  const diseaseId = disease.typesmaladies_id;

  const code = disease?.code ?? '';
  const libelle = disease?.libelle ?? '';
  const menuId = diseaseId;

  const { isDeleting, deleteDisease } = useDeleteDisease();
  const { createDisease } = useNewDisease();

  function handleDuplicate() {
    const duplicatedCode = code ? `${code}-COPY` : '';
    const duplicatedLibelle = libelle ? `Copy of ${libelle}` : 'Copy';

    createDisease({
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
