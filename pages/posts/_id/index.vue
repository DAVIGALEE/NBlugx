<template>
    <div class="single-post-page">
        <section class="post">
            <h1 class="post-title">{{loadedPost.title}}</h1>
            <div class="post-details">
                <div class="post-detail">Last updated on {{loadedPost.updatedDate}}</div>
                <div class="post-detail">Written By {{loadedPost.author}}</div>
            </div>
            <p>{{loadedPost.content}}</p>
        </section>
        <section class="post-feedback">
            <p class="post-content">feedback,send email <a href="kiladzedato5@gmail.com">kiladzedato5@gmail.com</a></p>
        </section>
    </div>
</template>

<script>

export default {
  asyncData(context,callback){
    setTimeout(()=>{
      callback(null,{
        loadedPost:{   
        id:"1", 
        title: "First Post (ID " + context.params.id + ")", 
        author:"David", 
        updatedDate:new Date(),
        content:'SOME DUMMY DUMMY DUMMY DUMMY DUMMY DUM lorem     lorem isLogin',
        previewText: "lorem ipsum dolor",
        thumbnail: "https://www.computersciencedegreehub.com/wp-content/uploads/2016/02/what-is-coding-1024x683.jpg"
        }
      })
    },1000)
  }
}

</script>




<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}

</style>