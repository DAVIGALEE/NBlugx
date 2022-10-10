import Vuex from 'vuex'

const createStore = () =>{
    return new Vuex.Store({
        state:{
            loadedPosts:[]
        },
        mutations:{
            setPosts(state, posts){
                state.loadedPosts = posts
            }
        },
        actions:{
            nuxtServerInit(vuexContext,ctx) {
                    return new Promise((resolve,reject)=>{ 
                      setTimeout(()=>{
                        vuexContext.commit('setPosts',[
                            {
                            id:"1", 
                            title: "First Post", 
                            previewText: "lorem ipsum dolor",
                            thumbnail: "https://www.computersciencedegreehub.com/wp-content/uploads/2016/02/what-is-coding-1024x683.jpg"
                            },
                            {
                            id:"2", 
                            title: "Second Post", 
                            previewText: "lorem ipsum dolor2",
                            thumbnail: "https://www.computersciencedegreehub.com/wp-content/uploads/2016/02/what-is-coding-1024x683.jpg"
                            },
                          ]
                        )
                       resolve()
                          
                      },0)})
                  
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