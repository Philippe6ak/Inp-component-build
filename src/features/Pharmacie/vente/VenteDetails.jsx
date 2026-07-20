import PropTypes from 'prop-types';
import Table from '../../../ui/Table';

function VenteDetails({ approvisionnement }) {
  const lignes = approvisionnement.approvisionnementsmedicaments ?? [];

  return (
    <div className="space-y-[1.6rem] w-[50rem]">
      <div>
        <h2 className="text-[2rem] font-semibold mb-[0.8rem]">
          Détails de l’approvisionnement
        </h2>
        <p className="text-grey-600">
          <span className="font-medium">Libellé :</span>{' '}
          {approvisionnement.libelle}
        </p>
      </div>

      <Table columns="2fr 1fr">
        <Table.Header>
          <div>Médicament</div>
          <div>Quantité</div>
        </Table.Header>

        <Table.Body
          data={lignes}
          render={(line, index) => (
            <Table.Row key={line.approvisionnementsmedicaments_id ?? index}>
              <div>{line.medicament_libelle}</div>
              <div>{line.quantite}</div>
            </Table.Row>
          )}
        />
      </Table>

      {!lignes.length && (
        <p className="text-grey-500">
          Aucun médicament enregistré pour cet approvisionnement.
        </p>
      )}
    </div>
  );
}

VenteDetails.propTypes = {
  approvisionnement: PropTypes.shape({
    approvisionnements_id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    libelle: PropTypes.string,
    lignes: PropTypes.array,
  }).isRequired,
};

export default VenteDetails;
