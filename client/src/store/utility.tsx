export const updateObject = (oldObject: Object, updatedProperties: any): Object => {
  return {
    ...oldObject,
    ...updatedProperties
  }
}