<template>
    <div class="comment">
        <div class="user-info">
            <img :src="showProfileImage()" class="avatar" alt="User Avatar">
            <span class="username">{{ comment.name_author }}</span>
        </div>
        <div class="comment-text">
            {{ comment.comment }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        comment: {
            type: Object,
            required: true
        }
    },
    methods:{
        showProfileImage() {
            if (this.comment && this.comment.profileImage) {

                return `data:image/png;base64,${this.comment.profileImage}`;
            } else {
                return ''; // O cualquier imagen predeterminada
            }
        }
    }
}
</script>

<style scoped>
.comment {
    font-size: 15px;
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid #ccccccc7;
    border-radius: 5px;
}

.user-info {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
}

.avatar {
    width: 25px;
    height: 25px;
    background: white;
    padding: 5px;
    border-radius: 50%;
    margin-right: 10px;
}

.username {
    font-size: 12px;
    font-weight: bold;
}
</style>