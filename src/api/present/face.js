import request from '@/utils/request'

export function listFace(data) {
  return request({
    url: '/face/list',
    method: 'post',
    data
  })
}

export function FaceInfo(data) {
  return request({
    url: '/face/infoed',
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

