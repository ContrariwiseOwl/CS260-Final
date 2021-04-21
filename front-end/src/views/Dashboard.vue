This page is for logging in, viewing profile picture, etc.
Login should probably be its own component, and so should
the profile picture uploader thing.

<template>
    <div class="background-page">
        <div class="main-page">
            <div class="logo-box mini-logo-title">
                <img src="/images/logo-mobile.png"/>
                <h1 v-if="!user">Account Login</h1>
                <h1 v-else>Account Dashboard</h1>
            </div>

            <div v-if="user" class="account-info">
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
    async created() {
        try {
            let response = await axios.get("/api/users");
            this.$root.$data.user = response.data.user;
        } catch (error) {
            this.$root.$data.user = null;
        }
    },
    computed: {
        user() {
            return this.$root.$data.user;
        }
    }
}
</script>
