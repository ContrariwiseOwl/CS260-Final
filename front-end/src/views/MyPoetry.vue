<template>
<div class="background-page">
    <div class="main-page">
        <div class="logo-box mini-logo-title">
                    <img src="/images/logo-mobile.png"/>
                    <h1>My Poetry</h1>
                </div>
        <div v-if="noName">
            <div class="welcome">
                <p>Write, edit, and submit your own poetry. Please be consistent about what name you write under.</p>
            </div>
            <div id="nameInput">
                <form v-on:submit.prevent="logIn">
                    <input type="text" v-model="userName"/>
                    <button type="submit">Set User</button>
                </form>
            </div>
        </div>
        <div class="wrapper" v-else>
            <div v-if="!editId || editId == -1">
                
                <form class="poem-input" v-on:submit.prevent="addPoem">
                    <p>Create a New Poem</p>
                    <input type="text" v-model="title" placeholder="Poem Title"/>
                    <input type="text" v-model="form" placeholder="Poetry Form"/>
                    <div class="stanza">
                        <ul>
                            <li v-for="line in lines" :key="line">{{line}}</li>
                        </ul>
                    </div>
                    <form class="add-line-wrap" v-on:submit.prevent="addLine">
                        <input type="text" v-model="newLine" placeholder="Add line to poem"/>
                        <button type="submit">Add Line</button>
                    </form>
                    <button type="submit">Add Poem</button>
                </form>
            </div>
            <div>
                <p>To delete or edit an existing poem, enter its title here:</p>
                <form class="poem-input" v-on:submit.prevent="editPoem(title)">
                    <input type="text" v-model="title" placeholder="Poem Title"/>
                    <button type="submit">Edit Poem</button>
                </form>
                <p v-if="editId == -1">No poem with provided title has this user as its author.</p>
            </div>
            <PoemEditor v-if="editId !== null && editId !== -1" :poem="this.$root.$data.poems[editId - 1]"/>
            <form v-if="editId !== null && editId !== -1" v-on:submit.prevent="closeEditor" style="margin-bottom: 20px;">
                <button type="submit">Close Editor</button>
            </form>
            <PoetryList :poems="poems" />
        </div>
    </div>
</div>
</template>

<script>
import PoetryList from '/src/components/PoetryList'
import PoemEditor from '/src/components/PoemEditor'

export default {
    name: 'MyPoetry',
    components: {
        PoetryList,
        PoemEditor
    },
    data() {
        return {
            noName: true,
            editor: false,
            editId: null,
            userName: '',
            title: '',
            newLine: '',
            lines: [],
            form: '',
        }
    },
    computed: {
        poems() {
            return this.$root.$data.poems.filter( poem => poem.author == this.userName);
        },
        id() {
            return this.$root.$data.poems.length + 1;
        }
    },
    methods: {
        logIn() {
            this.noName = false;
        },
        addPoem() {
            this.$root.$data.poems.push({
                id: this.id,
                title: this.title,
                content: this.lines,
                author: this.userName,
                form: this.form
            });
            this.title = '';
            this.lines = [];
            this.form = '';
        },
        addLine() {
            this.lines.push(this.newLine);
            this.newLine = '';
        },
        editPoem(poemTitle) {
            let index = this.$root.$data.poems.findIndex( poem => poem.title == poemTitle);
            if (index === -1) {
                this.editId = index;
            }
            else {
                this.editId = this.$root.$data.poems[index].id;
            }
        },
        closeEditor() {
            this.editId = null;
        }
    }
}
</script>

<style scoped>
#nameInput {
    padding-bottom: 15px;
    text-align: center;
}

.poem-input {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 25px;
    width: 100%;
}

.poem-input > div, .poem-input > form, .poem-input > input, .poem-input > button {
    margin-top: 8px;
}

.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.add-line-wrap {
    width: 100%;
}

@media only screen and (min-width: 401px) and (max-width: 960px) {
    .add-line-wrap > input {
        width: 350px;
    }
}

@media only screen and (min-width: 961px) {
    .add-line-wrap > input {
        width: 500px;
    }
}
</style>