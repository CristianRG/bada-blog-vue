<template>
    <div class="col">
        <div class="row">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">¡Inicia sesión!</h5>
                    <p class="card-text">Para obtener una experiencia más completa inicia sesión ahora</p>
                    <div class="buttons">
                        <router-link to="/auth" class="btn btn-primary mx-1">Inicia sesión</router-link>
                        <button class="btn btn-secondary" @click="close">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SessionCard",
    methods: {
        close() {
            this.$emit('close');
        }
    }
}
</script>
<style scoped>
.buttons{
    height: fit-content;
    margin-bottom: 1rem;
}

.buttons button, .buttons .btn-primary {
    width: fit-content;
    height: 100%;
}

.buttons button{
    margin: 0%;
}
</style>