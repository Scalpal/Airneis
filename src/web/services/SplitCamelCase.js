  export const splitCamelCase = (str) => {
    const words = str.match(/[a-z]+|[A-Z][a-z]*/g)
    
    if (!words) {
      return str
    }
    
    return words.join(" ")
  }