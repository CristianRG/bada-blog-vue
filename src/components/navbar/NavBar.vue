<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-body-tertiary bg-dark" data-bs-theme="dark">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">
                <img src="../../assets/logo.png" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
                SoundScape
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-start" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item" v-for="item in items" :key="item">
                        <router-link class="nav-link" :to="`/${item.url}`">{{ item.name }}</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'NavBar',
    props: {
        items: Array
    }
}
</script>