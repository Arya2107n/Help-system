export const validateTicketForm = ({ subject, description, priority }) => {
  const errors = {};
  if (!subject || !subject.trim()) {
    errors.subject = 'Subject is required';
  }
  if (!description || !description.trim()) {
    errors.description = 'Description is required';
  }
  if (!priority) {
    errors.priority = 'Priority is required';
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};