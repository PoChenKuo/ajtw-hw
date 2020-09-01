export const getLikeAttachList = function(likeList, dataArr) {
  const arr = [...dataArr].sort((a, b) => (a.code < b.code ? 1 : -1));
  const result = [];
  let indForLike = 0;
  let indForData = 0;
  while (indForData < arr.length && indForLike < likeList.length) {
    const dataId = arr[indForData].code;
    const likeId = likeList[indForLike];
    if (dataId === likeId) {
      result.push(arr[indForData]);
      indForData++;
      indForLike++;
    } else if (dataId < likeId) {
      indForLike++;
    } else {
      indForData++;
    }
  }
  return result;
};
