module.exports = function findAllChilds(list, id) {
  const arr = [id];
  for (let i of arr) {
    list.forEach(e => (e.reply === i ? arr.push(e._id.toString()) : null));
  }
  return arr;
};
