import React from "react";
import "./style.css"
import Title  from "./Title/title";
import { unitiesList, provinces, calculNetQuebec, calculNetOntario } from '../functions/functions'
import { LastResults } from "./lastResults/lastResults";
import BasicModal from "./modal/modal";
const moment = require('moment');

function Component()  {
    /* Champ de saisies */
    const [province, setProvince] = React.useState('quebec')
    const [saisie, setSaisie] = React.useState(0)
    const [periodicite, setPeriodicite] = React.useState('horaire')

    const [horaire, setHoraire] = React.useState(0)
    const [hebdo, setHebdo] = React.useState(0)
    const [biHebdo, setBiHebdo] = React.useState(0)
    const [mensuel, setMensuel] = React.useState(0)
    const [annuel, setAnnuel] = React.useState(0)
    
    const [annuelBrut, setAnnuelBrut] = React.useState(0)

    async function validate () {
        await alimenterTableau();
        setTimeout( stockerLocalStorage(), 1000);
        console.log(province)
    }


    /* Incrémenter les champs avec les salaire net obtenus */
    async function alimenterTableau () {
        const retourCalcul =  province === "ontario" ? calculNetOntario(saisie, periodicite) : calculNetQuebec(saisie, periodicite); 
        console.log('retourCalcul', retourCalcul)
        const salaireNetAnnuel = retourCalcul.salaireBrut - retourCalcul.impot
        setAnnuel(Math.round(salaireNetAnnuel));
        setMensuel(Math.round(salaireNetAnnuel/12))
        setBiHebdo(Math.round(salaireNetAnnuel/24))
        setHebdo(Math.round(salaireNetAnnuel/52))
        setHoraire(Math.round(salaireNetAnnuel/(52*40)))
        setAnnuelBrut(retourCalcul.salaireBrut)

        console.log('saisie',saisie )
        console.log('periodicite',periodicite )
        console.log('horaire',horaire )
        console.log('hebdo',hebdo )
        console.log('mensuel',mensuel )
        console.log('annuel',annuel )
        console.log('annuelBrut',annuelBrut )
    }

    const effacerLesChamps = () => {
        setAnnuel(0); setMensuel(0); setBiHebdo(0); setHebdo(0); setHoraire(0); setSaisie(0);
    }

    const stockerLocalStorage = () => {
        const format = 'YYYY/MM/DD - hh:mm A'
        const date = new Date().toISOString();
        const sauvegardeElement = {
            date : moment(date).format(format),
            salaireAnnuelBrut : annuelBrut, 
            salaireAnnuelNet : annuel, 
            salaireMensuelNet : mensuel, 
            salaire2weekNet : biHebdo,
            salaireHeureNet : horaire,
        }
        console.log('sauvegarde prete pour le local storagr', sauvegardeElement)


        // Récupérer le localStrage dans une variable en tableau 
        let oldLocalStorage = [] // Si le local storage n'existe pas, je le créé
        if(!localStorage.resultats) {
            localStorage.setItem('resultats', [])
        } else { // si le localStorage existe, je récupère sa valeur ! 
            oldLocalStorage = JSON.parse(window.localStorage.resultats);
        }
        console.log(sauvegardeElement)
        let newLocalStorage = [...oldLocalStorage]
        newLocalStorage.push(sauvegardeElement)
        newLocalStorage = newLocalStorage.slice(-5)

        // Renvoyer le nouveau localStorage
        localStorage.resultats = JSON.stringify(newLocalStorage)
    }

    return(
      <div className="programme">
        <Title/>
        <div className="unity">
            <label>PROVINCE : </label>
            <select defaultValue="quebec" onChange={(e)  => setProvince(e.target.value)}>
                <option value="quebec">quebec</option>
                <option value="ontario">ontario</option>

            </select>
        </div>
        <div className="unity">
            <label htmlFor="">UNITE DU SALAIRE : </label>
            <select onChange={e => setPeriodicite(e.target.value)}>
                {unitiesList()}
            </select>
        </div>
        <div className="mount">
            <input onChange={e => setSaisie(e.target.value)} placeholder="Saisir le salaire Annuel"/>
        </div>
        <div>
            <button onClick={ validate }>Valider</button>
            <button onClick={effacerLesChamps}>Effacer les champs</button>
        </div>
        <div className="tableau">
            <ul className="subtitle_array">
                <li> <input type="text"  disabled={true} id="horaire" value={horaire} /></li>
                <li> <input type="text"  disabled={true} id="Hebdommadaire" value={hebdo}/> </li>
                <li> <input type="text"  disabled={true} id="bi-hebdommadaire" value={biHebdo}/> </li>
                <li> <input type="text"  disabled={true} id="Mensuel" value={mensuel}/></li>
                <li> <input type="text"  disabled={true} id="Annuel" value={annuel}/> </li>
            </ul>
            <ul className="subtitle_array">
                <li><label htmlFor="horaire">Horaire</label></li>
                <li><label htmlFor="Hebdommadaire">Hebdommadaire</label></li>
                <li><label htmlFor="bi-hebdommadaire">Aux 2 semaines</label></li>
                <li> <label htmlFor="Mensuel">Mensuel</label></li>
                <li><label htmlFor="Annuel">Annuel</label></li>
            </ul>
            </div>

            <div className="lastResult">
                <h2>Derniers résultats </h2>
                <LastResults/>
            </div>
            <div className="lastButtons">
                <BasicModal element="aPropos"/>
                <BasicModal element="Aide"/>
            </div>
        </div>
    );
  }

  export default Component;