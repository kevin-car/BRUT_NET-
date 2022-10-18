import React from "react";
import { Score } from "./score/score";

export function LastResults(){

  const [mylocalStorage, setMyLocalStorage] = React.useState([])

  /* Récupérer le localStorage Results et le préparer pour composant Score*/
  React.useEffect( ()=> {
    console.log(window.localStorage.resultats)
    if(window.localStorage.resultats) {
      const resultats = JSON.parse(window.localStorage.resultats).reverse()
      setMyLocalStorage(resultats)
    }
  },[])

  return (
    <table className="table table-striped">
    <thead>
      <tr>
        <th scope="col">Date</th>
        <th scope="col">Salaire Brut Annuel</th>
        <th scope="col">Salaire Net Annuel</th>
        <th scope="col">Salaire Net Mensuel</th>
        <th scope="col">Salaire Net Horaire</th>
      </tr>
    </thead>
    <tbody>

      <Score
        resultats={mylocalStorage}
      />

    </tbody>
  </table>
  )


}