const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
}

const sleep = (millis) => {
    return new Promise(resolve => setTimeout(resolve, millis));
}

module.exports = { asyncForEach, sleep }