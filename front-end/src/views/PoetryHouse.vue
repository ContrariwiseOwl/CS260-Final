<template>
    <div class="background-page">
            <div class="main-page">
                <div class="logo-box mini-logo-title">
                    <img src="../../legacy/images/logo-mobile.png"/>
                    <h1>Poetry House<button id="resetButton" @click="reset()">Reset</button></h1>
                </div>

                

                <div id="poetryHouseTitle" class="welcome">
                    <p>The <em>Poetry House</em> is a portal for viewing poetry. You can search poems by title, author, or both.
                        Add a number field to limit the number of poems retrieved. If you want a list of random poems, simply press submit
                        for one random poem, or input only a number for multiple poems. Boxes left empty do not affect the search. Title search
                        is tolerant whereas author search requires correct spelling.
                    </p>
                </div>

                <div id="poetryRequest">
                    <div class="request-bar">
                        <label>Search by Author</label>
                        <input id="authorInput" type="text"/>
                    </div>
                    <div class="request-bar">
                        <label>Search by Title</label>
                        <input id="titleInput"/>
                    </div>
                    <div class="request-bar">
                        <label>Number of Poems</label>
                        <input id="poemNumber" type="number"/>
                    </div>
                    <input id="poetryRequestSubmit" type="submit" @click="poetryRequest()"/>
                </div>

                <div id="poetryHouse" class="poem">
                    
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
</template>

<script>
export default {
    name: "PoetryHouse",
    methods: {
        poetryRequest() {
            const author = document.getElementById("authorInput").value;
            const title = document.getElementById("titleInput").value;
            const poemNumber = document.getElementById("poemNumber").value;
            let params = new Array();
            let paramString = "";
            params.push(author);
            params.push(title);
            params.push(poemNumber);
            let url = "https://poetrydb.org/";

            if (author === "" && title === "") {
                url += "random";

                if (poemNumber !== "") {
                 url += "/" + poemNumber;
                }
            }
            else {
                let priorParam = false;
                if (params[0] !== "") {
                    url += "author";
                    paramString += params[0];
                    priorParam = true;
                }
                if (params[1] !== "") {
                    if (priorParam) {
                        url += ",";
                        paramString += ";";
                    }
                    paramString += params[1];
                    url += "title";
                    priorParam = true;
                }
                if (params[2] !== "") {
                    if (priorParam) {
                        url += ",";
                        paramString += ";";
                    }
                    paramString += params[2];
                    url += "poemcount";
                }

                url += "/" + paramString;

            }

            fetch(url)
                .then(function(response) {
                    return response.json();
                }).then(function(json) {
                    console.log(json);
                    let results = "";
                    if (json.length === undefined) results += '<h2>Invalid Search</h2>';
                    else results += '<h2>Returned ' + json.length + ' Poem(s)</h2>';

                    for (let i = 0; i < json.length; i++) {
                        results += '<div class="poem">';

                        results += '<p><strong>' + json[i].title + "</strong> by " + json[i].author + ", " + json[i].linecount + ' lines</p>';

                        results += '<div class="stanza"><ul>';
                        for (let k = 0; k < json[i].lines.length; k++) {
                            results += '<li>' + json[i].lines[k] + '</li>';
                        }
                        results += '</ul></div>';

                        results += '</div>';

                        if (i < json.length - 1) results += '<hr/>';
                    }

                    document.getElementById("poetryHouse").innerHTML = results;
                    document.getElementById("poetryHouse").style.display = "flex";
                    document.getElementById("resetButton").style.display = "inline-block";
                    document.getElementById("poetryRequest").style.display = "none";
                    document.getElementById("poetryHouseTitle").style.display = "none";
                }).catch(function(reason) {
                    console.log("Error explained: " + reason);
                })
        },
        reset() {
            document.getElementById("poetryHouse").style.display = "none";
            document.getElementById("resetButton").style.display = "none";
            document.getElementById("poetryRequest").style.display = "flex";
            document.getElementById("poetryHouseTitle").style.display = "flex";
        }
    }
}
</script>

<style scoped>
#poetryHouseTitle {
    margin-bottom: 0px;
}

#poetryRequest {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 275px;
    border: black 1px solid;
    margin: 3em 1em;
    padding: 1em;
}

#poetryRequest input {
    margin: 0px 0.6em;
}

.request-bar {
    display: flex;
    justify-content: space-between;
}

#poetryHouse {
    display: flex;
    font-size: 0.8em;
    margin-bottom: 15px;
}

#poetryHouse p {
    margin: 10px;
    text-align: center;
}

hr {
    border: 0;
    clear: both;
    display:block;
    width: 96%;               
    background-color: black;
    height: 1px;
}

#resetButton {
    font-size: 0.5em;
    display: none;
    margin-left: 12px;
}
</style>