
const randomNumbersQty = () => {
    let qty = {}
    let number
    let cant = 10e6

    if(process.argv[2] !== 'undefined'){
        cant = process.argv[2]
    }

    for (let i = 0; i < cant; i++) {
        number = Math.floor((Math.random() * 1000 ) + 1)

        if(qty[number]){
            qty[number] = ++qty[number]
        } else {
            qty[number] = 1
        }
        return qty
    }

    process.on('message', msg =>{
        process.send(randomNumbersQty)
    })
}

