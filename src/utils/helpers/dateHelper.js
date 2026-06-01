/**
 * Safely gets IST Date object from UTC ISO string.
 */
function toISTDate(isoString) {
  const date = new Date(isoString);
  // IST = UTC + 5h 30m = 330 minutes
  const IST_OFFSET = 330;
  const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
  return new Date(utcTime + IST_OFFSET * 60000);
}

/**
 * Returns the time portion (e.g., "12:30 PM") of a given Date object.
 */
export function getTimeFromDate(date) {
  if (!(date instanceof Date)) return '';
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const suffix = hours >= 12 ? 'PM' : 'AM';
  const adjustedHour = ((hours + 11) % 12) + 1;
  return `${adjustedHour}:${minutes.toString().padStart(2, '0')} ${suffix}`;
}

/**
 * Get next 7 days with readable labels.
 */
export const getNext7Days = () => {
  const days = [];
  const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];
  const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const day =
      i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : weekdays[date.getDay()];
    const formattedDate = `${date.getDate()} ${months[date.getMonth()]}`;
    days.push({day, date: formattedDate, dateObject: date});
  }
  return days;
};

/**
 * Converts two UTC ISO times to IST and formats them as 'hh:mm AM to hh:mm PM'.
 */
export function formatTimeRangeIST(startTime, endTime) {
  if (!startTime || !endTime) return '';
  const start = toISTDate(startTime);
  const end = toISTDate(endTime);
  return `${getTimeFromDate(start)} to ${getTimeFromDate(end)}`;
}

/**
 * Combines a Date object (date only) with the time from another ISO string.
 */
export function combineDateAndTime(datePart, timeISO) {
  const time = new Date(timeISO);
  const combined = new Date(
    Date.UTC(
      datePart.getUTCFullYear(),
      datePart.getUTCMonth(),
      datePart.getUTCDate(),
      time.getUTCHours(),
      time.getUTCMinutes(),
      time.getUTCSeconds(),
      time.getUTCMilliseconds(),
    ),
  );
  return combined;
}

/**
 * Formats an ISO string into 'DD.MON.YY | hh:mm am/pm' in IST.
 */
// export function formatISTDateTime(isoString) {
//   if (!isoString) return '';
//   const date = toISTDate(isoString);
//   const day = String(date.getDate()).padStart(2, '0');
//   const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
//   const year = String(date.getFullYear()).slice(-2);
//   const time = getTimeFromDate(date).toLowerCase();
//   return `${day}.${month}.${year} | ${time}`;
// }

/**
 * Formats an ISO string into 'DD MON YY' in IST.
 */
// export function formatISTDateOnly(isoString) {
//   if (!isoString) return '';
//   const date = toISTDate(isoString);
//   const day = String(date.getDate()).padStart(2, '0');
//   const month = date.toLocaleString('en-US', {month: 'short'}).toUpperCase();
//   const year = String(date.getFullYear()).slice(-2);
//   return `${day} ${month} ${year}`;
// }

export function formatISTDateTime(isoString) {
  try {
    const date = new Date(isoString);

    const options = {
      timeZone: 'Asia/Kolkata',
      hour12: true,
      year: '2-digit',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };

    const parts = new Intl.DateTimeFormat('en-US', options).formatToParts(date);
    const get = type => parts.find(p => p.type === type)?.value;

    const day = get('day');
    const month = get('month')?.toUpperCase();
    const year = get('year');
    const hour = get('hour');
    const minute = get('minute');
    const dayPeriod = get('dayPeriod')?.toLowerCase();

    return `${day}.${month}.${year} | ${hour}:${minute} ${dayPeriod}`;
  } catch (error) {
    console.log(error);
  }
}

export function formatISTDateOnly(isoString) {
  try {
    const date = new Date(isoString);

    const options = {
      timeZone: 'Asia/Kolkata',
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    };

    const formatter = new Intl.DateTimeFormat('en-IN', options);

    return formatter.format(date);
  } catch (error) {
    console.log(error);
    return '';
  }
}

/**
 * Converts an ISO datetime string to 'hh:mm am/pm' in IST.
 */
export function formatISTTimeOnly(isoString) {
  if (!isoString) return '';
  const date = toISTDate(isoString);
  return getTimeFromDate(date).toLowerCase();
}

/**
 * Extracts 'YYYY-MM-DD' from ISO string (UTC).
 */
export function extractDateUTC(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toISOString().split('T')[0];
}

/**
 * Returns minutes between now (UTC) and given ISO string.
 */
export function getMinutesFromNowToISOString(isoString) {
  if (!isoString) return 0;

  try {
    const target = new Date(isoString);

    if (isNaN(target.getTime())) {
      return 0;
    }

    const diffMs = target.getTime() - new Date().getTime();

    return Math.round(diffMs / (1000 * 60));
  } catch (e) {
    console.error('Invalid ISO string:', isoString, e);
    return 0;
  }
}

/**
 * Extracts IST time parts (hh:mm + am/pm) for UI split display.
 */
export function extractISTTimeParts(isoString) {
  if (!isoString) return {time: '', ampm: ''};
  const date = toISTDate(isoString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  const hour12 = ((hours + 11) % 12) + 1;
  return {
    time: `${hour12}:${String(minutes).padStart(2, '0')}`,
    ampm,
  };
}
export const formatChatTime = timestamp => {
  if (!timestamp) return '';

  const date = new Date(timestamp.seconds * 1000);
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }

  return date.toLocaleDateString();
};
