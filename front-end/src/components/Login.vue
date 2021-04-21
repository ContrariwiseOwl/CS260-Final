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
            <legend>New to I♡Poetry? Register for an account here!</legend>
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
    </form>
</div>
</template>

<script>

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
            error: '',
            errorLogin: ''
        }
    },
    methods: {

    },
    computed: {
        user() {
            return this.$root.$data.user;
        }
    }
}
</script>
