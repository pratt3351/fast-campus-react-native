export const getMillisToDateString = (millis:number)=>{

    const date = new Date(millis);
    //2022-10-10
    //2022-01-01
    return `${date.getFullYear()}-${(date.getMonth()+1)<10 ? `0${date.getMonth()+1}` : date.getMonth()+1}-${date.getDate()<10 ? `0${date.getDate()}` : date.getDate()}`
}