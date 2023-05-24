const routes = [
  {
    path: '/index',
    component: () => import('@/views/home/Home'),
  },
  {
    path: '/center',
    component: () => import('@/views/center/Center'),
  },
  {
    path: '/',
    redirect: 'index',
  },
  {
    path: '/user-manage/adduser',
    component: () => import('@/views/user-manage/UserAdd'),
    requireAdmin: true,
  },
  {
    path: '/user-manage/userlist',
    component: () => import('@/views/user-manage/UserList'),
    requireAdmin: true,
  },
  {
    path: '/news-manage/addnews',
    component: () => import('@/views/news-manage/NewsAdd'),
  },
  {
    path: '/news-manage/newslist',
    component: () => import('@/views/news-manage/NewsList'),
  },
  {
    path: '/news-manage/editnews/:id',
    component: () => import('@/views/news-manage/NewsEdit'),
  },
  {
    path: '/product-manage/addproduct',
    component: () => import('@/views/product-manage/ProductAdd'),
  },
  {
    path: '/product-manage/productlist',
    component: () => import('@/views/product-manage/ProductList'),
  },
  {
    path: '/product-manage/editproduct/:id',
    component: () => import('@/views/product-manage/ProductEdit'),
  },
]
export default routes
