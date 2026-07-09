import Heading from '../../ui/Heading';
import Button from '../../ui/Button';
import Field from '../../ui/Field';

function AgentForm({ data, onConfirm }) {
  const {
    civilite,
    nom,
    prenom,
    typeAgent,
    fonction,
    email,
    telephone,
    dateNaissance,
    emploi,
  } = data?.data?.personne ?? {};

  return (
    <div className="flex flex-col gap-6">
      <Heading as="h3">
        {civilite} {nom} {prenom}
      </Heading>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem 3rem',
        }}
      >
        <Field label="Type agent" value={typeAgent} />
        <Field label="Fonction" value={fonction} />

        <Field label="Emploi" value={emploi} />
        <Field label="Date de naissance" value={dateNaissance} />

        <Field label="Téléphone" value={telephone} />
        <Field label="Email" value={email} />
      </div>

      <div>
        <Button type="button" onClick={onConfirm}>
          Confirmer et continuer
        </Button>
      </div>
    </div>
  );
}

export default AgentForm;
