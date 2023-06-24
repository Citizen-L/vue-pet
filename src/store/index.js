import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        // uid: JSON.parse(localStorage.getItem("uid")),
        uid: window.sessionStorage.getItem('uid'),
        //是否显示登录注册界面
        show:false,
        //是否显示登录页面
        logshow:false,
        //是否显示注册页面
        regshow:false,
        //是否显示聊天页面
        showchat:false,
        //用户头像地址
        avatar:window.sessionStorage.getItem('avatar'),
        buypage:window.sessionStorage.getItem('buypage'),
        sellpage:window.sessionStorage.getItem('sellpage'),
        /*
        这段代码是用来从 sessionStorage 中获取当前用户的头像地址、购买页面地址和出售页面地址，并存放在 Vuex store 的状态管理中。这样做的好处是，当我们在不同的组件中需要使用这些数据时，可以直接从 Vuex store 中获取，而不必每次都从 sessionStorage 中获取，避免了重复的代码和逻辑实现。
         */
        websocketnotice:null,
        // 存储token
        Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''

    },
    mutations:{
        setuid(state,data){
            state.uid = data
            window.sessionStorage.setItem('uid',data)
        },
        setavatar(state,data){
            state.avatar = data
            window.sessionStorage.setItem('avatar',data)
        },
        setbuypage(state,data){
            state.buypage = data
            window.sessionStorage.setItem('buypage',data)
        },
        setsellpage(state,data){
            state.sellpage = data
            window.sessionStorage.setItem('sellpage',data)
        },
        setwebscoketnotice(stata,data){
            stata.setwebscoketnotice = data
        },
        // 修改token，并将token存入localStorage
        changeLogin (state, user) {
            state.Authorization = user.Authorization;
            localStorage.setItem('Authorization', user.Authorization);
        }

    },
    actions:{},
    modules:{}
})

export default store