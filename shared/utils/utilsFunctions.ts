export function formatPhoneNumber(phone: string) {
  if (!phone) return;

  const digits = phone.replace(/\D/g, "");
  if (digits.length !== 11 || digits[0] !== "7") {
    throw new Error("Неверный формат номера");
  }

  const formatted = `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)} ${digits.slice(7, 9)} ${digits.slice(9, 11)}`;
  return formatted;
}

export function calculateAge(birthDate: string): string | undefined {
  if (!birthDate) return;

  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();

  const monthDiff = today.getMonth() - birth.getMonth();
  const dayDiff = today.getDate() - birth.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  const lastDigit = age % 10;
  const lastTwoDigits = age % 100;
  let yearWord = "лет";

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    yearWord = "лет";
  } else if (lastDigit === 1) {
    yearWord = "год";
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    yearWord = "года";
  }

  return `${age} ${yearWord}`;
}
