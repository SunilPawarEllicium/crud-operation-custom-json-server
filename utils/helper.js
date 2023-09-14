const returnGreaterOrSmaller = (string1 = "", string2 = "") => {
  if (string1 > string2) {
    return -1;
  }
  if (string1 < string2) {
    return 1;
  }
  // names must be equal
  return 0;
};
const sortByDateResult = (date1= '',date2 ='')=>{
    return date1 - date2
}
module.exports ={returnGreaterOrSmaller}
