const ex = require('read-excel-file/node')


//[{nome, id_passado, valor}]

const proccesExcel = async () => {
    let ret = []

   await ex('./uploads/Dados.xlsx').then((rows) => {
        
        rows.forEach( (linha, index) => {
            if(index > 0){
                ret.push({id_passado: linha[0],nome: linha[1], valor: linha[2]})
            }
        })

    })

    return ret
}

module.exports = {proccesExcel}