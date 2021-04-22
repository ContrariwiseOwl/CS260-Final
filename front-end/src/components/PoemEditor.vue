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
            <button type="submit">Save &amp; Close</button>               
        </form>
        <form class="delete-box" v-on:submit.prevent="deletePoem">
            <button type="submit">Delete me <strong>FOREVER</strong></button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'PoemEditor',
    props: {
        poem: Object
    },
    data() {
        return {
            newLine: '',
            error: '',
        }
    },
    methods: {
        addLine() {
            this.poem.content.push(this.newLine);
            this.newLine = '';
        },
        async updatePoem() {
            this.error = '';
            try {
                await axios.put("/api/poems/" + this.poem._id, {
                    title: this.poem.title,
                    content: this.poem.content,
                    form: this.poem.form
                });
                this.$emit('close-editor');
            } catch (error) {
                this.error = error.response.data.message;
            }
        },
        async deletePoem() {
            this.error = '';
            try {
                await axios.delete("/api/poems/" + this.poem._id);
                this.$emit('close-editor');
            } catch (error) {
                this.error = error.response;
            }
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
    width: 68%;
    background-color: #f4c98396;
    padding-top: 10px;
    padding-bottom: 14px;
    border-radius: 10px 10px;
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

.delete-box {
    background-color: rgb(245, 4, 4);
    padding: 6px;
    border-radius: 6px 6px;
}

input {
    border-radius: 5px 5px;
    border: none;
}

button {
    border-radius: 5px 5px;
    padding-right: 2px;
    padding-left: 2px;
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