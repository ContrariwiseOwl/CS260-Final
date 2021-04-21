<template>
<div>
    <div class="background-page">
            <div class="main-page">
                <div class="logo-box mini-logo-title">
                    <img src="/images/logo-mobile.png"/>
                    <h1>Poem of the Day</h1>
                </div>

                <div id="dailyPoem" class="poem">
                    
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
export default {
    name: "dailypoem",
    mounted() {
        let currentDailyPoem = "Mother and Poet";
    fetch("https://poetrydb.org/title/" + currentDailyPoem)
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            console.log(json);
            let results = "";

            results += '<p><strong>' + json[0].title + "</strong> by " + json[0].author + '</p>';

            results += '<div class="stanza"><ul>';
            for (let i = 0; i < json[0].lines.length; i++) {
                results += '<li>' + json[0].lines[i] + '</li>';
            }
            results += '</ul></div>';

            document.getElementById("dailyPoem").innerHTML = results;
        }).catch(function(reason) {
            console.log("Error explained: " + reason);
        })
    }
}
</script>

<style scoped>
#dailyPoem ul {
    list-style: none;
    padding-left: 0.6em;
    padding-right: 0.6em;
}

#dailyPoem > p {
    text-align: center;
    padding: 8px;
}
</style>