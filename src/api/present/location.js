import request from '@/utils/request'

export function listlocation(params) {
  return request({
    url: '/location/list',
    method: 'get',
    params
  })
}

export function getlocation(params) {
  return request({
    url: '/location/get',
    method: 'get',
    params
  })
}

export function dellocation(data) {
  return request({
    url: '/location/del',
    method: 'post',
    data
  })
}

export function addlocation(data) {
  return request({
    url: '/location/add',
    method: 'post',
    data
  })
}

export function updatelocation(location_id, data) {
  return request({
    url: '/location/edit?location_id=' + location_id,
    method: 'post',
    data
  })
}
