import { DailySchedule, HolidaySchedule } from '../types';

export interface CurrentStatusResult {
  isOpen: boolean;
  statusLabel: string; // "Open Now" | "Closed Now"
  detailLabel: string; // "Closes at 10:15 PM" | "Opens tomorrow at 5:15 AM"
  currentTimeInPune: string;
  todayScheduleText: string;
}

export function getCurrentStatusInPune(
  schedules: DailySchedule[],
  holidays: HolidaySchedule[] = []
): CurrentStatusResult {
  // Get current date/time in Asia/Kolkata
  const now = new Date();
  const istFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    hour12: false,
    weekday: 'long',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  const parts = istFormatter.formatToParts(now);
  const partMap: Record<string, string> = {};
  parts.forEach((p) => {
    partMap[p.type] = p.value;
  });

  const currentWeekday = partMap.weekday || 'Monday';
  const currentHour = parseInt(partMap.hour, 10);
  const currentMinute = parseInt(partMap.minute, 10);
  const currentMinutes = currentHour * 60 + currentMinute;

  const currentDateStr = `${partMap.year}-${partMap.month}-${partMap.day}`;

  // Time in 12-hour format for display
  const timeDisplayFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  const currentTimeInPune = timeDisplayFormatter.format(now);

  // Check holiday override
  const holiday = holidays.find((h) => h.date === currentDateStr);
  if (holiday && holiday.status === 'closed') {
    return {
      isOpen: false,
      statusLabel: 'Closed Today',
      detailLabel: `Special Holiday: ${holiday.occasion}`,
      currentTimeInPune,
      todayScheduleText: 'Closed for Holiday',
    };
  }

  // Find today's schedule
  const todaySchedule = schedules.find((s) => s.day.toLowerCase() === currentWeekday.toLowerCase());

  if (!todaySchedule || !todaySchedule.isOpen) {
    return {
      isOpen: false,
      statusLabel: 'Closed Today',
      detailLabel: 'Opens Monday 5:15 AM',
      currentTimeInPune,
      todayScheduleText: 'Closed',
    };
  }

  const [openH, openM] = todaySchedule.openTime.split(':').map((x) => parseInt(x, 10));
  const [closeH, closeM] = todaySchedule.closeTime.split(':').map((x) => parseInt(x, 10));

  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  const formatTime12h = (h: number, m: number) => {
    const period = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 === 0 ? 12 : h % 12;
    const displayM = m.toString().padStart(2, '0');
    return `${displayH}:${displayM} ${period}`;
  };

  const todayScheduleText = `${formatTime12h(openH, openM)} – ${formatTime12h(closeH, closeM)}`;

  if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
    return {
      isOpen: true,
      statusLabel: 'Open Now',
      detailLabel: `Closes at ${formatTime12h(closeH, closeM)}`,
      currentTimeInPune,
      todayScheduleText,
    };
  }

  if (currentMinutes < openMinutes) {
    return {
      isOpen: false,
      statusLabel: 'Closed Now',
      detailLabel: `Opens today at ${formatTime12h(openH, openM)}`,
      currentTimeInPune,
      todayScheduleText,
    };
  }

  // After closing
  const nextDay = currentWeekday === 'Saturday' ? 'Sunday' : 'Monday';
  const nextOpenTime = currentWeekday === 'Saturday' ? '8:00 AM' : '5:15 AM';

  return {
    isOpen: false,
    statusLabel: 'Closed Now',
    detailLabel: `Opens ${nextDay} at ${nextOpenTime}`,
    currentTimeInPune,
    todayScheduleText,
  };
}
