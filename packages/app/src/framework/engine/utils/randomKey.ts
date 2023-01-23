
export function makeid(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


export function randomPassword(length: number) {
  let password = ""


  const getLower = (len: number) => {
    let result = "";
    const characters =
      "abcdefghijklmnopqrstuvwxyz";
    const charactersLength = characters.length;
    for (let i = 0; i < len; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result
  }

  const getCapital = (len: number) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charactersLength = characters.length;
    for (let i = 0; i < len; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result
  }

  const getNumber = (len: number) => {
    let result = "";
    const characters =
      "0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < len; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result
  }

  const getEspecialCharacter = (len: number) => {
    let result = "";
    const characters =
      "$@\/{}[]'.,%^*()_+=";
    const charactersLength = characters.length;
    for (let i = 0; i < len; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result
  }


  const eachLen = length / 4

  const lower = getLower(eachLen)
  const capital = getCapital(eachLen)
  const especialCharacter = getEspecialCharacter(eachLen)
  const number = getNumber(eachLen)

  const passArray = [
    lower,
    capital,
    especialCharacter,
    number
  ]

  const shuffledArray = passArray.sort((a, b) => 0.5 - Math.random());

  password = shuffledArray.reduce((accum, current) => {
    accum += current
    return accum
  }, "")

  console.log("Password generated of length: "+ length, password)
  return password;
}
