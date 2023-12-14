import { parseISO } from "date-fns";

const MILLISECONDS_PER_DAY = 86400000; // Precomputed milliseconds in a day
const DAYS_PER_WEEK = 7; // Precomputed days in a week
const MONTHS_PER_YEAR = 12; // Precomputed months in a year

//Solution from googles Brad AI
const formatDateTime = (isoDate) => {
    const date = parseISO(isoDate);

    if (!isoDate) {
        isoDate = new Date().toISOString();
    }

    const millisecondsDiff = Math.abs(new Date() - date); // Avoid creating extra Date object

    const yearsDiff = Math.floor(
        millisecondsDiff /
            (MILLISECONDS_PER_DAY * DAYS_PER_WEEK * MONTHS_PER_YEAR)
    );
    if (yearsDiff > 0) {
        return `${yearsDiff}${yearsDiff > 1 ? "yrs" : "yr"} ago`;
    }

    const monthsDiff = Math.floor(
        millisecondsDiff / MILLISECONDS_PER_DAY / DAYS_PER_WEEK
    );
    if (monthsDiff > 0) {
        return `${monthsDiff}${monthsDiff > 1 ? "m" : "mn"} ago`;
    }

    const daysDiff = Math.floor(millisecondsDiff / MILLISECONDS_PER_DAY);
    if (daysDiff > 0) {
        return `${daysDiff}d ago`;
    }

    const hoursDiff = Math.floor(millisecondsDiff / 3600000); // Use constant milliseconds in an hour
    if (hoursDiff > 0) {
        return `${hoursDiff}h ago`;
    }

    const minutesDiff = Math.floor(millisecondsDiff / 60000); // Use constant milliseconds in a minute
    if (minutesDiff > 1) {
        return `${minutesDiff}min ago`;
    }

    // Handle "Just now" for seconds
    return "Just now";
};

export default formatDateTime;
