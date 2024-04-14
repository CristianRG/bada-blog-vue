<template>
    <div class="container-fluid" id="mainApp">
        <div class="side-bar">
            <SideBar />
        </div>
        <div class="content">
            <ContainerBlogs style="width: 70%;"/>
        </div>
    </div>
</template>

<script>
import SideBar from '@/components/blog/SideBar.vue'
import ContainerBlogs from './ContainerBlogs.vue';
export default {
    name: "MainBlog",
    components: {
        SideBar,
        ContainerBlogs
    }
}
</script>

<style>
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