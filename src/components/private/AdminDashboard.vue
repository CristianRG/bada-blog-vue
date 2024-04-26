<template>
    <NavBar :items="items"/>    
    <router-view>
    </router-view>
    <button v-if="showFloatingButton" class="btn btn-primary floating-button" id="floating-button"
        @click="showNewPostModal">
        <span class="material-symbols-outlined">
            add
        </span>
    </button>
    <div class="new-post">
        <NewPost v-if="showNewPost" @new-post="addedNewPost()" />
    </div>
</template>

<script>
import NavBar from '../navbar/NavBar.vue';
import NewPost from './NewPost.vue';
export default {
    name: 'AdminDashboard',
    components: {
        NavBar,
        NewPost
    },
    data() {
        return {
            items: [{ url: 'dashboard/posts', name: 'posts' }, { url: 'dashboard/analisis', name: 'analisis' }, {url: 'dashboard', name: 'dashboard'}],
            showFloatingButton: false,
            showNewPost: false,
            post: null
        }
    },
    created() {
        this.checkFloatingButtonVisibility();
    },
    watch: {
        $route: 'checkFloatingButtonVisibility'
    },
    methods: {
        checkFloatingButtonVisibility() {
            this.showFloatingButton = this.$route.name === 'Posts';
        },
        showNewPostModal() {
            this.showNewPost = !this.showNewPost;
        },
        addedNewPost() {
            
            this.showNewPostModal()
            
        }
    }
}
</script>
<style scoped>
#floating-button {
    width: fit-content;
    height: fit-content;
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 10;
}

.new-post {
    border-radius: 5px;
    position: fixed;
    bottom: 20px;
    right: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    z-index: 1000;
}
</style>