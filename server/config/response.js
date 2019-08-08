const resSuccess = {
  _errCode: "0",
  _errStr: "success",
  _ret: "0",
  success: true
}

const resFail = {
  _errCode: "1",
  _errStr: "",
  _ret: "1",
  success: false
}

function getRes(res) {
  let obj = {}
  if (res._status) {
    obj = Object.assign({}, resSuccess, res ? res : {})
  } else {
    obj = Object.assign({}, resFail, {
      _errStr: catchErr(res._errMsg)
    })
  }
  return obj
}

/**
 * @param {boolean, any, string}
 */
function dbRes({_status, _data, _errMsg}) {
  let obj = Object.assign({}, {
		_status,
		_data,
		_errMsg
	})
	return obj
}

function catchErr(e) {
  if (e instanceof TypeError) {
    return ('Type error!');
  } else if (e instanceof Error) {
    return (e.message);
  } else {
    return ('Error: ' + e);
  }
}

module.exports = {
  getRes,
  catchErr,
  dbRes
}
