import request from '@/utils/request'

export function listUser(params) {
  return request({
    url: '/stu/list',
    method: 'post',
    params
  })
}

export function getstuInfo(data) {
  return request({
    url: '/stu/info',
    method: 'post',
    data
  })
}

export function addStu(data) {
  return request({
    url: '/stu/add',
    method: 'post',
    data
  })
}

export function delUser(data) {
  return request({
    url: '/user/del',
    method: 'post',
    data
  })
}

export function updatestudent(data) {
  return request({
    url: '/stu/edit',
    method: 'post',
    data
  })
}

export function stueditpwd(data) {
  return request({
    url: '/stu/editpwded',
    method: 'post',
    data
  })
}


export function stuFaceMatched(data) {
  return request({
    url: '/face/matched',
    method: 'post',
    data
  })
}




export function updateImage(stu_id, data) {
  return request({
    url: '/stu/upload-image?stu_id=' + stu_id,
    method: 'post',
    data
  })
}
export function stuGetTeaAttend(data) {
  return request({
    url: '/stu/inforeqattend',
    method: 'post',
    data
  })
}

export function stuAttendLocation(data) {
  return request({
    url: '/reqattend/tarostulocation',
    method: 'post',
    data
  })
}

export function stuJudgeIfEXIST(data) {
  return request({
    url: '/reqattend/tarojudgeifexist',
    method: 'post',
    data
  })
}


export function stuGetAttendRecords(data) {
  return request({
    url: '/face/infoed',
    method: 'post',
    data
  })
}

