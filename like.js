export const likeAttach = function(likeList, dataArr) {
  const arr = [...dataArr].sort((a, b) => a.id < b.id);
  const result = [];
  let indForLike = 0;
  let indForData = 0;
  while (indForData < arr.length && indForLike < likeList.length) {
    const dataId = arr[indForData];
    const likeId = likeList[indForLike];
    if (dataId === likeId) {
      result.push(likeId);
      indForData++;
      indForLike++;
    } else if (dataId < likeId) {
      indForData++;
    } else {
      indForLike++;
    }
  }
  return result;
};
