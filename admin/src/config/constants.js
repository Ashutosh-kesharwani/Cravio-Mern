export const API_BASE_URL = String(import.meta.env.VITE_API_URL);

/* 
Or one way 
> Here filename use config.js
const config = {
  API_BASE_URL =String(import.meta.env.VITE_API_URL); // use this to typecast it into str , to prevent crash if user doesnot send the data in form of str 
}

export default config
*/
