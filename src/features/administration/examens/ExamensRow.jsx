import { HiPencil, HiTrash } from 'react-icons/hi2';
import ConfirmDelete from '../../../ui/ConfirmDelete';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Table from '../../../ui/Table';
import { examensHooks } from '../../../hooks/hookIndex';
import NewExamen from './NewExamen';

function ExamensRow({ examen }) {
  const examenId = examen.examens_id;
  const code = examen?.code ?? '';
  const libelle = examen?.libelle ?? '';
  const libelleTypeExamen = examen?.type_examen_libelle ?? '';
  const coutsmontant = examen?.cout_montant ?? '';
  const menuId = examenId;

  const { useDelete } = examensHooks;
  const { isDeleting, delete: deleteExamen } = useDelete();

  return (
    <Table.Row>
      <div>{code}</div>
      <div>{libelle}</div>
      <div>{libelleTypeExamen}</div>
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
              <NewExamen examenToEdit={examen} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="examens"
                disabled={isDeleting}
                onConfirm={() => deleteExamen(examenId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default ExamensRow;
