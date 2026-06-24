import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import ConfirmDelete from '../../../ui/ConfirmDelete';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Table from '../../../ui/Table';
import { UseDeleteExamen } from './useDeleteExamen';
import { UseNewExamen } from './useNewExamen';
import NewExamen from './NewExamen';

function examenRow({ examen }) {
  const examenId = examen.examens_id;
  const code = examen?.code ?? '';
  const libelle = examen?.libelle ?? '';
  const libelleTypeExamen = examen?.type_examen_libelle ?? '';
  const coutsmontant = examen?.cout_montant ?? '';
  const menuId = examenId;

  const { isDeleting, deleteExamen } = UseDeleteExamen();
  const { createExamen } = UseNewExamen();

  function handleDuplicate() {
    createExamen({
      libelle: libelle ? `Copy of ${libelle}` : 'Copy',
      code: code ? `${code}-COPY` : '',
      typesexamens_id: examen.typesexamens_id,
      couts_id: examen.couts_id,
    });
  }

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

export default examenRow;
