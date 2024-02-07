export const formatMoney = (value) => {
    // Verifica se o parâmetro passado é um número
    if (isNaN(value)) {
      return value;
    }
  
    // Formata o número como moeda brasileira (real)
    const formatoMoeda = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  
    // Retorna o número formatado
    return formatoMoeda.format(value);
  }
  