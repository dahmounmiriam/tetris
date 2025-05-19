import { format, parseISO, startOfMonth, endOfMonth, subMonths } from 'date-fns';

// Format date to display format
export const formatDate = (dateString: string): string => {
  return format(parseISO(dateString), 'MMM d, yyyy');
};

// Format date to ISO string
export const formatDateToISO = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

// Get start of current month
export const getStartOfMonth = (): string => {
  return formatDateToISO(startOfMonth(new Date()));
};

// Get end of current month
export const getEndOfMonth = (): string => {
  return formatDateToISO(endOfMonth(new Date()));
};

// Get start of previous month
export const getStartOfPreviousMonth = (): string => {
  return formatDateToISO(startOfMonth(subMonths(new Date(), 1)));
};

// Get end of previous month
export const getEndOfPreviousMonth = (): string => {
  return formatDateToISO(endOfMonth(subMonths(new Date(), 1)));
};

// Get date range options
export const getDateRangeOptions = () => [
  { label: 'This Month', value: 'this-month' },
  { label: 'Last Month', value: 'last-month' },
  { label: 'Last 3 Months', value: 'last-3-months' },
  { label: 'Last 6 Months', value: 'last-6-months' },
  { label: 'Custom Range', value: 'custom' },
];
