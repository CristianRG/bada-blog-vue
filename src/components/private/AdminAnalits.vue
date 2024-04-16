<template>
    <div class="container-fluid bg-red">
        <div class="container mt-5">
            <h3>Actividad</h3>
            <p>Total de likes, dislikes y comentarios realizados</p>
            <div class="row">
                <!-- Rectángulo de Likes -->
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Likes</h5>
                            <p class="card-text">{{ likes }}</p>
                        </div>
                    </div>
                </div>
                <!-- Rectángulo de Dislikes -->
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Dislikes</h5>
                            <p class="card-text">{{ dislikes }}</p>
                        </div>
                    </div>
                </div>
                <!-- Rectángulo de Total de Comentarios -->
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Comentarios</h5>
                            <p class="card-text">{{ comments }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Sección de comentarios -->
            <div class="row mt-4">
                <div class="col-md-12">
                    <h3>Comentarios</h3>
                    <p>Palabras más repetidas en comentarios</p>
                    <!-- Lista de comentarios -->
                    <ul class="list-group" ref="commentsList">
                        <li class="list-group-item comment" v-for="comment in commentsData" :key="comment.id"
                            style="display: flex; gap: 3rem;">
                            <span>{{ comment.text }}</span> <span>{{ comment.count }}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-md-12">
                    <h3>Estadisticas detalladas</h3>
                    <p>Estadisticas de cada blog</p>
                    <div class="card" v-for="post in listDetailed" :key="post">
                        <div class="card-body">
                            <h5 class="card-title">{{ post.title }}</h5>
                            <p class="card-text">id: {{ post._id }}</p>
                            <p class="card-text">likes: {{ post.likes }}</p>
                            <p class="card-text">dislikes: {{ post.dislikes }}</p>
                            <p class="card-text">comentarios: {{ post.comments }}</p>
                            <p>Palabras más repetidas en comentarios</p>
                            <div class="list-group">
                                <li class="list-group-item" v-for="comment in post.words" :key="comment.id" style="display: flex; gap: 3rem;">
                                    <span>{{ comment._id }}</span> <span>{{ comment.count }}</span>
                                </li>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AdminAnalits",
    data() {
        return {
            likes: 0,
            dislikes: 0,
            comments: 0,
            commentsData: [],
            listDetailed: []
        }
    },
    methods: {
        async getAnalytics() {
            try {
                const response = await this.axios.get(`${this.$store.state.URL_BASE}/api/v1/blog/analytics`, { withCredentials: true })
                console.log(response)
                this.likes = response.data.totalLikes
                this.dislikes = response.data.totalDislikes
                this.comments = response.data.totalComments
            } catch (error) {
                console.log(error)
            }
        }
    },
    mounted() {
        const eventSource = new EventSource(`${this.$store.state.URL_BASE}/dashboard/sse`, { withCredentials: true });

        eventSource.addEventListener("message", (event) => {
            //console.log(event.data)
            this.commentsData = [];
            this.listDetailed = []


            const newData = JSON.parse(event.data);
            this.likes = newData.data[1].totalLikes;
            this.dislikes = newData.data[1].totalDislikes;
            this.comments = newData.data[1].totalComments;

            newData.data[1].wordInMostComments.forEach(comment => {
                this.commentsData.push({
                    id: comment._id,
                    text: comment._id, // Modifica esto para reflejar el texto real de tu comentario
                    count: comment.count
                });
            });

            newData.data[0].forEach((blog) => {
                this.listDetailed.push({
                    _id: blog._id,
                    title: blog.title,
                    likes: blog.totalLikes,
                    dislikes: blog.totalDislikes,
                    comments: blog.totalComments,
                    words: blog.wordInMostComments
                })
            })


        });

        eventSource.addEventListener("error", (error) => {
            console.error("Error en la conexión SSE", error);
            eventSource.close();
        });
    }
}
</script>

<style scoped></style>
