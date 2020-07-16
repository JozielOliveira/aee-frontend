export const formatDate = (date: string) => {
  const date_format = new Date(date).toLocaleString('pt-BR', { year: 'numeric', month: 'numeric', day: 'numeric' })
  return date_format
}
