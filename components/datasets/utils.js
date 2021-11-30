export const getFiltersCallback = (filters) => {
  return (d) => d.variables.some((v) => v === filters.variable)
}
