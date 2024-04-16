<template>
    <div class="post">
      <div class="post-header">
        <img :src="showProfileImage()" alt="Imagen de Usuario" class="user-img" style="background: white; padding: 5px;">
        <div class="user-info">
          <h2 class="user-name" style="color: white; font-size: 12px;">{{ user.name }}</h2>
          <p class="post-date" style="color: white; font-size: 10px;">{{ formatDate(post.created) }}</p>
        </div>
      </div>
      <div class="post-content">
        <h3 class="post-title" style="color: white; font-size: 20px; font-weight: bold;">{{ post.title }}</h3>
        <p class="post-text" style="color: white; font-size: 16px;">{{ post.content }}</p>
        <div class="media-container">
          <img v-for="(media, index) in post.media" :key="index" :src="showMedia(index)" :alt="'Media ' + (index + 1)" class="post-media">
        </div>
      </div>
      <div class="post-actions">
        <button class="like-btn" @click="likePost(post._id)">Me gusta ({{ post.likes.length }})</button>
        <button class="dislike-btn" @click="dislikePost(post._id)">No me gusta ({{ post.dislikes.length }})</button>
        <button class="comment-btn" @click="showCommentSection()">Comentar ({{ post.comments.length }})</button>
        <button class="share-btn">Compartir</button>
      </div>
      <div class="post-comment" v-if="commentSection">
        <div class="form-floating d-flex gap-2">
          <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea" style="height: 50px;" ref="commentInput"></textarea>
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
    </div>
  </template>
  
  <script>
  import CommentCard from '@/components/common/CommentCard.vue'
  export default {
    name: 'BlogCard',
    components: {
      CommentCard
    },
    props: {
      post: Object,
      user: Object
    },
    data() {
      return {
        commentSection: false,
        showMoreComments: false,
        showInitialComment: true
      }
    },
    computed: {
      remainingComments() {
        return this.post.comments.slice(1)
      }
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
      },
      showProfileImage() {
        if (this.user && this.user.profileImage) {
          return `data:image/png;base64,${this.user.profileImage}`;
        } else {
          return ''; // O cualquier imagen predeterminada
        }
      },
      showMedia(index) {
        if (this.post && this.post.media && this.post.media.length > 0) {
          return `data:image/png;base64,${this.post.media[index]}`;
        } else {
          return '';
        }
      },
      async addComment(id) {
        try {
          const response = await this.axios.post(`${this.$store.state.URL_BASE}/api/v1/blog/comment`, { id, content: this.$refs.commentInput.value }, { withCredentials: true })
          const blogUpdated = { ...response.data.data, user: { ...response.data.user } }
          this.$store.dispatch('updateBlog', blogUpdated)
          this.$refs.commentInput.value = ''
          this.showCommentSection()
        } catch (error) {
          console.log(error)
        }
      },
      showCommentSection() {
        this.commentSection = !this.commentSection
      }
    },
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
    width: 35px;
    height: 35px;
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
    display: flex;
    flex-wrap: wrap;
  }
  
  .post-media {
    height: 200px;
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
  
  .post-comments {
    margin-top: 10px;
  }
  
  .post-comment {
    margin-top: 10px;
    padding: 10px;
  }
  </style>  