import path from "path"
/**Define addres / path of root folder */
const ROOT_DIRECTORY = `${path.join(__dirname, `..`)}`
/**
 * __dirname: mendapatkan posisi dari folder pada file ini(config.ts).-> pada folder src
 * "../"-> mundur 1 folder ke  belakang
 */
export {ROOT_DIRECTORY}