<template>
<div class="background-page">
<div class="main-page">
    <form class="login-block" @submit.prevent="login()">
        <fieldset>
            <legend>Returning Artists</legend>
            <input placeholder="username" v-model="usernameLogin" />
            <input type="password" placeholder="password" v-model="passwordLogin" />
        </fieldset>
        <fieldset>
            <button type="submit">Log in</button>
        </fieldset>
    </form>
    <p v-if="errorLogin">{{errorLogin}}</p>

    <form class="register-wrapper">
        <fieldset>
            <legend>New to I♡Poetry? Register for an account here!</legend>
            <input placeholder="first name" v-model="firstName" style="margin-right: 6px;"/>
            <input placeholder="last name" v-model="lastName" />
        </fieldset>
        <fieldset>
            <input placeholder="username" v-model="username" style="margin-right: 6px;"/>
            <input type="password" placeholder="password" v-model="password" />
        </fieldset>
        <fieldset>
            <input type="checkbox" v-model="namePreference" @click="setPreference()" />
            <label>Use full name instead of username to sign poems.</label>
        </fieldset>
        <fieldset>
            <button type="submit" @click.prevent="register()">Create Account</button>
        </fieldset>
    </form>
    <p v-if="error">Error: {{error}}</p>
</div>
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
            errorLogin: '',
            testPhrase: ''
        }
    },
    methods: {
        setPreference() {
            this.namePreference = !this.namePreference;
        },
        async register() {
            this.error = '';
            this.errorLogin = '';

            
            if (!this.firstName || !this.lastName || !this.username || !this.password) {
                this.testPhrase = "Register poorly made";
                return;
            }
            this.testPhrase = "Register working";
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
            if (!this.usernameLogin || !this.passwordLogin) {
                this.errorLogin = "username and password required";
                return;
            }

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

<style scoped>
.main-page {
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}

.login-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: rgba(203, 209, 216, 0.801);
    border-radius: 12px 12px;
    border: none;
}

.login-block fieldset {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 65%;
}

input {
    margin-bottom: 12px;
}

legend {
    text-align: center;
    padding-top: 10px;
    font-size: 1.2em;
}

.register-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: rgba(203, 209, 216, 0.801);
    border-radius: 12px 12px;
    padding: 8px;
    margin-bottom: 50px;
}

input {
    border-radius: 5px 5px;
    border: none;
}

button {
    border-radius: 5px 5px;
    padding-right: 2px;
    padding-left: 2px;
}
</style>