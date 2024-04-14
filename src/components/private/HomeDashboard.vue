<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12 text-center mb-4">
                <h1>Bienvenido al Dashboard de Administración</h1>
                <p class="lead">Aquí puedes gestionar tus publicaciones y ver análisis de datos.</p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Sección de Posts</h5>
                        <p class="card-text">Aquí puedes administrar tus publicaciones.</p>
                        <router-link to="/dashboard/posts" class="btn btn-primary">Ir a Posts</router-link>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Sección de Análisis</h5>
                        <p class="card-text">Aquí puedes ver análisis de datos.</p>
                        <router-link to="/dashboard/analisis" class="btn btn-primary">Ir a Análisis</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'HomeDashboard'
    }
</script>
<style scoped>
    
</style>