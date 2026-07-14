export function parseId(id:string|string[]|undefined):number{
    const idParsing = Number(id)
    if(isNaN(idParsing) || !Number.isInteger(idParsing) || idParsing <= 0){
        throw new Error("Id Inválido")
    }
    return idParsing
}