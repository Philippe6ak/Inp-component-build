import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import ConfirmDelete from '../../../ui/ConfirmDelete';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Table from '../../../ui/Table';
import { useDeleteTypeExam } from './useDeleteTypeExam';
import { useNewTypeExamen } from './useNewTypeExam';
import NewTypeExamen from './NewTypeExam';

function RowTypeExam({ examens }) {
  const examensId = examens.typesexamens_id;

  const code = examens?.code ?? '';
  const libelle = examens?.libelle ?? '';
  const menuId = examensId;

  const { isDeleting, deleteExamen } = useDeleteTypeExam();
  const { createTypeExam } = useNewTypeExamen();

  function handleDuplicate() {
    const duplicatedCode = code ? `${code}-COPY` : '';
    const duplicatedLibelle = libelle ? `Copy of ${libelle}` : 'Copy';

    createTypeExam({
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
              <NewTypeExamen typexamToEdit={examens} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="typexamens"
                disabled={isDeleting}
                onConfirm={() => deleteExamen(examensId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default RowTypeExam;
