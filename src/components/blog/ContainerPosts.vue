<template>
    <div class="container-fluid" id="container-blogs" ref="container">
        <PostCard v-for="post in blogs" :key="post._id" :post="post" :user="post.user"
            @sessionCard="this.$emit('sessionCard')"
            class="animate__animated animate__backInUp"/>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import PostCard from '@/components/post/PostCard.vue'
export default {
    name: 'ContainerPosts',
    components: {
        PostCard
    },
    computed: {
        ...mapState(['blogs'])
    },
    data() {
        return {
            instance: null,
            blogsList: []
        }
    },
    methods: {
        getBlogs: async function () {
            try {
                let response = await this.axios.get(`${this.$store.state.URL_BASE}/api/v1/blog/list`)
                this.blogsList = response.data.data
                await this.loadUsersForBlogs()
            } catch (error) {
                console.log(error)
                this.instance = this.$toast.error("Error to load blogs...", { duration: 3000 })
            }
        },
        loadUsersForBlogs: async function () {
            const promises = this.blogsList.map(async blog => {
                if (blog.author) {
                    const user = await this.getUser(blog.author)
                    return { ...blog, user }
                } else {
                    return blog
                }
            })
            const result = await Promise.all(promises)
            this.$store.commit('setBlogs', result)
            this.scrollToBottom(); // Llama a scrollToBottom después de cargar los blogs
        },
        getUser: async function (id) {
            try {
                let response = await this.axios.get(`${this.$store.state.URL_BASE}/api/v1/blog/user?id=${id}`)
                return response.data.data
            } catch (error) {
                this.instance = this.$toast.error("Error to load user...", { duration: 3000 })
                console.log(error)
                return null
            }
        },
        scrollToBottom: function () {
            // Obtiene el elemento contenedor
            const container = this.$refs.container;
            // Hace scroll hacia abajo
            container.scrollTop = container.scrollHeight;

        }
    },
    mounted() {
        this.getBlogs()
    },
    watch: {
        // Hace scroll hacia abajo cada vez que se actualizan los posts
        blogs() {
            this.$nextTick(() => {
                this.scrollToBottom();
            });
        }
    }
}
</script>

<style scoped>
.container-blogs {
    display: flex;
    flex-direction: column;
}
</style>