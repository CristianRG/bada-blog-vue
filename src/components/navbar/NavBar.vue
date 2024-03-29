<template>
    <nav class="navbar bg-body-tertiary bg-dark" data-bs-theme="dark" style="height: 5rem;">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">
                <img src="../../assets/logo.png" alt="Logo" width="30" height="24"
                    class="d-inline-block align-text-top">
                SoundScape
            </router-link>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'NavBar'
}
</script>