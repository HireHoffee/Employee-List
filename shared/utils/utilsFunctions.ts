export function formatPhoneNumber(phone: string) {
  if (!phone) return;

  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10) {
    throw new Error("Неверный формат номера");
  }

  const normalized = digits[0] === "8" ? "7" + digits.slice(1) : digits;
  if (normalized.length === 11 && normalized[0] === "7") {
    return `+7 (${normalized.slice(1, 4)}) ${normalized.slice(4, 7)} ${normalized.slice(7, 9)} ${normalized.slice(9, 11)}`;
  }

  return `+${normalized}`;
}

export function calculateAge(birthDate: string, locale: string): string | undefined {
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
  let enYearsWord = "years old";

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    yearWord = "лет";
  } else if (lastDigit === 1) {
    yearWord = "год";
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    yearWord = "года";
  }

  return `${age} ${locale === "ru" ? yearWord : enYearsWord}`;
}
