import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import ConfirmDelete from '../../../ui/ConfirmDelete';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Table from '../../../ui/Table';
import NewDiseaseType from './NewDiseaseType';

import { typeDiseaseHooks } from '../../../hooks/hookIndex';

function DiseaseTypeRow({ disease }) {
  const diseaseId = disease.typesmaladies_id;

  const code = disease?.code ?? '';
  const libelle = disease?.libelle ?? '';
  const menuId = diseaseId;

  const { useDelete } = typeDiseaseHooks;
  const { isDeleting, delete: deleteDiseaseType } = useDelete();

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
              <NewDiseaseType diseaseToEdit={disease} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="diseases"
                disabled={isDeleting}
                onConfirm={() => deleteDiseaseType(diseaseId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default DiseaseTypeRow;
