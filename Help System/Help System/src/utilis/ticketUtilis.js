export const generateTicketId = (tickets = []) => {
  const nextNum = 1000 + tickets.length + 1;
  return `TCK-${nextNum}`;
};

export const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};