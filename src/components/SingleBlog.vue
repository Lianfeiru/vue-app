<template>
    <div id="single-blog">
        <h1>{{blog.title}}</h1>
        <article>{{blog.content}}</article>
        <p>作者：{{blog.author}}</p>
        <p>分类:</p>
        <ul>
            <li v-for="(category,index) in blog.categories" :key="index">
                {{category}}
            </li>
        </ul>
        <button @click="deleteSingleBlog()">删除博客</button>
        <router-link tag="button" :to="'/edit/'+ id">编辑博客</router-link>
    </div>
</template>

<script>
    import axios from 'axios'
    export default{
        name:"single-blog",
        data(){
            return{
                //通过路由参数拿到id
                id:this.$route.params.id,
                blog:{}
            }
        },
        //请求数据展示内容 
        created(){
            axios.get('/post/' + this.id +".json")
                // .then(function(data){
                //     return data.data;
                //     // console.log(data);
                //     // this.blog = data.body;
                // })
                // .then((data)=>{
                //     this.blog = data;
                // })
                .then((data)=>{
                     this.blog = data.data;
                })
        },
        methods:{
            //删除博客
            deleteSingleBlog(){
                this.$http.delete('https://project-e7eb7.firebaseio.com/post/' + this.id +".json")
                          .then(response =>{
                              //路由传值
                              this.$router.push({path:"/"})
                          })
            }
        }
        
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #single-blog{
        max-width: 960px;
        margin: 0 auto;
        padding: 20px;
        border: 1px dotted #eee;
        background: #eee;
    }
    button{
        margin-left: 5px;
    }
</style>
