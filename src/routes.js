/* 路由代码抽离 */
import ShowBlogs from './components/ShowBlogs.vue'
import AddBlog from './components/AddBlog.vue'
import SingleBlog from './components/SingleBlog.vue'
import EditBlog from './components/EditBlog.vue'

export default[
    {path:'/',component:ShowBlogs},
    {path:'/add',component:AddBlog},
    //路由参数  跳转路由参数之后执行的组件SingleBlog
    {path:'/blog/:id',component:SingleBlog},
    {path:'/edit/:id',component:EditBlog}

]