export const getProgressText = (index: string) => {
  const url = {
    CARD: `Card Info`,
    BILLING: `Personal Info`,
    EMAIL: `Email Address`,
    DOCUMENT: `Supporting Documents`,
    CONFIRMATION: `Confirmation`,
  }[index];

  return url || `/`;
};
