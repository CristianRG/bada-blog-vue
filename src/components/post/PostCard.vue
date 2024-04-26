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
        <img v-for="(media, index) in post.media" :key="index" :src="showMedia(media)" :alt="'Media ' + (index + 1)"
          class="post-media">
      </div>
    </div>

    <!-- Interactions with the post -->
    <ActionsPost :post="post"/>
  </div>
</template>

<script>
//import { getTokenFromCookie } from '@/middleware/auth'
//import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ActionsPost from '@/components/post/ActionsPost.vue';
export default {
  name: 'PostCard',
  components: {
    ActionsPost
  },
  props: {
    post: Object,
    user: Object
  },
  data() {
    return {
      commentSection: false,
      showMoreComments: false,
      showInitialComment: true,
      isInSession: false
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
    showProfileImage() {
      if (this.user && this.user.profileImage) {
        return `data:image/png;base64,${this.user.profileImage}`;
      } else {
        return ''; // O cualquier imagen predeterminada
      }
    },
    showMedia(media) {
      if (this.post && this.post.media && this.post.media.length > 0) {
        return `data:image/png;base64,${media}`;
      } else {
        return '';
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