async function valuation(data, incubatorId){ // PAKE ASYNC
    const sumValuation = await data.sum('valuation', { // PAKE AWAIT
        where: {
            IncubatorId: incubatorId
        }
    });

    if(!sumValuation){ // KALO UNDIFINDED
        return "-"
    }

    const format = sumValuation.toLocaleString("id-ID");
    return `Rp. ${format}`
}

function formatDate(date){
   return date.toLocaleDateString('en-CA')
}
function reverseFormating(date){
    return new Date(date)
}

module.exports = {valuation, formatDate, reverseFormating}