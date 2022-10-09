<template>
    <section class="post-list" >
      <PostPreview id="1" 
      :is-admin="isAdmin"
      thumbnail="https://www.computersciencedegreehub.com/wp-content/uploads/2016/02/what-is-coding-1024x683.jpg"
      title="Coding"
      previewText="Coding is important for the future"
      />
      <PostPreview id="2" 
      :is-admin="isAdmin"
      thumbnail="https://www.computersciencedegreehub.com/wp-content/uploads/2016/02/what-is-coding-1024x683.jpg"
      title="Coding is cool"
      previewText="Coding is important for the future"
      />
      <PostPreview id="3" 
      :is-admin="isAdmin"
      thumbnail="https://www.computersciencedegreehub.com/wp-content/uploads/2016/02/what-is-coding-1024x683.jpg"
      title="Coding is not harmful"
      previewText="Coding is important for the development"
      />
    </section>
</template>

<script>
import PostPreview from '@/components/Posts/PostPreview'

export default {
  components:{
    PostPreview
  },
  props:{
    isAdmin:{
      type:Boolean,
      default:false
    }
  }
}
</script>

<style scoped>
.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

</style>