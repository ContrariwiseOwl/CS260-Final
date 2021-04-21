<template>
<div>
    <form class="login-block" @submit.prevent="login">
        <fieldset>
            <legend>Login</legend>
            <input placeholder="username" v-model="usernameLogin" />
            <input type="password" placeholder="password" v-model="passwordLogin" />
        </fieldset>
        <fieldset>
            <button type="submit">Login</button>
        </fieldset>
    </form>
    <p v-if="errorLogin">{{errorLogin}}</p>

    <form @submit.prevent="register">
        <fieldset>
            <legend style="font-size: 1.2em;">New to I♡Poetry? Register for an account here!</legend>
            <input placeholder="first name" v-model="firstName" />
            <input placeholder="last name" v-model="lastName" />
        </fieldset>
        <fieldset>
            <input placeholder="username" v-model="username" />
            <input type="password" placeholder="password" v-model="password" />
        </fieldset>
        <fieldset>
            <input type="checkbox" v-model="namePreference" @click="setPreference()" />
            <label>Use full name instead of username to sign poems.</label>
        </fieldset>
        <fieldset>
            <button type="submit">Create Account</button>
        </fieldset>
    </form>
    <p v-if="error">Error: {{error}}</p>
</div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Login',
    data() {
        return {
            usernameLogin: '',
            passwordLogin: '',
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            namePreference: false,
            error: '',
            errorLogin: ''
        }
    },
    methods: {
        setPreference() {
            this.namePreference = !this.namePreference;
        },
        async register() {
            this.error = '';
            this.errorLogin = '';
            if (this.firstName || !this.lastName || !this.username || !this.password)
                return;
            
            try {
                let response = await axios.post("/api/users", {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    username: this.username,
                    password: this.password,
                    namePreference: this.namePreference
                });
                this.$root.$data.user = response.data.user;
            } catch (error) {
                this.error = "Error: " + error.response.data.message;
                this.$root.$data.user = null;
            }
        },
        async login() {
            this.error = '';
            this.errorLogin = '';
            if (!this.usernameLogin || !this.passwordLogin)
                return;

            try {
                let response = await axios.post("/api/users/login", {
                    username: this.usernameLogin,
                    password: this.passwordLogin
                });
                this.$root.$data.user = response.data.user;
            } catch (error) {
                this.errorLogin = "Error: " + error.response.data.message;
                this.$root.$data.user = null;
            }
        }
    },
    computed: {
        user() {
            return this.$root.$data.user;
        }
    }
}
</script>
