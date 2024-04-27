<template>
    <div class="container-fluid" id="login">
        <div class="main" v-if="!showProfilePicker">
            <input type="checkbox" id="chk" aria-hidden="true">
            <div class="close">
                <router-link to="/">
                    <span class="material-symbols-outlined">
                        arrow_back
                    </span>
                </router-link>
                
            </div>
            <div class="signup">
                <form>
                    <label for="chk" aria-hidden="true">Sign up</label>
                    <input type="text" name="txt" placeholder="User name" required="true" v-model="username"
                        @input="formValiditySign">
                    <input type="email" name="email" placeholder="Email" required="true" v-model="emailSignup"
                        @input="formValiditySign">
                    <input type="password" name="pswd" placeholder="Password" required="true" v-model="password"
                        @input="formValiditySign">
                    <button :disabled="!isValidFormS" @click.prevent="nextStep">Sign up</button>
                </form>
            </div>

            <div class="login">
                <form>
                    <label for="chk" aria-hidden="true">Login</label>
                    <input type="email" name="email" placeholder="Email" required="true" v-model="emailLogin"
                        @input="formValidity">
                    <input type="password" name="pswd" placeholder="Password" required="true" v-model="password"
                        @input="formValidity">
                    <button @click.prevent="login" :disabled="!isValidFormL">Login</button>
                </form>

            </div>
        </div>
        <ProfilePicture v-if="showProfilePicker" @sign="signup(image)" />
    </div>
</template>

<script>
import ProfilePicture from './ProfilePicture.vue'
export default {
    name: 'LoginApp',
    components: {
        ProfilePicture
    },
    data() {
        return {
            emailLogin: '',
            emailSignup: '',
            password: '',
            username: '',
            isValidFormL: false,
            isValidFormS: false,
            instance: null,
            rute: '',
            showProfilePicker: false
        }
    },
    methods: {
        login: async function () {
            try {
                const result = await this.axios.post(`${this.$store.state.URL_BASE}/api/v1/blog/login`, { email: this.emailLogin, password: this.password }, { withCredentials: true })
                
                if (result.status == 200) {

                    this.rute = result.data.extra ? '/dashboard' : '/main'
                    this.$store.commit('setIdSession', result.data.idSession)


                    this.instance = this.$toast.success(result.data.message, { position: 'top', duration: 300 })
                    setTimeout(() => {
                        this.$router.push({ path: this.rute })
                    }, 400)
                }
            } catch (error) {
                this.instance = this.$toast.error(error.response.data.message, { position: 'top', duration: 1500 })
            }
        },
        signup: async function (image) {
            try {
                const result = await this.axios.post(`${this.$store.state.URL_BASE}/api/v1/blog/register`, { name: this.username, email: this.emailSignup, password: this.password, profileImage: image })
                if (result.status == 200) {
                    this.instance = this.$toast.success(result.data.message, { position: 'top', duration: 300 })
                    this.nextStep()
                }
            } catch (error) {
                this.instance = this.$toast.error(error.response.data.message, { position: 'top', duration: 1500 })
            }
        },
        formValidity: function () {
            const emailValid = this.emailLogin !== '' && /\S+@\S+\.\S+/.test(this.emailLogin);

            // Verificar si el campo de contraseña está lleno
            const passwordValid = this.password !== '';

            // Actualizar el estado de la validez del formulario
            this.isValidFormL = emailValid && passwordValid;
        },
        formValiditySign: function () {
            const emailValid = this.emailSignup !== '' && /\S+@\S+\.\S+/.test(this.emailSignup);

            // Verificar si el campo de contraseña está lleno
            const passwordValid = this.password !== '';

            const usernameValid = this.username !== '';

            // Actualizar el estado de la validez del formulario
            this.isValidFormS = emailValid && passwordValid && usernameValid;
        },
        nextStep: function (){
            this.showProfilePicker =! this.showProfilePicker
        }
    }
}
</script>
<style>
/*@import url('https://fonts.googleapis.com/css2?family=Jost:wght@500&display=swap');
*/
#login {
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    font-family: 'Jost', sans-serif;
    background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
}

.close {
    position: relative;
    font-size: 30px;
    left: 10px;
    cursor: pointer;
    z-index: 10;
}

.main {
    width: 350px;
    height: 500px;
    background: red;
    overflow: hidden;
    background: url("https://doc-08-2c-docs.googleusercontent.com/docs/securesc/68c90smiglihng9534mvqmq1946dmis5/fo0picsp1nhiucmc0l25s29respgpr4j/1631524275000/03522360960922298374/03522360960922298374/1Sx0jhdpEpnNIydS4rnN4kHSJtU1EyWka?e=view&authuser=0&nonce=gcrocepgbb17m&user=03522360960922298374&hash=tfhgbs86ka6divo3llbvp93mg4csvb38") no-repeat center/ cover;
    border-radius: 10px;
    box-shadow: 5px 20px 50px #000;
}

#chk {
    display: none;
}

.signup {
    position: relative;
    width: 100%;
    height: 100%;
}

label {
    color: #fff;
    font-size: 2.3em;
    justify-content: center;
    display: flex;
    margin: 60px;
    font-weight: bold;
    cursor: pointer;
    transition: .5s ease-in-out;
}

input {
    width: 60%;
    height: 20px;
    background: #e0dede;
    justify-content: center;
    display: flex;
    margin: 20px auto;
    padding: 10px;
    border: none;
    outline: none;
    border-radius: 5px;
}

button {
    width: 60%;
    height: 40px;
    margin: 10px auto;
    justify-content: center;
    display: block;
    color: #fff;
    background: #573b8a;
    font-size: 1em;
    font-weight: bold;
    margin-top: 20px;
    outline: none;
    border: none;
    border-radius: 5px;
    transition: .2s ease-in;
    cursor: pointer;
}

button:hover {
    background: #6d44b8;
}

.login {
    height: 460px;
    background: #eee;
    border-radius: 60% / 10%;
    transform: translateY(-180px);
    transition: .8s ease-in-out;
}

.login label {
    color: #573b8a;
    transform: scale(.6);
}

#chk:checked~.login {
    transform: translateY(-500px);
}

#chk:checked~.login label {
    transform: scale(1);
}

#chk:checked~.signup label {
    transform: scale(.6);
}
</style>