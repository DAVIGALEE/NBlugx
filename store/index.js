import Vuex from 'vuex'
import axios from 'axios'
import Cookie from 'js-cookie'

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: [],
            token:null,
        },
        mutations: {
            setPosts(state, posts) {
                state.loadedPosts = posts
            },
            addPost(state, post) {
                state
                    .loadedPosts
                    .push(post)
            },
            editPost(state, editedPost) {
                const postIndex = state
                    .loadedPosts
                    .findIndex(post => post.id === editedPost.id)
                state.loadedPosts[postIndex] = editedPost
            },
            setToken(state,token){
                state.token = token
            },
            clearToken(state){
                state.token=null;
               // localStorage.setItem('token',undefined)
            }
        },
        actions: {
            nuxtServerInit(vuexContext, ctx) {
                return axios
                    .get(
                        'https://nuxtapp-30d3f-default-rtdb.europe-west1.firebasedatabase.app/posts.jso' +
                        'n'
                    )
                    .then(res => {
                        const postsArray = []
                        for (const key in res.data) {
                            postsArray.push({
                                ...res.data[key],
                                id: key
                            })
                        }
                        vuexContext.commit('setPosts', postsArray)
                    })
                    .catch(e => console.error(e))

                },
            addPost(vuexContext, post) {
                const createdPost = {
                    ...post,
                    updatedDate: new Date()
                }
                return axios
                    .post(
                        'https://nuxtapp-30d3f-default-rtdb.europe-west1.firebasedatabase.app/posts.json?auth=' + vuexContext.state.token,
                        createdPost
                    )
                    .then(res => {
                        vuexContext.commit('addPost', {
                            ...createdPost,
                            id: res.data.name
                        })
                    })
                    .catch(er => console.log(er))
                },
            editPost(vuexContext, editedPost) {
                return axios
                    .put(
                        'https://nuxtapp-30d3f-default-rtdb.europe-west1.firebasedatabase.app/posts/' +
                         editedPost.id + '.json?auth=' + vuexContext.state.token,
                         editedPost
                    )
                    .then(res => {
                        vuexContext.commit('editPost', editedPost)
                    })
                    .catch(er => console.log(er))

                },
            setPosts(context, posts) {
                context.commit('setPosts', posts)
            },
            authenticateUser(vuexContext,authData){
                let key = process.env.apiKey
                let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`
                if(!authData.isLogin){
                     url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`
                 }
             return axios.post(url,
                {
                email:authData.email,
                password:authData.password,
                returnSecureToken:true
                }).then(res=>{
                    console.log(res.data.expiresIn)
                        vuexContext.commit('setToken',res.data.idToken)
                        localStorage.setItem('token',res.data.idToken)
                        localStorage.setItem('tokenExpiration',new Date().getTime + Number.parseInt(res.data.expiresIn)*1000)
                        Cookie.set('jwt',+res.data.idToken)
                        Cookie.set('expirationDate',new Date().getTime + Number.parseInt(res.data.expiresIn)*1000)
                        //vuexContext.dispatch('setLogoutTimer',res.data.expiresIn*1000)
                    
                    }).catch(e=>{console.log(e)})
            },
            initAuth(vuexContext, req) {
                let token;
                let expirationDate;
                if (req) {
                  if (!req.headers.cookie) {
                    return;
                  }
                  const jwtCookie = req.headers.cookie
                    .split(";")
                    .find(c => c.trim().startsWith("jwt="));
                  if (!jwtCookie) {
                    return;
                  }
                  token = jwtCookie.split("=")[1];
                  expirationDate = req.headers.cookie
                    .split(";")
                    .find(c => c.trim().startsWith("expirationDate="))
                    .split("=")[1];
                } else {
                  token = localStorage.getItem("token");
                  expirationDate = localStorage.getItem("tokenExpiration");
                }
                if (new Date().getTime() > +expirationDate || !token) {
                  console.log("No token or invalid token");
                  vuexContext.dispatch("logout");
                  return;
                }
                vuexContext.commit("setToken", token);
              },
              logout(vuexContext) {
                vuexContext.commit("clearToken");
                Cookie.remove("jwt");
                Cookie.remove("expirationDate");
                if (process.client) {
                  localStorage.removeItem("token");
                  localStorage.removeItem("tokenExpiration");
                }
              }

        },
        getters: {
            loadedPosts(state) {
                return state.loadedPosts
            },
            isAuthenticated(state){
                return state.token != null;
            }
        }
    })
}

export default createStore