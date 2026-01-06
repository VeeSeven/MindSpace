export const formatDate = (dateString) => {
  if (!dateString) return 'Just now';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return 'Just now';
  }
};