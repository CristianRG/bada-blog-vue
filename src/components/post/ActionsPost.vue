<template>
    <div class="post-actions">
        <button class="like-btn" @click="likePost(post._id)" ref="likeBtn" :class="liked(post)">
            <svg xmlns="http://www.w3.org/2000/svg" height="18px" width="18px" style="fill: white;" viewBox="0 0 512 512">>
                <path
                    d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
            </svg>
            {{ post.likes.length }}
        </button>
        <button class="dislike-btn" @click="dislikePost(post._id)" ref="dislikeBtn" :class="disliked(post)">
            <svg xmlns="http://www.w3.org/2000/svg" height="18px" width="18px" style="fill: white;" viewBox="0 0 512 512">
                <path
                    d="M119.4 44.1c23.3-3.9 46.8-1.9 68.6 5.3l49.8 77.5-75.4 75.4c-1.5 1.5-2.4 3.6-2.3 5.8s1 4.2 2.6 5.7l112 104c2.9 2.7 7.4 2.9 10.5 .3s3.8-7 1.7-10.4l-60.4-98.1 90.7-75.6c2.6-2.1 3.5-5.7 2.4-8.8L296.8 61.8c28.5-16.7 62.4-23.2 95.7-17.6C461.5 55.6 512 115.2 512 185.1v5.8c0 41.5-17.2 81.2-47.6 109.5L283.7 469.1c-7.5 7-17.4 10.9-27.7 10.9s-20.2-3.9-27.7-10.9L47.6 300.4C17.2 272.1 0 232.4 0 190.9v-5.8c0-69.9 50.5-129.5 119.4-141z" />
            </svg>
            {{ post.dislikes.length }}
        </button>
        <button class="comment-btn" @click="showCommentSection()">
            <svg xmlns="http://www.w3.org/2000/svg" height="18px" width="18px" style="fill: white;" viewBox="0 0 512 512">
                <path
                    d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z" />
            </svg>
            {{ post.comments.length }}
        </button>
        <button class="share-btn">
            <svg xmlns="http://www.w3.org/2000/svg" height="18px" width="18px" style="fill: white;" viewBox="0 0 576 512">
                <path
                    d="M400 255.4V240 208c0-8.8-7.2-16-16-16H352 336 289.5c-50.9 0-93.9 33.5-108.3 79.6c-3.3-9.4-5.2-19.8-5.2-31.6c0-61.9 50.1-112 112-112h48 16 32c8.8 0 16-7.2 16-16V80 64.6L506 160 400 255.4zM336 240h16v48c0 17.7 14.3 32 32 32h3.7c7.9 0 15.5-2.9 21.4-8.2l139-125.1c7.6-6.8 11.9-16.5 11.9-26.7s-4.3-19.9-11.9-26.7L409.9 8.9C403.5 3.2 395.3 0 386.7 0C367.5 0 352 15.5 352 34.7V80H336 304 288c-88.4 0-160 71.6-160 160c0 60.4 34.6 99.1 63.9 120.9c5.9 4.4 11.5 8.1 16.7 11.2c4.4 2.7 8.5 4.9 11.9 6.6c3.4 1.7 6.2 3 8.2 3.9c2.2 1 4.6 1.4 7.1 1.4h2.5c9.8 0 17.8-8 17.8-17.8c0-7.8-5.3-14.7-11.6-19.5l0 0c-.4-.3-.7-.5-1.1-.8c-1.7-1.1-3.4-2.5-5-4.1c-.8-.8-1.7-1.6-2.5-2.6s-1.6-1.9-2.4-2.9c-1.8-2.5-3.5-5.3-5-8.5c-2.6-6-4.3-13.3-4.3-22.4c0-36.1 29.3-65.5 65.5-65.5H304h32zM72 32C32.2 32 0 64.2 0 104V440c0 39.8 32.2 72 72 72H408c39.8 0 72-32.2 72-72V376c0-13.3-10.7-24-24-24s-24 10.7-24 24v64c0 13.3-10.7 24-24 24H72c-13.3 0-24-10.7-24-24V104c0-13.3 10.7-24 24-24h64c13.3 0 24-10.7 24-24s-10.7-24-24-24H72z" />
            </svg>
        </button>
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
    data() {
        return {
            commentSection: false,
            showMoreComments: false,
            showInitialComment: true
        }
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
                    this.$store.dispatch('updateActions', blogUpdated)
                }
                else {
                    this.$emit('sessionCard')
                }
            } catch (error) {
                if (error.response.data.status == 401) {
                    this.$emit('sessionCard')
                }
            }
        },
        async dislikePost(id) {
            try {
                this.isInSession = await this.checkSession()
                if (this.isInSession) {
                    const response = await this.axios.post(`${this.$store.state.URL_BASE}/api/v1/blog/dislike`, { id }, { withCredentials: true })

                    const blogUpdated = { ...response.data.data, user: { ...response.data.user } }
                    this.$store.dispatch('updateActions', blogUpdated)
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
        },
        liked(post){
            const likes = post.likes.findIndex(like => like == this.$store.state.idSession)
            if(likes == -1){
                return ''
            }
            return 'liked'
        },
        disliked(post){
            const likes = post.dislikes.findIndex(dislike => dislike == this.$store.state.idSession)
            if(likes == -1){
                return ''
            }
            return 'disliked'
        }
    },
    computed: {
        remainingComments() {
            return this.post.comments.slice(1)
        }
    }
}
</script>
<style scoped>
.post-actions {
    width: 100%;
    height: fit-content;
    margin-top: 10px;
    display: flex;
    justify-content: end;
    gap: 10px;
}

.like-btn,
.dislike-btn,
.comment-btn,
.share-btn {
    margin: 0;
    width: fit-content;
    height: 2rem;
    display: flex;
    align-items: center;
    gap: 2px;
    padding: 10px 20px;
    border: 1px solid white;
    border-radius: 30px;
    background-color: #00000000;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.liked{
    background-color: red;
}

.disliked{
    background-color: blue;
}

.post-comment{
    margin-top: 10px;
}

.post-comments {
  margin-top: 10px;
}
</style>