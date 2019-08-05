<template>
  <div v-theme:column="'wide'" id="show-blogs">
      <h1>博客总览</h1>
      <input type="text" v-model="search" placeholder="搜索博客">
      <!-- 通过遍历filteredBlogs 数组触发事件 -->
      <div v-for="(blog,index) in filteredBlogs" :key="index" class="single-blog">
          <!-- 路由跳转/blog/id   v-bind绑定内容：singleblog可以拿到prams.id-->
          <router-link v-bind:to="'/blog/'+blog.id"><h2 v-rainbow>{{blog.title | toUpperCase}}</h2></router-link>
          <article>
              {{blog.content | snippent}}
          </article>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'show-blogs',
  data(){
      return{
          blogs:[],
          search:""
      }
  },
  created(){
    //   this.$http.get('https://project-e7eb7.firebaseio.com/post.json')
   axios.get('/post.json')
          .then(function(data){
              //将请求的数据解析
            //   return data.json();
             //   console.log(data.json());
            //使用axios请求的数据并不需要return一个json
            return data.data;

           //使用jsonplaceholder
            // this.blogs = data.body.slice(0,10);
            // console.log(this.blogs);
          })
          //返回的数据用data接收
          .then((data)=>{
            var blogsArray = [];
            for(let key in data){
                //增加id属性，将唯一标识key值赋给key
                data[key].id = key;
                blogsArray.push(data[key]);
                // console.log(key);
                // console.log(data[key]);
            }
             this.blogs = blogsArray;
            console.log(blogsArray);
            // console.log(this.blogs);
          })
  },
  computed:{
  	filteredBlogs:function(){
  		return this.blogs.filter((blog) =>{
  			return blog.title.match(this.search);
  		})
  	}
  },
  //自定义过滤器(local api)
  filters:{
    //   "to-uppercase":function(value){
    //       return value.toUpperCase();
    //   }
      //另一种方法
      toUpperCase(value){
          return value.toUpperCase();
      }
  },

  //自定义指令(局部)
  directives:{
      'rainbow':{
          bind(el,binding,vnode){
              el.style.color ="#" + Math.random().toString(16).slice(2,8);
          }
      }
  }
}
</script>

<style>
    #show-blogs{
        max-width: 800px;
        margin: 0 auto;
    }

    .single-blog{
        padding: 20px;
        margin: 20px 0;
        box-sizing: border-box;
        background: #ccc;
        border: 1px dotted #aaa;
    }

    #show-blogs a{
        text-decoration: none;
    }

    input[type="text"]{
        padding: 8px;
        width: 100%;
        box-sizing: border-box;
    }
</style>
