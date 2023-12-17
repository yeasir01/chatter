import { isToday,isYesterday, isThisWeek, format} from 'date-fns';

const formatShortDate = (isoDate) => {
  const targetDate = new Date(isoDate);

  if (isToday(targetDate)) {
    // Return the time if the date is today
    return format(targetDate, 'h:mm a');
  } else if (isYesterday(targetDate)) {
    // Return "yesterday" if the date is yesterday
    return 'Yesterday';
  } else if (isThisWeek(targetDate)) {
    // Return the abbreviated day of the week if the date is from this week
    return format(targetDate, 'EEEE');
  } else {
    // If the date is not today, yesterday, or from this week, return the formatted date
    return format(targetDate, 'M/d/yy');
  }
}

const formatDateTime = (isoDate) => {
  const targetDate = new Date(isoDate);

  return format(targetDate, "M/d/y hh:mm a")
}

export {
  formatShortDate,
  formatDateTime
}