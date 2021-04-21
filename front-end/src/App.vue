<template>
  <div id="app">
    <div>
        <b-navbar toggleable="sm" type="light" variant="light" id="mynav-class">
            <b-navbar-brand>I♡Poetry</b-navbar-brand>
            <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

            <b-collapse id="nav-text-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item to="/">Home</b-nav-item>
                <b-nav-item to="/userpoetry">User poetry</b-nav-item>
                <b-nav-item to="/mypoetry">My Poetry</b-nav-item>
                <b-nav-item to="/dailypoem">Daily Poem</b-nav-item>
                <b-nav-item to="/poetryhouse">Poetry House</b-nav-item>

                <!--<b-nav-item-dropdown text="Great Poets" right>
                    <b-dropdown-item href="#">Maya Angelou</b-dropdown-item>
                    <b-dropdown-item href="#">Edgar Allan Poe</b-dropdown-item>
                    <b-dropdown-item href="#">Langston Hughes</b-dropdown-item>
                    <b-dropdown-item href="#">William Shakespeare</b-dropdown-item>
                    <b-dropdown-item href="#">Raplh Waldo Emerson</b-dropdown-item>
                </b-nav-item-dropdown>-->
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
                <b-collapse id="nav-text-collapse" is-nav>
                    <b-navbar-nav>
                        <b-nav-text>Every ♡ deserves a Poem</b-nav-text>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar-nav>

            </b-collapse>
        </b-navbar>
    </div>
    <router-view/>

    <div class="github footer">
        <a href="https://github.com/ContrariwiseOwl/CS260-CP3">Github Repository</a>
    </div>
  </div>
</template>

<script>
export default {
    name: 'app',
    components: {

    },
    mounted() {
        let externalScript = document.createElement('link');
        externalScript.setAttribute('rel', "stylesheet");
        externalScript.setAttribute('href', "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css");
        externalScript.setAttribute('integrity', "sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO");
        externalScript.setAttribute('crossorigin', "anonymous");
        document.head.appendChild(externalScript);

        externalScript = document.createElement('link');
        externalScript.setAttribute('rel', "preconnect");
        externalScript.setAttribute('href', "https://fonts.gstatic.com");
        document.head.appendChild(externalScript);

        externalScript = document.createElement('link');
        externalScript.setAttribute('rel', "stylesheet");
        externalScript.setAttribute('href', "https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap");
        document.head.appendChild(externalScript);

        externalScript = document.createElement('link');
        externalScript.setAttribute('rel', "stylesheet");
        externalScript.setAttribute('href', "https://fonts.googleapis.com/css2?family=Merriweather:wght@300&display=swap");
        document.head.appendChild(externalScript);
        
        externalScript = document.createElement('link');
        externalScript.setAttribute('rel', "stylesheet");
        externalScript.setAttribute('href', "https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap");
        document.head.appendChild(externalScript);
    },
}
</script>

<style>
body {
    font-family: 'Source Sans Pro', sans-serif !important;
}

#mynav-class {
    background-color: #f4c983 !important;
}

#mynav-class > .nav-item {
    font-family: 'Merriweather', serif;
}

/*Imported from CP2*/
@import '../legacy/styles.css'
</style>
