import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import ConfirmDelete from '../../../ui/ConfirmDelete';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Table from '../../../ui/Table';

import { useDeleteetatGrossesse } from './useDeleteetatGrossesse';
import { useNewetatGrossesse } from './useNewetatGrossesse';
import Newetatgrossesse from './NewetatGrossesse';

function EtatgrossesseRow({ etatgrossesse }) {
  const etatgrossesserefId = etatgrossesse.etatgrossesse;

  const libelle = etatgrossesse?.libelle ?? '';
  const menuId = etatgrossesserefId;

  const { isDeleting, deleteetatgrossesse } = useDeleteetatGrossesse();
  const { createetatgrossesse } = useNewetatGrossesse();

  function handleDuplicate() {
    const duplicatedLibelle = libelle ? `Copy of ${libelle}` : 'Copy';

    createetatgrossesse({
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
              <Newetatgrossesse etatgrossesseToEdit={etatgrossesse} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="etatgrossessesreferents"
                disabled={isDeleting}
                onConfirm={() => deleteetatgrossesse(etatgrossesserefId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default EtatgrossesseRow;
