<template>
    <div class="container-fluid" id="main">
        <ContainerPosts />
    </div>
</template>
<script>
import ContainerPosts from '@/components/blog/ContainerPosts.vue'
    export default {
        name: 'AdminPosts',
        components: {
            ContainerPosts
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