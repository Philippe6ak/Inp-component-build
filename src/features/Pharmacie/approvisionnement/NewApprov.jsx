import { useState } from 'react';
import { useFieldArray, useForm, Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { toast } from 'react-hot-toast';
import Button from '../../../ui/Button';
import Form from '../../../ui/Form';
import FormRow from '../../../ui/FormRow';
import Input from '../../../ui/Input';
import Table from '../../../ui/Table';
import { medicamentHooks } from '../../../hooks/hookIndex';
import { approvisionnementsHooks } from '../../../hooks/hookIndex';

// Phase 1: saisie du libellé + des lignes (médicament / quantité)
// Phase 2: récapitulatif à confirmer avant l'envoi réel
function NewApprov({ approvisionnementToEdit = {}, onCloseModal }) {
  const { approvisionnements_id: editId, ...editValues } =
    approvisionnementToEdit;
  const isEditSession = Boolean(editId);

  const { useCreateEdit } = approvisionnementsHooks;
  const { createEdit, isWorking } = useCreateEdit();

  const { useGetAll } = medicamentHooks;
  const {
    data: medicament,
    isLoading: isLoadingMedicament,
    error,
  } = useGetAll();

  const medicamentData = Array.isArray(medicament) ? medicament : [];

  const medicamentOptions = medicamentData.map((m) => ({
    value: m.medicaments_id,
    label: m.libelle,
  }));

  const [step, setStep] = useState('edit'); // 'edit' | 'confirm'
  const [pendingData, setPendingData] = useState(null);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      libelle: editValues.libelle ?? '',
      rows: editValues.lignes?.length
        ? editValues.lignes.map((l) => ({
            medicament: {
              value: l.medicaments_id,
              label: l.medicament_libelle,
            },
            quantite: l.quantite,
          }))
        : [{ medicament: null, quantite: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'rows' });
  const watchedRows = watch('rows');

  function handleAddRow() {
    append({ medicament: null, quantite: '' });
  }

  // Validation de la phase 1 -> passage au récapitulatif
  function goToConfirm(data) {
    const rows = (data.rows || []).filter(
      (row) => row.medicament && row.quantite !== '' && Number(row.quantite) > 0
    );

    if (!rows.length) {
      toast.error('Ajoutez au moins un médicament avant de continuer.');
      return;
    }

    setPendingData({ libelle: data.libelle.trim(), rows });
    setStep('confirm');
  }

  // Envoi réel, déclenché uniquement depuis l'écran de confirmation
  function handleConfirm() {
    const payload = {
      libelle: pendingData.libelle,
      lignes: pendingData.rows.map((row) => ({
        medicaments_id: Number(row.medicament.value),
        medicament_libelle: row.medicament.label,
        quantite: Number(row.quantite),
      })),
    };

    createEdit(
      { formData: payload, id: editId },
      {
        onSuccess: () => {
          onCloseModal?.();
        },
      }
    );
  }

  const totalQty =
    pendingData?.rows.reduce((sum, r) => sum + Number(r.quantite || 0), 0) ?? 0;

  if (step === 'confirm') {
    return (
      <div className="space-y-[1.6rem] w-[50rem]">
        <div>
          <h2 className="text-[1.8rem] font-semibold mb-[0.4rem]">
            Confirmer l’approvisionnement
          </h2>
          <p className="text-grey-600">
            <span className="font-medium">Libellé :</span> {pendingData.libelle}
          </p>
        </div>

        <div className="rounded-md border border-grey-200 overflow-hidden">
          <Table columns="2fr 1fr">
            <Table.Header>
              <div>Médicament</div>
              <div>Quantité</div>
            </Table.Header>
            <Table.Body
              data={pendingData.rows}
              render={(row, index) => (
                <Table.Row key={`${row.medicament.value}-${index}`}>
                  <div>{row.medicament.label}</div>
                  <div>{row.quantite}</div>
                </Table.Row>
              )}
            />
          </Table>
        </div>

        <div className="rounded-md border border-grey-200 bg-grey-50 p-[1.4rem] flex items-center justify-between">
          <span className="font-medium">Quantité totale</span>
          <span className="text-[1.6rem] font-semibold">{totalQty}</span>
        </div>

        <FormRow>
          <Button
            variation="secondary"
            type="button"
            onClick={() => setStep('edit')}
          >
            Retour
          </Button>
          <Button type="button" disabled={isWorking} onClick={handleConfirm}>
            {isWorking ? 'Enregistrement...' : 'Confirmer'}
          </Button>
        </FormRow>
      </div>
    );
  }

  const getAvailableMedicaments = (currentIndex) => {
    const selectedIds = watchedRows
      ?.filter((_, index) => index !== currentIndex)
      ?.map((row) => row?.medicament?.value)
      ?.filter(Boolean);

    return medicamentOptions.filter(
      (option) => !selectedIds.includes(option.value)
    );
  };
  return (
    <Form
      onSubmit={handleSubmit(goToConfirm)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow label="Libellé" error={errors?.libelle?.message}>
        <Input
          type="text"
          id="libelle"
          disabled={isWorking}
          {...register('libelle', { required: 'Le libellé est requis' })}
        />
      </FormRow>

      <div className="mb-[1.6rem] space-y-[1.2rem]">
        <div className="flex items-center justify-between">
          <div className="font-medium">Médicaments</div>
          <Button type="button" variation="secondary" onClick={handleAddRow}>
            Ajouter une ligne
          </Button>
        </div>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className=" grid grid-cols-1 md:grid-cols-[2fr_1fr_auto] gap-4 items-end "
          >
            <div>
              <label
                htmlFor={`medicament-${field.id}`}
                className="block font-medium mb-2"
              >
                Médicament
              </label>
              <Controller
                name={`rows.${index}.medicament`}
                control={control}
                rules={{ required: 'Le médicament est requis' }}
                render={({ field: selectField }) => (
                  <Select
                    inputId={`medicament-${field.id}`}
                    options={getAvailableMedicaments(index)}
                    isLoading={isLoadingMedicament}
                    isDisabled={isWorking || isLoadingMedicament}
                    placeholder="Sélectionner"
                    menuPortal={(base) => ({ ...base, zIndex: 2000 })}
                    menuPosition="fixed"
                    onChange={(selected) =>
                      selectField.onChange(selected ?? null)
                    }
                    onBlur={selectField.onBlur}
                    value={selectField.value}
                  />
                )}
              />
              {errors.rows?.[index]?.medicament && (
                <span className="text-red-700 text-[1.4rem]">
                  {errors.rows[index].medicament.message}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor={`quantite-${field.id}`}
                className="block font-medium mb-2"
              >
                Quantité
              </label>
              <Input
                type="number"
                id={`quantite-${field.id}`}
                disabled={isWorking}
                min="1"
                {...register(`rows.${index}.quantite`, {
                  required: 'La quantité est requise',
                  min: {
                    value: 1,
                    message: 'La quantité doit être au moins 1',
                  },
                })}
              />
              {errors.rows?.[index]?.quantite && (
                <span className="text-red-700 text-[1.4rem]">
                  {errors.rows[index].quantite.message}
                </span>
              )}
            </div>

            <Button
              variation="danger"
              type="button"
              className="w-full md:w-auto"
              disabled={fields.length === 1 || isWorking}
              onClick={() => remove(index)}
            >
              Supprimer
            </Button>
          </div>
        ))}
      </div>

      <FormRow>
        {onCloseModal && (
          <Button variation="secondary" type="button" onClick={onCloseModal}>
            Annuler
          </Button>
        )}
        <Button type="submit" disabled={isWorking}>
          Continuer
        </Button>
      </FormRow>
    </Form>
  );
}

NewApprov.propTypes = {
  approvisionnementToEdit: PropTypes.shape({
    approvisionnements_id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    libelle: PropTypes.string,
    lignes: PropTypes.array,
  }),
  onCloseModal: PropTypes.func,
};

export default NewApprov;
