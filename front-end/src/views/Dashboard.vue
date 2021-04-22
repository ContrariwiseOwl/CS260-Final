This page is for logging in, viewing profile picture, etc.
Login should probably be its own component, and so should
the profile picture uploader thing.

<template>
    <div class="background-page">
        <div class="main-page">
            <div class="logo-box mini-logo-title">
                <img src="../../legacy/images/logo-mobile.png"/>
                <h1 v-if="!user">Account Login</h1>
                <h1 v-else>Account Dashboard</h1>
            </div>

            <div v-if="user" class="account-info">
                <div class="profile">
                    <h3>Profile</h3>
                    <p>{{user.firstName}} {{user.lastName}}</p>
                    <p>Username: {{user.username}}</p>
                    <p v-if="user.namePreference">Pen Name: {{user.firstName}} {{user.lastName}}</p>
                    <p v-else>Pen Name: {{user.username}}</p>
                </div>
                <form class="user-update" @submit.prevent="updateUser">
                    <fieldset>
                        <input type="checkbox" v-model="namePreference" @click="setPreference()" />
                        <label>Use full name instead of username to sign poems.</label>
                    </fieldset>
                    <button type="submit">Save Changes</button>
                </form>
            </div>
            <Login v-else />

            <div class="resources login-footer">
                <div class="resource">
                    <h6>Writing</h6>
                    <ul>
                        <li><a href="https://www.poetryfoundation.org/learn/glossary-terms">Poetic Glossary</a></li>
                        <li><a href="https://www.merriam-webster.com/">Dictionary</a></li>
                        <li><a href="https://www.merriam-webster.com/thesaurus">Thesaurus</a></li>
                        <li><a href="https://www.rhymezone.com/">Rhymezone</a></li>
                    </ul>
                </div>
                <div class="resource">
                    <h6>Inspiration</h6>
                    <ul>
                        <li>Go Outside</li>
                        <li><a href="">Great Poets</a></li>
                        <li><a href="https://writingexercises.co.uk/subjectgenerator.php">Subject Generator</a></li>
                        <li><a href="https://www.orwellfoundation.com/the-orwell-foundation/orwell/essays-and-other-works/why-i-write/">Orwell's <em>Why I Write</em></a></li>
                    </ul>
                </div>
                <div class="resource">
                    <h6>Community</h6>
                    <ul>
                        <li><a href="https://www.poetryfoundation.org">Poetry Foundation</a></li>
                        <li><a href="#">I Heart Poetry Forums</a></li>
                        <li>Call Your Mom</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Login from '@/components/Login.vue'
import axios from 'axios'

export default {
    name: 'Dashboard',
    components: {
        Login
    },
    data() {
        return {
            namePreference: false,
            error: '',
        }
    },
    async created() {
        try {
            let response = await axios.get("/api/users");
            this.$root.$data.user = response.data.user;
            this.namePreference = response.data.user.namePreference;
        } catch (error) {
            this.$root.$data.user = null;
        }
    },
    methods: {
        setPreference() {
            this.namePreference = !this.namePreference;
        },
        async updateUser() {
            try {
                await axios.put("/api/users", {
                    namePreference: this.namePreference
                });
            } catch (error) {
                this.error = error.response;
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
.profile{
    width: 100%;
}

.account-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 45px;
    width: 50%;
    background-color: rgba(203, 209, 216, 0.801);
    padding: 8px;
    border-radius: 15px 15px;
}

.account-info p {
    text-align: left;
    width: 100%;
    padding-left: 43px;
}

.profile h3 {
    text-align: center;
}

.user-update {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.user-update button {
    border-radius: 5px 5px;
    padding-right: 2px;
    padding-left: 2px;
}
</style>