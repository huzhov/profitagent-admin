export const getInitials = (fullName: string | null) => {
  const words = fullName?.trim().split(" ") ?? "";
  if (words.length === 0) return "";
  if (words.length === 1) return words[0][0];
  return words[0][0] + words[words.length - 1][0];
};
