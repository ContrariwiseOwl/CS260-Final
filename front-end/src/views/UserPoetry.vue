<template>
    <div class="background-page">
        <div class="main-page">
            <div class="logo-box mini-logo-title">
                    <img src="/images/logo-mobile.png"/>
                    <h1>User Poetry</h1>
                </div>
            <div class="welcome">
                <p>This page hosts our collection of user-submitted poetry. A big thank you to everyone who has
                    submitted their work for us to show the world! If you would like to submit your own poetry, go to the "My Poetry" page.
                </p>
            </div>
            <PoetryList :poems="poems" :deleteButton="false"/>

            <div class="resources">
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
import PoetryList from '/src/components/PoetryList.vue'
import axios from 'axios'

export default {
    name: 'UserPoetry',
    components: {
        PoetryList
    },
    data() {
        return {
            poems: [],
            error: ''
        }
    },
    created() {
        this.getPoems();
    },
    methods: {
        async getPoems() {
            this.error = '';

            try {
                let response = await axios.get("/api/poems/all");
                this.poems = response.data;
            } catch (error) {
                this.error = error.response.data.message;
            }
        }
    }
}
</script>