/**
 * Generates an OrgCode from the first word of the org name.
 * If that word already exists among existingCodes, appends nextSn.
 * e.g. "Hetauda Sahakari" → "HETAUDA"
 *      "Hetauda Sakha" (when HETAUDA exists, nextSn=3) → "HETAUDA3"
 */
export const generateOrgCode = (
  orgName: string,
  existingCodes: string[],
  nextSn: number,
): string => {
  const firstWord = orgName.trim().split(/\s+/)[0].toUpperCase();
  const isDuplicate = existingCodes.some((c) => c.toUpperCase() === firstWord);
  return isDuplicate ? `${firstWord}${nextSn}` : firstWord;
};

/**
 * Generates a random 6-character alphanumeric password.
 */
export const generatePassword = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from(
    { length: 6 },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join('');
};
