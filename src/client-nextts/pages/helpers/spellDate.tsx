import moment from 'moment'
export const spellDate = (fecha:any) => {
    const date = moment(fecha);
    return date.format('hh:mm a | MMMM Do')
}