// @ts-ignore
import uniqid from 'uniqid';

export const getUniqId = (prefix = "", suffix = "") =>{
  return uniqid(prefix, suffix)
}