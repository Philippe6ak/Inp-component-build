import Button from '../../../ui/Button';
import Empty from '../../../ui/Empty';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Spinner from '../../../ui/Spinner';
import Table from '../../../ui/Table';
import { useSearchParams } from 'react-router-dom';
import NewConsultationType from './NewConsultationType';

import { typeConsultationsHooks } from '../../../hooks/hookIndex';
import ConsultationTypeRow from './ConsultationTypeRow';

function ListConsultationType() {
  const [searchParams] = useSearchParams();

  const { useGetAll } = typeConsultationsHooks;
  const { isLoading, error, data: consultations } = useGetAll();

  if (isLoading) return <Spinner />;

  if (error) {
    return <p>Erreur lors du chargement des types de consultation.</p>;
  }

  const consultationData = Array.isArray(consultations) ? consultations : [];

  const sortBy = searchParams.get('sortBy') || 'code-asc';
  const [field, direction] = sortBy.split('-');
  const sortedConsultations = [...consultationData].sort((a, b) => {
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
          <Modal.Open opens="create-consultation-type">
            <Button>Nouveau type de consultation</Button>
          </Modal.Open>

          <Modal.Window name="create-consultation-type">
            <NewConsultationType />
          </Modal.Window>
        </Modal>
      </div>

      {!sortedConsultations.length ? (
        <Empty ressourceName="consultations" />
      ) : (
        <Table columns="1fr 3fr 0.5fr">
          <Table.Header>
            <div>Code</div>
            <div>Libelle</div>
            <div></div>
          </Table.Header>

          <Table.Body
            data={sortedConsultations}
            render={(consultation) => (
              <ConsultationTypeRow
                consultation={consultation}
                key={consultation.typesconsultations_id}
              />
            )}
          />
        </Table>
      )}
    </Menus>
  );
}

export default ListConsultationType;
