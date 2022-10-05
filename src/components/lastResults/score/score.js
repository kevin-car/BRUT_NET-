import React from "react";


export function Score(props){

    const resultats = props.resultats
    return (
        <>
            { resultats.map((value, key )=> (
                      <tr key={key}>
                        <th scope="row" > {value.date} </th>
                        <td>{value.salaireAnnuelBrut}</td>
                        <td>{value.salaireAnnuelNet}</td>
                        <td>{value.salaireMensuelNet}</td>
                        <td>{value.salaireHeureNet}</td>
                    </tr>
            )) }
        
        </>
    )
/* ‡ */
}