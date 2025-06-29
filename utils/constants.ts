const currentYear = new Date().getFullYear();







export const RecentYears = Array.from({ length: 21 }, (_, i) => currentYear - i);
