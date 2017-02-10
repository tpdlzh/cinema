export const deepCopy = (target,fieldName,data) => {
   let newObject = {};
   Object.defineProperty(newObject,fieldName,{
     value:data,
     enumerable:true
   });
   return Object.assign({},target,newObject);
}
