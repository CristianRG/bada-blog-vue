<template>
  <div class="container mt-5 bg-dark" data-bs-theme="dark" style="width: fit-content; padding: 10px; border-radius: 5px;">
    <div class="row">
      <div class="col-md-6 offset-md-3 text-center">
        <h2>Seleccionar Foto de Perfil</h2>
        <div class="form-group">
          <img :src="imageUrl" alt="Foto de perfil" id="profile-pic" class="profile-pic img-fluid">
          <input type="file" id="file-upload" style="display: none;" @change="handleFileUpload">
          <label for="file-upload" class="btn btn-primary mt-3"><i class="fas fa-camera"></i> Subir Foto</label>
          <button type="button" class="btn btn-secondary" @click="omitir">Omitir</button>
          <button type="button" class="btn btn-primary" @click="guardar">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfilePicture',
  data() {
    return {
      imageUrl: 'https://via.placeholder.com/200', // Imagen de perfil por defecto
      imageBase64: ''
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageUrl = reader.result;
          this.imageBase64 = reader.result.split(',')[1];
        };
        reader.readAsDataURL(file);
      }
    },
    omitir() {
      // Lógica para omitir
      this.$emit('sign', '')
    },
    guardar() {
      // Lógica para guardar la imagen
      this.$emit('sign', this.imageBase64)
    }
  }
};
</script>

<style scoped>
.profile-pic {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
}
</style>