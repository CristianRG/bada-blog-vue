<template>
    <div class="container-fluid">
        <h2>Si</h2>
    </div>
</template>

<script>
    export default {
        name: 'PostShared',
        data() {
            return {

            }
        },
        methods: {

        },
        mounted(){
            console.log(window.location.pathname.split('/')[3])
        }
    }
</script>