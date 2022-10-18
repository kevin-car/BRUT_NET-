export const unitiesList = () => {
    const unities = ['horaire', 'hebdo', 'bi-hebdo', 'mensuel', 'annuel']

    const theUnities = [];
    for(let el of unities ) {
        theUnities.push(<option key={el} value={el}>{el}</option>)
    }
    return theUnities
}

export const calculNetQuebec = (saisie, periodicite) => {
    let salaireAnnuelBrut = 0
   /* Calcul du salaire Annuel Net */
   if(saisie !==0) {
       switch(periodicite){
           case 'horaire': 
               salaireAnnuelBrut = (saisie * 40 * 52)
               console.log(saisie * 40 * 52)

               return {'salaireBrut': salaireAnnuelBrut, 'impot': calculQuebec(saisie*(2080)) + calculFederal(saisie*(2080))}
           case 'hebdo': 
               salaireAnnuelBrut = saisie * 52
               return {'salaireBrut': salaireAnnuelBrut, 'impot': calculQuebec(saisie*52) + calculFederal(saisie*52)}
           case 'bi-hebdo':
               salaireAnnuelBrut = saisie * 26
               return {'salaireBrut': salaireAnnuelBrut, 'impot': calculQuebec(saisie*26) + calculFederal(saisie*26)}
           case 'mensuel': 
               salaireAnnuelBrut = saisie * 12
               return {'salaireBrut': salaireAnnuelBrut, 'impot': calculQuebec(saisie*12) + calculFederal(saisie*12)}
           case 'annuel': 
               salaireAnnuelBrut = saisie 
               return {'salaireBrut': salaireAnnuelBrut, impot: calculQuebec(saisie) + calculFederal(saisie)}
           default: 
           console.log('saisie incorrecte ')
       }

   } 
    
}

export const calculNetOntario = (saisie, periodicite) => {
    let salaireAnnuelBrut = 0

   /* Calcul du salaire Annuel Net */ 
    if(periodicite !== 'horaire') {
        switch(periodicite){
            case 'horaire': 
                salaireAnnuelBrut = (saisie * 40 * 52)

                return {'salaireBrut': salaireAnnuelBrut, 'impot': calculOntario(saisie*40*52) + calculFederal(saisie*40*52)}
            case 'hebdo': 
                salaireAnnuelBrut = saisie * 52
                return {'salaireBrut': salaireAnnuelBrut, 'impot': calculOntario(saisie*52) + calculFederal(saisie*52)}
            case 'bi-hebdo':
                salaireAnnuelBrut = saisie * 26
                return {'salaireBrut': salaireAnnuelBrut, 'impot': calculOntario(saisie*26) + calculFederal(saisie*26)}
            case 'mensuel': 
                salaireAnnuelBrut = saisie * 12
                return {'salaireBrut': salaireAnnuelBrut, 'impot': calculOntario(saisie*12) + calculFederal(saisie*12)}
            case 'annuel': 
                salaireAnnuelBrut = saisie 
                return {'salaireBrut': salaireAnnuelBrut, impot: calculOntario(saisie) + calculFederal(saisie)}
            default: 
            console.log('saisie incorrecte ')
        }
    }
}

const calculQuebec = (montant) => {
    var impot = 0
    console.log(`montant : ${montant} impot ${impot }`)
    if(montant > 109755) {
        impot = impot + ( (montant - 109755 ) * 0.33) 
        montant = 109755
    }
    if(montant > 90200) {
        impot +=  (montant - 90200 ) * 0.24
        montant = 90200
    }
    if(montant > 45105) {
        impot +=  (montant - 45105 ) * 0.20
        montant = 45105
    }
    if(montant > 0) {
        impot +=  (montant) * 0.15
        montant = 0

    }
    console.log('impot total  QUEBEC',  impot)
    return impot
}



const calculFederal = (montant) => {
    const salaireAnnuelBrut = JSON.parse(JSON.stringify(montant)); // Permet de copier la valeur de la variable dans l'assigner
    var impot = 0
    console.log(`montant : ${montant} impot ${impot }`)
    if(montant > 216511) {
        impot = impot + ( (montant - 216511 ) * 0.33) 
        montant = 216511
    }
    if(montant > 151978) {
        impot +=  (montant - 151978 ) * 0.29
        montant = 151978
    }
    if(montant > 98040) {
        impot +=  (montant - 98040 ) * 0.26
        montant = 98040
    }
    if(montant > 49020) {
        impot +=  (montant - 49020 ) * 0.205
        montant = 49020
    }
    if(montant > 0) {
        impot +=  (montant) * 0.15
        montant = 0
    }
    return impot
}



const calculOntario = (montant) => {
    var impot = 0
    console.log(`montant : ${montant} impot ${impot }`)
    if(montant > 220000) {
        impot = impot + ( (montant - 220000 ) * 0.1316) 
        montant = 220000
    }
    if(montant > 150000) {
        impot = impot + ( (montant - 150000 ) * 0.1216) 
        montant = 150000
    }
    if(montant > 92454) {
        impot = impot + ( (montant - 92454 ) * 0.1116) 
        montant = 92454
    }
    if(montant > 46226) {
        impot = impot + ( (montant - 46226 ) * 0.0915) 
        montant = 46226
    }
    if(montant > 0) {
        impot = impot + ( (montant ) * 0.0915) 
        montant = 0
    }
    return impot
}
