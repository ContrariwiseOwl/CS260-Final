<template>
    <div class="home">
        <div class="background-page">
            <div class="main-page">
                <div class="logo-box">
                    <img src="/images/logo-mobile.png"/>
                </div>

                <div class="daily-poem poem">
                    <h2>Poem of the Day</h2>
                    <p><strong>Mother and Poet</strong> by Elizabeth Barrett Browning</p>
                    <div class="stanza">
                        <ul>
                            <li><strong>I.</strong></li>
                            <li>Dead ! One of them shot by the sea in the east,</li>
                            <li>And one of them shot in the west by the sea.</li>
                            <li>Dead ! both my boys ! When you sit at the feast</li>
                            <li>And are wanting a great song for Italy free,</li>
                            <li>Let none look at me !</li>
                        </ul>
                    </div>
                    <router-link to="/dailypoem">Read more...</router-link>
                </div>

                <div class="welcome">
                    <p>Welcome to <em>I Heart Poetry</em>, a website dedicated to poetry appreciation. The site features the work of both experts and amateurs,
                        including that of users like you. Whether you are a beginner or expert wordsmith, <em>I Heart Poetry</em> can be a haven of inspiration
                        as well as a place to get support in your poetic endeavors. Please be kind but constructive in feedback you give other poets.
                    </p>
                </div>

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
    </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  
  },
}
</script>
