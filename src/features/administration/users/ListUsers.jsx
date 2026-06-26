import Empty from '../../../ui/Empty';
import Button from '../../../ui/Button';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Pagination from '../../../ui/Pagination';
import Spinner from '../../../ui/Spinner';
import Table from '../../../ui/Table';
import NewUser from './NewUser';
import RowUsers from './RowUsers';
import { useUsers } from './useUsers';

function ListUsers() {
  const { isLoading, error, users = [], count = 0 } = useUsers();

  if (isLoading) return <Spinner />;

  if (error) {
    return <p>Erreur lors du chargement des utilisateurs.</p>;
  }

  if (!users.length) return <Empty ressourceName="users" />;

  return (
    <Menus>
      <div className="mb-[1.6rem] flex justify-end">
        <Modal>
          <Modal.Open opens="create-user">
            <Button>Ajouter un nouvel utilisateur</Button>
          </Modal.Open>

          <Modal.Window name="create-user">
            <NewUser />
          </Modal.Window>
        </Modal>
      </div>
      <Table columns="1.4fr 1.8fr 2fr 1.2fr 1.4fr 0.5fr">
        <Table.Header>
          <div>Nom</div>
          <div>Prénom(s)</div>
          <div>Email</div>
          <div>Contact</div>
          <div>Spécialité</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={users}
          render={(user) => <RowUsers user={user} key={user.id} />}
        />

        <Table.Footer>
          <Pagination resultCount={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default ListUsers;
