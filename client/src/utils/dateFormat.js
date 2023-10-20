import { format, isToday, parseISO } from 'date-fns';

const formatDateTime = (isoString) => {
    
    if (!isoString){
        isoString = new Date().toISOString()
    }

    const parsedDate = parseISO(isoString);

    if (isToday(parsedDate)){
        return format(parsedDate, "hh:mm a")
    } else {
        return format(parsedDate, 'MM/dd/yy')
    }
}

export default formatDateTime;