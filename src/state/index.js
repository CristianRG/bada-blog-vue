import Vuex from 'vuex'


const store = new Vuex.Store({
    state: {
        blogs: [],
        URL_BASE: process.env.VUE_APP_ORIGIN_SERVER
    },
    mutations: {
        setBlogs(state, blogs) {
            state.blogs = blogs;
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
        }
    },
    actions: {
        addBlogs({ commit }, blogs) {
            commit('addBlogs', blogs);
        },
        updateBlog({ commit }, updatedBlog) {
            commit('updateBlog', updatedBlog);
        },
    },
});

export {
    store
}