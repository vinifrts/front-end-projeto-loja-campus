// Localizado em: src/utils/formatPrice.js

export function formatPrice(value) {
  // Converte para número caso venha como String do banco de dados
  const numberValue = Number(value);

  // Se a conversão falhar ou o valor for inválido, retorna um padrão amigável
  if (isNaN(numberValue)) {
    return "R$ 0,00";
  }

  return numberValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatInstallment(value, installments = 3) {
  const numberValue = Number(value);
  if (isNaN(numberValue) || numberValue <= 0) return "";

  const installmentValue = numberValue / installments;
  
  const formattedValue = installmentValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return `ou ${installments}x de ${formattedValue} sem juros`;
}