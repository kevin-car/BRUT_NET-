import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

 function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const titreAPropos = 'A propos'
  const titreAide = 'Aide'

  const texteAPropos = "Bonjour, Cette application est à but lucrative dans la formation soutien informatique de l'EMICA. <br> Elle a été réalisée par Kevin CARPENTIER."

  const aide = ` Cette application est à destination de personnes cherchant à convertir leur salaire BRUT en NET. Il sera utilisé par des personnes voulant calculer leur salaire net à la vue d'une nouvelle opportunité ou d'une personne travaillant dans les ressources humaines. 
  Saisissez la province, la périodicité et le salaire. L'application calculera pour vous le montant des salaires net par période.`

  return (
    <div>
      <button onClick={handleOpen} className={ props.element === "aPropos" ? "btn btn-primary btn-lg active" : "btn btn-secondary btn-lg active" } role="button" aria-pressed="true"> { props.element === "aPropos" ? "A Propos" : "Aide" } </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            { props.element === "aPropos" ? titreAPropos : titreAide }
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.element === "aPropos" ? texteAPropos : aide}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default BasicModal;