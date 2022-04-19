import request from '@/utils/request'

export function listtea(params) {
  return request({
    url: '/tea/list',
    method: 'post',
    params
  })
}

export function geteainfo(data) {
  return request({
    url: '/tea/info',
    method: 'post',
    data
  })
}

export function addtea(data) {
  return request({
    url: '/tea/add',
    method: 'post',
    data
  })
}

export function addteaByUser(data) {
  return request({
    url: '/tea/addteabyuser',
    method: 'post',
    data
  })
}
export function sendTEaEmail(data) {
  return request({
    url: '/tea/sendmailtea',
    method: 'post',
    data
  })
}



export function Teaeditpwd(data) {
  return request({
    url: '/tea/editpwded',
    method: 'post',
    data
  })
}


export function addstu(data) {
  return request({
    url: '/stu/add',
    method: 'post',
    data
  })
}



export function updatetea(data) {
  return request({
    url: '/tea/edit',
    method: 'post',
    data
  })
}


export function getTeaReqAttend(data) {
  return request({
    url: '/reqattend/tarosearch',
    method: 'post',
    data
  })
}

export function TeaAddReqAttend(data) {
  return request({
    url: '/reqattend/taroadd',
    method: 'post',
    data
  })
}


export function DelTeaReqAttend(data) {
  return request({
    url: '/reqattend/taroteadelAttend',
    method: 'post',
    data
  })
}


export function DelTeaOUtdatedReqAttend(data) {
  return request({
    url: '/reqattend/tarodeloutdate',
    method: 'post',
    data
  })
}


export function DetailAttend(data) {
  return request({
    url: '/reqattend/TeaGetStudetailAttendDo',
    method: 'post',
    data
  })
}


export function DetailAttendAllTotal(data) {
  return request({
    url: '/reqattend/TeaGetStudetailAttendDoTotal',
    method: 'post',
    data
  })
}


