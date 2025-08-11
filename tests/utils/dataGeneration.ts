//Función para generar un código de reserva vación traslado naviero (RVTN) aleatorio
export function generateRVTNCode(): string {
    const prefix = 'RVTN';
    const randomNumbers = Math.floor(100000 + Math.random() * 900000); // 6 digits
    return `${prefix}${randomNumbers}`;
}

export function generateValidContainerCode(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const owner = Array.from({ length: 3 }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
  const category = 'U'; // Categoría estándar para contenedores de carga
  const serial = String(Math.floor(Math.random() * 1_000_000)).padStart(6, '0');
  const baseCode = owner + category + serial;

  const letterValues: Record<string, number> = {};
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach((char, i) => {
    letterValues[char] = Math.pow(2, i) % 11;
  });

  const all = baseCode.split('');
  const weights = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512];
  let sum = 0;

  for (let i = 0; i < all.length; i++) {
    const char = all[i];
    const value = isNaN(parseInt(char)) ? letterValues[char] : parseInt(char);
    sum += value * weights[i];
  }

  const checkDigit = sum % 11 === 10 ? 0 : sum % 11;
  return baseCode + checkDigit;
}
