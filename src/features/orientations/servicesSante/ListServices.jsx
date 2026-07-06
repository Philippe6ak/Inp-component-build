import Button from '../../../ui/Button';
import Empty from '../../../ui/Empty';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Spinner from '../../../ui/Spinner';
import Table from '../../../ui/Table';
import { useSearchParams } from 'react-router-dom';
import NewService from './NewService';

import { useServices } from './useServices';
import ServicesRow from './ServicesRows';

function ListServices() {
  const [searchParams] = useSearchParams();
  const { isLoading, error, services } = useServices();

  if (isLoading) return <Spinner />;

  if (error) {
    return <p>Erreur lors du chargement des services.</p>;
  }

  const serviceData = Array.isArray(services)
    ? services
    : services?.data || services?.services || [];

  //the following is sorting shenenegans for sorting using values, just take it at face value and don't ask :D
  const sortBy = searchParams.get('sortBy') || 'code-asc';
  const [field, direction] = sortBy.split('-');
  const sortedService = [...serviceData].sort((a, b) => {
    if (!['code', 'libelle'].includes(field)) return 0;
    const firstValue = String(a?.[field] ?? '');
    const secondValue = String(b?.[field] ?? '');
    const result = firstValue.localeCompare(secondValue, undefined, {
      numeric: true,
      sensitivity: 'base',
    });
    return direction === 'desc' ? -result : result;
  });

  return (
    <Menus>
      <div className="mb-[1.6rem] flex justify-end">
        <Modal>
          <Modal.Open opens="create-service">
            <Button>Nouveau Service</Button>
          </Modal.Open>

          <Modal.Window name="create-service">
            <NewService />
          </Modal.Window>
        </Modal>
      </div>

      {!sortedService.length ? (
        <Empty ressourceName="service" />
      ) : (
        <Table columns="1fr 3fr 0.5fr">
          <Table.Header>
            <div>Code</div>
            <div>Libelle</div>
            <div></div>
          </Table.Header>

          <Table.Body
            data={sortedService}
            render={(services) => (
              <ServicesRow service={services} key={services.services_id} />
            )}
          />
        </Table>
      )}
    </Menus>
  );
}

export default ListServices;
