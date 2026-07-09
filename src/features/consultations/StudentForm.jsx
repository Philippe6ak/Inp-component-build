import Heading from '../../ui/Heading';
import Button from '../../ui/Button';
import Field from '../../ui/Field';

function StudentForm({ data, onConfirm }) {
  const {
    civilite,
    nom,
    prenoms,
    codeEcole,
    libelleFiliere,
    specialite,
    email,
    telephone,
    dateNaissance,
  } = data?.data?.personne ?? {};

  return (
    <div className="flex flex-col gap-6">
      <Heading as="h3">
        {civilite} {nom} {prenoms}
      </Heading>

      <div className="grid gap-[2rem_3rem] grid-cols-2">
        <Field label="École" value={codeEcole} />
        <Field label="Filière" value={libelleFiliere} />

        <Field label="Spécialité" value={specialite} />
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

export default StudentForm;
