import Table from '../../../ui/Table';

function getSpecialiteLabel(specialite) {
  if (!specialite) return '—';
  if (typeof specialite === 'string') return specialite;
  return specialite.libelle || specialite.code || '—';
}

function RowUsers({ user }) {
  const nom = user?.nom ?? '—';
  const prenoms = user?.prenoms ?? '—';
  const email = user?.email ?? '—';
  const contact = user?.contact ?? '—';
  const specialite = getSpecialiteLabel(user?.specialite);

  return (
    <Table.Row>
      <div className="font-medium">{nom}</div>
      <div>{prenoms}</div>
      <div>{email}</div>
      <div>{contact}</div>
      <div>{specialite}</div>
    </Table.Row>
  );
}

export default RowUsers;
