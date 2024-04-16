<template>
    <div class="container bg-dark">
        <h2 class="mt-5">Crear Nueva Publicación</h2>
        <form @submit.prevent="submitPost">
            <div class="mb-3">
                <label for="title" class="form-label">Título</label>
                <input type="text" class="form-control" id="title" v-model="post.title" required>
            </div>
            <div class="mb-3">
                <label for="content" class="form-label">Contenido</label>
                <textarea class="form-control" id="content" rows="5" v-model="post.content" required></textarea>
            </div>
            <div class="mb-3">
                <label for="media" class="form-label">Media (Imágenes, Videos o Música)</label>
                <input type="file" class="form-control" id="media" accept="image/*, video/*, audio/*" multiple
                    @change="handleFileUpload">
            </div>
            <div class="preview-images">
                <img v-for="image in post.media" :key="image" :src="image" alt="Preview" class="preview-image">
            </div>
            <button type="submit" class="btn btn-primary">Crear Publicación</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'NewPost',
    data() {
        return {
            post: {
                title: '',
                content: '',
                media: [], // Cambiamos media a un array para almacenar múltiples archivos
                mediaBase64: []
            },
            instance: null
        };
    },
    methods: {
        async submitPost() {
            // Aquí puedes enviar la publicación al servidor
            try {
                const response = await this.axios.post(`${this.$store.state.URL_BASE}/api/v1/blog/create`, { title: this.post.title, content: this.post.content, media: this.post.mediaBase64 }, { withCredentials: true })
                this.post.title = '';
                this.post.content = '';
                this.post.media = [];
                this.post.mediaBase64 = [];
                this.$emit('new-post')
                this.$store.dispatch('addBlogs', {...response.data.data, user: {...response.data.user}})
                this.instance = this.$toast.success("Blog created!")
            } catch (error) {
                console.log(error)
            }
            // Luego de enviar la publicación, puedes limpiar el formulario
        },
        handleFileUpload(event) {
            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                this.previewImage(file);
                this.post.media.push(URL.createObjectURL(file));
            }
        },
        previewImage(file) {
            // Aquí puedes agregar lógica para previsualizar otros tipos de archivos, como videos o música
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = () => {
                    // Puedes hacer algo con la URL de la imagen si lo deseas
                    this.post.mediaBase64.push(reader.result.split(',')[1]);
                };
                reader.readAsDataURL(file);
            }
        }
    }
};
</script>

<style scoped>
.container {
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
}

.preview-images {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
}

.preview-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-right: 10px;
    margin-bottom: 10px;
}
</style>