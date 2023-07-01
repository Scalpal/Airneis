const createSlug = (string) => string.split(" ").join("-").toLowerCase();

export default createSlug;