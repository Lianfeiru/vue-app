<template>
  <div id="add-blog">
     
      <form v-if="!submitted">
           <h2>添加博客</h2>
          <label>博客标题</label>
          <input type="text" v-model="blog.title" required>
          <label>博客内容</label>
          <textarea v-model="blog.content"></textarea>

          <div class="checkboxes">
              <p>博客分类</p>
              <label>Vue.js</label>
              <input type="checkbox" value="Vue.js" v-model="blog.categories">
              <label>Node.js</label>
              <input type="checkbox" value="Node.js" v-model="blog.categories">
              <label>React.js</label>
              <input type="checkbox" value="React.js" v-model="blog.categories">
              <label>Angular4.js</label>
              <input type="checkbox" value="Angular4.js" v-model="blog.categories">
          </div>

          <label>作者</label>
          <select  v-model="blog.author">
              <option v-for="(author,index) in authors" :key="index" >
                  {{author}}
              </option>
          </select>
          
          <!-- prevent:阻止刷新页面 -->
          <button @click.prevent="post">添加博客</button>
      </form>

      <div v-if="submitted">
          <h2>您的博客发布成功</h2>
      </div>
      
      <div id="preview" v-if="submitted">
          <h3>博客总览</h3>
          <p>博客标题 :{{ blog.title}}</p>
          <p>博客内容 :</p>
          <p>{{blog.content}}</p>
          <p>博客分类 :</p>
          <ul>
              <li v-for="(category,index) in blog.categories" :key="index">
                  {{category}}
              </li>
          </ul>
          <p>作者 ：{{blog.author}}</p>

      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'add-blog',
  data(){
      return{
          blog:{
              title:'',
              content:'',
              categories:[],
              author:"",
          },
          authors:["Mike","Henry","Damao"],
          submitted:false
      }
  },
  methods:{
      //使用http请求，将数据post到jsonplaceholder
      //http://jsonplaceholder.typicode.com/posts
      post:function(){
          //把数据post到firebase数据库当中去，然后需要创建一个post.json文件，vue会自动帮我们创建好这样的一个文件
        //   this.$http.post("https://project-e7eb7.firebaseio.com/post.json",this.blog)
        //axios替换vue-resource
    //    var _this = this;
       axios.post("/post.json",this.blog)
            .then((data)=>{
                // console.log(data);
                this.submitted = true;
            })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#add-blog *{
    box-sizing: border-box;
}
#add-blog{
    margin: 20px auto;
    max-width: 600px;
    padding: 20px;
}
label{
    display: block;
    margin: 20px 0 10px;
}
input[type="text"],textarea,select{
    display: block;
    width: 100%;
    padding: 8px;
}

textarea{
    height: 200px;
}

.checkboxes label{
    display:inline-block;
    margin-top: 0;
}
.checkboxes input{
    display: inline-block;
    margin-right:10px;
}
button{
    display: block;
    margin: 20px 0;
    background: crimson;
    color:#fff;
    border: 0;
    padding: 14px;
    border-radius: 4px;
    font-size: 18px;
    cursor: pointer;
}

#preview{
    padding: 10px 20px;
    border: 1px dotted #ccc;
    margin: 30px 0;
}
h3{
    margin-top: 10px;
}
</style>
