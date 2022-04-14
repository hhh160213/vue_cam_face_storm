import request from '@/utils/request'

export function listRandom(params) {
  return request({
    url: '/random/list',
    method: 'get',
    params
  })
}

export function addRandom(data) {
  return request({
    url: '/random/add',
    method: 'post',
    data
  })
}

export function delRandom(data) {
  return request({
    url: '/random/del',
    method: 'post',
    data
  })
}

export function updateRandom(Random_id, data) {
  return request({
    url: '/random/edit?Random_id=' + Random_id,
    method: 'post',
    data
  })
}

export function updatePwd(Random_id, data) {
  return request({
    url: '/random/edit-pwd?Random_id=' + Random_id,
    method: 'post',
    data
  })
}
