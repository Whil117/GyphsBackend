const Environment = (): string => {
  const url = process.env.DB_CONNECTION
  if (!url) throw new Error('variable mongo indefinida')
  return url
}

export const KeyJwt = (): string => {
  const key = process.env.DB_CONNECTION
  if (!key) throw new Error('variable mongo indefinida')
  return key
}

export default Environment
