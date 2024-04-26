<template>
    <meta name="keywords" content="blog, soundscape, posts, principal">
    <meta name="description" content="¡Bienvenido a nuestro blog oficial! Ven y comparte con nosotros tus gustos musicales">
    <div class="container-fluid" id="mainApp" v-if="this.$route.name === 'Main'" >
        <div class="side-bar">
            <SideBar />
        </div>
        <div class="content">
            <ContainerPosts style="width: 70%;" @sessionCard="showSessionCard = true"/>
        </div>
        <SessionCard 
        v-if="showSessionCard"
        style="z-index: 100; position: absolute; bottom: 0%; width: auto;" @close="showSessionCard = false"/>
    </div>
    <router-view></router-view>
</template>

<script>
import SideBar from '@/components/blog/SideBar.vue'
import ContainerPosts from '@/components/blog/ContainerPosts.vue'
import { getTokenFromCookie } from '@/middleware/auth';
import SessionCard from '@/components/common/SessionCard.vue';
export default {
    name: "MainBlog",
    components: {
        SideBar,
        ContainerPosts,
        SessionCard
    },
    data() {
        return {
            isInSession: false,
            showSessionCard: false
        }
    },
    methods: {
        async checkSession(){
            try {
                const token = getTokenFromCookie()
                const response = await this.axios.post(`${this.$store.state.URL_BASE}/api/v1/blog/auth`, {token})
                this.isInSession = response.status == 200 ? true : false
            } catch (error) {
                this.isInSession = false
            }
            return this.isInSession
        }
    },
    mounted() {
        setTimeout(async() => {
            await this.checkSession()
            this.showSessionCard = !this.isInSession
        }, 2000)
    }
}
</script>

<style scoped>
    #mainApp {
        display: grid;
        height: 100vh;
        grid-template-columns: 1rem 1fr;
    }

    .content {
        grid-column: 2;
        display: flex;
        width: 100%;
        justify-content: center;
        margin-top: .5rem;
        overflow-y: scroll;
    }

    .side-bar {
        grid-column: 1;
        width: 100%;
        display: flex;
        justify-content: center;
        z-index: 1000;
    }
</style>