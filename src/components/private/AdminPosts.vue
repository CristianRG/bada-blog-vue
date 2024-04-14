<template>
    <div class="container-fluid" id="main">
        <ContainerBlogs />
    </div>
</template>
<script>
import ContainerBlogs from '../blog/ContainerBlogs.vue';
    export default {
        name: 'AdminPosts',
        components: {
            ContainerBlogs
        }
    }
</script>
<style scoped>
    .container-fluid{
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>