<template>
    <div>
        <NavBar />
        <div class="container-fluid" id="main">
            <div class="drop-shadow">
                <GetStarted />
            </div>
        </div>
    </div>
</template>

<script>
    import GetStarted from './GetStarted.vue';
    import NavBar from './navbar/NavBar.vue';
    export default {
        name: 'MainApp',
        components: {
            GetStarted,
            NavBar
        }
    }
</script>

<style scoped>
    #main{
        width: 100%;
        height: calc(100vh - 5rem);
        background-image: url('../assets/images/background.jpeg');
        background-size: cover;
        background-repeat: no-repeat;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .drop-shadow{
        width: 100%;
        height: calc(100vh - 5rem);
        background-color: rgba(0, 0, 0, 0.4);
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        
        left: 0;
        z-index: 10;
    }
</style>