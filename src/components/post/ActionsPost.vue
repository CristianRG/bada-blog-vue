<template>
    <div class="post-actions">
        <button class="like-btn" @click="likePost(post._id)">
            <font-awesome-icon :icon="['fas', 'heart']" />
            ({{ post.likes.length }})
        </button>
        <button class="dislike-btn" @click="dislikePost(post._id)">No me gusta ({{ post.dislikes.length }})</button>
        <button class="comment-btn" @click="showCommentSection()">Comentar ({{ post.comments.length }})</button>
        <button class="share-btn">Compartir</button>
    </div>
    <div class="post-comment" v-if="commentSection">
        <div class="form-floating d-flex gap-2">
            <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"
                style="height: 50px;" ref="commentInput"></textarea>
            <label for="floatingTextarea">Comments</label>
            <button class="btn btn-outline-primary" @click="addComment(post._id)">Comentar</button>
        </div>
    </div>
    <div class="post-comments">
        <CommentCard v-if="(showInitialComment && post.comments.length > 0)" :comment="post.comments[0]" />
        <div v-if="showMoreComments">
            <CommentCard v-for="(comment, index) in remainingComments" :key="index" :comment="comment" />
            <a @click="showMoreComments = false">Mostrar menos</a>
        </div>
        <a v-else @click="showMoreComments = true">Mostrar más</a>
    </div>
</template>
<script>
import CommentCard from '@/components/post/CommentCard.vue'
import { getTokenFromCookie } from '@/middleware/auth'
export default {
    name: 'ActionsPost',
    components: {
        CommentCard
    },
    props: {
        post: Object
    },
    methods: {
        async likePost(id) {
            try {
                this.isInSession = await this.checkSession()
                if (this.isInSession) {
                    const response = await this.axios.post(`${this.$store.state.URL_BASE}/api/v1/blog/like`, { id }, { withCredentials: true })

                    const blogUpdated = { ...response.data.data, user: { ...response.data.user } }
                    this.$store.dispatch('updateBlog', blogUpdated)
                }
                else {
                    this.$emit('sessionCard')
                }
            } catch (error) {
                console.log(error)
            }
        },
        async dislikePost(id) {
            try {
                this.isInSession = await this.checkSession()
                if (this.isInSession) {
                    const response = await this.axios.post(`${this.$store.state.URL_BASE}/api/v1/blog/dislike`, { id }, { withCredentials: true })

                    const blogUpdated = { ...response.data.data, user: { ...response.data.user } }
                    this.$store.dispatch('updateBlog', blogUpdated)
                }
                else {
                    this.$emit('sessionCard')
                }
            } catch (error) {
                console.log(error)
            }
        },
        async addComment(id) {
            try {
                this.isInSession = await this.checkSession()
                if (this.isInSession) {
                    const response = await this.axios.post(`${this.$store.state.URL_BASE}/api/v1/blog/comment`, { id, content: this.$refs.commentInput.value }, { withCredentials: true })
                    const blogUpdated = { ...response.data.data, user: { ...response.data.user } }
                    this.$store.dispatch('updateBlog', blogUpdated)
                    this.$refs.commentInput.value = ''
                    this.showCommentSection()
                }
                else {
                    this.$emit('sessionCard')
                }
            } catch (error) {
                console.log(error)
            }
        },
        showCommentSection() {
            this.commentSection = !this.commentSection
        },
        async checkSession() {
            try {
                const token = getTokenFromCookie()
                const response = await this.axios.post(`${this.$store.state.URL_BASE}/api/v1/blog/auth`, { token })
                return response.status == 200
            } catch (error) {
                return false
            }
        }
    }
}
</script>