export function formatDateTime(date) {
    const options = { month: 'short', day: 'numeric' };
    const datePart = date.toLocaleDateString('en-US', options);
    const timePart = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).replace(' ', '');
    return `${datePart} - ${timePart}`;
  }
  