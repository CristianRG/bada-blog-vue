<template>
    <div class="get-started">
        <h1>Comienza ahora</h1>
        <div class="buttons">
            <button
            @click="getStarted" 
            type="button" 
            class="btn btn-primary">Get Started</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'GetStarted',
        methods: {
            getStarted() {
                this.$router.push('/auth')
            }
        }
    }
</script>

<style scoped>
    .get-started{
        color: white;
    }

    .buttons{
        width: 100%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .buttons button {
        margin: 0;
    }
</style>