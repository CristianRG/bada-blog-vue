<template>
    <div class="post">
        <div class="post-header">
            <img v-if="user.profileImage" :src="user.profileImage" alt="Imagen de Usuario" class="user-img">
            <div class="user-info">
                <h2 class="user-name">{{ user.name }}</h2>
                <p class="post-date">{{ formatDate(post.created) }}</p>
            </div>
        </div>
        <div class="post-content">
            <h3 class="post-title">{{ post.title }}</h3>
            <p class="post-text">{{ post.content }}</p>
            <div class="media-container">
                <img v-for="(media, index) in post.media" :key="index" :src="media.url" :alt="'Media ' + (index + 1)"
                    class="post-media">
            </div>
        </div>
        <div class="post-actions">
            <button class="like-btn" @click="likePost(post._id)">Me gusta ({{ post.likes.length }})</button>
            <button class="dislike-btn" @click="dislikePost(post._id)" >No me gusta ({{ post.dislikes.length }})</button>
            <button class="comment-btn">Comentar ({{ post.comments.length }})</button>
            <button class="share-btn">Compartir</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BlogCard',
    props: {
        post: Object,
        user: Object
    },
    methods: {
        formatDate(dateString) {
            const date = new Date(dateString);
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        },
        async likePost(id) {
            try {
                const response = await this.axios.post(`${this.$store.state.URL_BASE}/api/v1/blog/like`, { id }, { withCredentials: true })

                const blogUpdated = { ...response.data.data, user: { ...response.data.user } }
                this.$store.dispatch('updateBlog', blogUpdated)
            } catch (error) {
                console.log(error)
            }
        },
        async dislikePost(id) {
            try {
                const response = await this.axios.post(`${this.$store.state.URL_BASE}/api/v1/blog/dislike`, { id }, { withCredentials: true })

                const blogUpdated = { ...response.data.data, user: { ...response.data.user } }
                this.$store.dispatch('updateBlog', blogUpdated)
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style>
.post {
    width: 100%;
    height: fit-content;
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.post-header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.user-img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
}

.user-name {
    margin: 0;
    font-size: 18px;
    color: #333;
}

.post-date {
    margin: 0;
    color: #555;
    font-size: 14px;
}

.post-content {
    margin-bottom: 10px;
}

.post-title {
    margin-top: 0;
    color: #333;
    font-size: 20px;
}

.post-text {
    color: #666;
    font-size: 16px;
}

.media-container {
    margin-top: 10px;
}

.post-media {
    width: 100%;
    border-radius: 5px;
    margin-top: 5px;
}

.post-actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 10px;
}

.like-btn,
.dislike-btn,
.comment-btn,
.share-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #4267B2;
    color: #fff;
    cursor: pointer;
    margin-left: 10px;
    transition: background-color 0.3s ease;
}

.like-btn:hover,
.dislike-btn:hover,
.comment-btn:hover,
.share-btn:hover {
    background-color: #405d9b;
}
</style>
