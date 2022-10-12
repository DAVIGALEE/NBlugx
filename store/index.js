import Vuex from 'vuex'
import axios from 'axios'

const createStore = () =>{
    return new Vuex.Store({
        state:{
            loadedPosts:[]
        },
        mutations:{
            setPosts(state, posts){
                state.loadedPosts = posts
            },
            addPost(state,post){
                state.loadedPosts.push(post)
            },
            editPost(state,editedPost){
                const postIndex = state.loadedPosts.findIndex(post=>post.id===editedPost.id)
                state.loadedPosts[postIndex]=editedPost
            }
        },
        actions:{
            nuxtServerInit(vuexContext,ctx) {
                 return axios.get('https://nuxtapp-30d3f-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
                 .then(res=>{
                    const postsArray = []
                    for(const key in res.data){
                        postsArray.push({...res.data[key],id:key})
                    }
                    vuexContext.commit('setPosts',postsArray)
                 })
                 .catch(e=>console.error(e))
                  
            },
        addPost(vuexContext,post){
            const createdPost={
                ...post,
                updatedDate:new Date()
            }
        return axios.post('https://nuxtapp-30d3f-default-rtdb.europe-west1.firebasedatabase.app/posts.json',createdPost)
          .then(res=>{
            vuexContext.commit('addPost',{...createdPost,id: res.data.name})
        }).catch(er=>console.log(er))
    },
            editPost(vuexContext,editedPost){
                return axios.put('https://nuxtapp-30d3f-default-rtdb.europe-west1.firebasedatabase.app/posts/'+editedPost.id+'.json',editedPost)
                .then(res=>{
                    vuexContext.commit('editPost',editedPost)
                })
                .catch(er=>console.log(er))
            
            },
            setPosts(context,posts){
                context.commit('setPosts',posts)
            }

        },
        getters:{
            loadedPosts(state){
                return state.loadedPosts
            }
        }
    })
}

export default createStore