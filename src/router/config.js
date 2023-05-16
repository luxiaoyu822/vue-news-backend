const routes = [
  {
    path: 'index',
    component: () => import('@/views/home/Home'),
  },
  {
    path: 'center',
    component: () => import('@/views/center/Center'),
  },
  {
    path: 'user-manage/adduser',
    component: () => import('@/views/user-manage/UserAdd'),
  },
  {
    path: 'user-manage/userlist',
    component: () => import('@/views/user-manage/UserList'),
  },
  {
    path: 'news-manage/addnews',
    component: () => import('@/views/news-manage/NewsAdd'),
  },
  {
    path: 'news-manage/newslist',
    component: () => import('@/views/news-manage/NewsList'),
  },
  {
    path: 'product-manage/addproduct',
    component: () => import('@/views/product-manage/ProductAdd'),
  },
  {
    path: 'product-manage/productlist',
    component: () => import('@/views/product-manage/ProductList'),
  },
]
export default routes
