import React from "react";
import { Score } from "./score/score";

export function LastResults(){

  const [mylocalStorage, setMyLocalStorage] = React.useState([])

  /* Récupérer le localStorage Results */
  React.useEffect( ()=> {
    const resultats = JSON.parse(window.localStorage.resultats).reverse()
    console.log(resultats)
    setMyLocalStorage(resultats)
  },[])


  const elements = () => {
    let forms = []; 
    console.log(mylocalStorage)
    for( let i=0 ; i < mylocalStorage.length ; i++) {
      forms.push(
        <>
          <tr>
            <th scope="row">1</th>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </>
      )
      console.log(forms)
      return forms
    }
  }

  return (
    <table class="table table-striped">
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