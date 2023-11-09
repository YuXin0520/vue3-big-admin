import request from '@/api/request'
//获取分类数据
export const artGetChannelsService = () => request.get('/my/cate/list')
//添加分类请求
export const artAddChannelsService = ({ cate_name, cate_alias }) =>
  request.post('/my/cate/add', { cate_name, cate_alias })
//编辑文字分类
export const artEditChannelsService = (data) =>
  request.put('/my/cate/info', data)
//删除文章分类
export const artDelChannelsService = (id) =>
  request.delete('/my/cate/del', { params: { id } })
//文章
//获取文章列表
export const artGetListService = (params) =>
  request.get('/my/article/list', { params })
//添加文章
export const artPublishService = (data) => request.post('/my/article/add', data)
//编辑文章详情
export const artEditInfoService = (data) =>
  request.put('/my/article/info', data)
//获取文章详情
export const artGetInfoService = (id) =>
  request.get('/my/article/info', { params: { id } })
//删除文章
export const artDelInfoService = (id) =>
  request.delete('/my/article/info', { params: { id } })
