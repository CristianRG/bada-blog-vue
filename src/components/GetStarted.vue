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

<style>
    .get-started{
        color: white;
    }

    .buttons{
        display: flex;
        justify-content: end;
        
    }
</style>