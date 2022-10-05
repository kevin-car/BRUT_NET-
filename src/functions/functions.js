export const unitiesList = () => {
    const unities = ['horaire', 'hebdo', 'bi-hebdo', 'mensuel', 'annuel']

    const theUnities = [];
    for(let el of unities ) {
        theUnities.push(<option key={el} value={el}>{el}</option>)
    }
    return theUnities
}

export const provinces = () => {

    const provinces = [ 'quebec', 'ontario' ]

    const theProvinces = []
    for( let el of provinces) {
        theProvinces.push(<option key={el} value={el}>{el}</option>)
    }
    return theProvinces
}

export const calculNet = (saisie, periodicite) => {
    let salaireAnnuelBrut = 0

   /* Calcul du salaire Annuel Net */ 
    if(periodicite !== 'horaire') {
        switch(periodicite){
            case 'horaire': 
                console.log('on rentre dans la condition horaire')
                salaireAnnuelBrut = (saisie * 40 * 52)
                console.log(saisie * 40 * 52)

                return {'salaireBrut': salaireAnnuelBrut, 'impot': calculQuebec(saisie*40*52) + calculFederal(saisie*40*52)}
            case 'hebdo': 
                salaireAnnuelBrut = saisie * 52
                console.log('on rentre dans la condition hebdo')
                return {'salaireBrut': salaireAnnuelBrut, 'impot': calculQuebec(saisie*52) + calculFederal(saisie*52)}
            case 'bi-hebdo':
                salaireAnnuelBrut = saisie * 26
                console.log('on rentre dans la condition bihebdo')
                return {'salaireBrut': salaireAnnuelBrut, 'impot': calculQuebec(saisie*26) + calculFederal(saisie*26)}
            case 'mensuel': 
                salaireAnnuelBrut = saisie * 12
                console.log('on rentre dans la condition mensuel')
                return {'salaireBrut': salaireAnnuelBrut, 'impot': calculQuebec(saisie*12) + calculFederal(saisie*12)}
            case 'annuel': 
                salaireAnnuelBrut = saisie 
                console.log('on rentre dans la condition annuel')
                return {'salaireBrut': salaireAnnuelBrut, impot: calculQuebec(saisie) + calculFederal(saisie)}
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
        console.log('tranche impotFEDERAL  33%', impot)
    }
    if(montant > 90200) {
        impot +=  (montant - 90200 ) * 0.24
        montant = 90200
        console.log('tranche impot FEDERAL 29%', impot)
    }
    if(montant > 45105) {
        impot +=  (montant - 45105 ) * 0.20
        montant = 45105
        console.log('montant de limpot FEDERAL à 20%',impot)
    }
    if(montant > 0) {
        impot +=  (montant) * 0.15
        montant = 0
        console.log('montant de limpot FEDERAL à 15%',impot)

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
        console.log('tranche impot 33%', impot)
    }
    if(montant > 151978) {
        impot +=  (montant - 151978 ) * 0.29
        montant = 151978
        console.log('tranche impot 29%', impot)
    }
    if(montant > 98040) {
        impot +=  (montant - 98040 ) * 0.26
        montant = 98040
        console.log('montant de limpot à 26%',impot)
    }
    if(montant > 49020) {
        impot +=  (montant - 49020 ) * 0.205
        montant = 49020
        console.log('montant de limpot à 20,5%',impot)
    }
    if(montant > 0) {
        impot +=  (montant) * 0.15
        montant = 0
    }
    console.log('impot total FEDERAL',  impot)
    console.log('salaireAnnuelBrut', salaireAnnuelBrut)
    return impot
}