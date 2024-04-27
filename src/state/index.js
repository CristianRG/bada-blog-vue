import Vuex from 'vuex'


const store = new Vuex.Store({
    state: {
        blogs: [],
        URL_BASE: process.env.VUE_APP_ORIGIN_SERVER,
        idSession: ''
    },
    mutations: {
        setBlogs(state, blogs) {
            state.blogs = blogs;
        },
        setIdSession(state, idSession) {
            state.idSession = idSession;
        },
        addBlogs(state, blogs) {
            state.blogs.push(blogs);
        },
        updateBlog(state, updatedBlog) {
            const index = state.blogs.findIndex(blog => blog._id === updatedBlog._id);
            if (index !== -1) {
                // Utiliza Vue.set para actualizar reactivamente el objeto dentro del array
                state.blogs[index] = updatedBlog
            }
        },
        updateActions(state, blog){
            const index = state.blogs.findIndex(blog => blog._id === blog._id);
            if (index!== -1) {
                // Utiliza Vue.set para actualizar reactivamente el objeto dentro del array
                state.blogs[index].likes = blog.likes
                state.blogs[index].dislikes = blog.dislikes
                state.blogs[index].comments = blog.comments
            }
        }
    },
    actions: {
        addBlogs({ commit }, blogs) {
            commit('addBlogs', blogs);
        },
        updateBlog({ commit }, updatedBlog) {
            commit('updateBlog', updatedBlog);
        },
        updateActions({ commit }, blog) {
            commit('updateActions', blog);
        }
    },
});

export {
    store
}