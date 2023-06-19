
const formatDate = (date) => {
  const dateObj = new Date(date)

  // Extraction de l'année, du mois et du jour
  const year = dateObj.getFullYear()
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0")
  const day = dateObj.getDate().toString().padStart(2, "0")

  // Création de la nouvelle chaîne de date au format "DD/MM/YYYY"
  const formattedDate = day + "/" + month + "/" + year

  return formattedDate
}

export default formatDate