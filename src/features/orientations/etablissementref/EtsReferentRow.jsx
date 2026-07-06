import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import ConfirmDelete from '../../../ui/ConfirmDelete';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Table from '../../../ui/Table';

import { useDeleteEtsReferent } from './useDeleteEtsReferent';
import { useNewEtsReferent } from './useNewEtsReferent';
import NewEtsReferent from './NewEtsReferent';

function EtsReferentRow({ etablissement }) {
  const etablissementrefId = etablissement.etablissementsreferents_id;

  const code = etablissement?.code ?? '';
  const libelle = etablissement?.libelle ?? '';
  const menuId = etablissementrefId;

  const { isDeleting, deleteEtablissement } = useDeleteEtsReferent();
  const { createEtsReferent } = useNewEtsReferent();

  function handleDuplicate() {
    const duplicatedCode = code ? `${code}-COPY` : '';
    const duplicatedLibelle = libelle ? `Copy of ${libelle}` : 'Copy';

    createEtsReferent({
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
              <NewEtsReferent etablissementToEdit={etablissement} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="etablissementsreferents"
                disabled={isDeleting}
                onConfirm={() => deleteEtablissement(etablissementrefId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default EtsReferentRow;
