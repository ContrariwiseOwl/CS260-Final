<template>
    <div class="wrapper">
        <form class="poem-input" v-on:submit.prevent="updatePoem">
            <input type="text" v-model="poem.title" placeholder="Poem Title"/>
            <input type="text" v-model="poem.form" placeholder="Poetry Form" style="margin-bottom: 15px;"/>
            <form class="line-wrap" v-for="n in poem.content.length" :key="n">
                <input type="text" v-model="poem.content[n - 1]" />
            </form>
            <form class="add-line-wrap" v-on:submit.prevent="addLine">
                <input type="text" v-model="newLine" placeholder="Add line to poem"/>
                <button type="submit">Add Line</button>
            </form>
        </form>
    </div>
</template>

<script>
export default {
    name: 'PoemEditor',
    props: {
        poem: Object
    },
    data() {
        return {
            newLine: ''
        }
    },
    methods: {
        addLine() {
            this.poem.content.push(this.newLine);
            this.newLine = '';
        }
    }
}
</script>

<style scoped>
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

.line-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.add-line-wrap {
    display: flex;
    justify-content: center;
    width: 100%;
}

@media only screen and (min-width: 401px) and (max-width: 960px) {
    .add-line-wrap > input, .line-wrap > input {
        width: 350px;
    }
}

@media only screen and (min-width: 961px) {
    .add-line-wrap > input, .line-wrap > input {
        width: 500px;
    }
}
</style>