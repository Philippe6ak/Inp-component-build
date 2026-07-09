import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import ConfirmDelete from '../../../ui/ConfirmDelete';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Table from '../../../ui/Table';

import { useDeletetypeGrossesse } from './useDeletetypeGrossesse';
import { useNewtypeGrossesse } from './useNewtypeGrossesse';
import NewtypeGrossesse from './NewtypeGrossesse';

function TypeGrossesseRow({ typeGrossesse }) {
  const typeGrossesserefId = typeGrossesse.typeGrossesse;

  const libelle = typeGrossesse?.libelle ?? '';
  const menuId = typeGrossesserefId;

  const { isDeleting, deletetypeGrossesse } = useDeletetypeGrossesse();
  const { createtypeGrossesse } = useNewtypeGrossesse();

  function handleDuplicate() {
    const duplicatedLibelle = libelle ? `Copy of ${libelle}` : 'Copy';

    createtypeGrossesse({
      libelle: duplicatedLibelle,
    });
  }

  return (
    <Table.Row>
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
              <NewtypeGrossesse typeGrossesseToEdit={typeGrossesse} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="typegrossessesreferents"
                disabled={isDeleting}
                onConfirm={() => deletetypeGrossesse(typeGrossesserefId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default TypeGrossesseRow;
