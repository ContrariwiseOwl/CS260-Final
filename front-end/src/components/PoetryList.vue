<template>
    <div class="poetry-list">
        <div class="poem" v-for="poem in poems" :key="poem._id">
            <p v-if="poem.author.namePreference"><strong>{{poem.title}}</strong> by {{poem.author.firstName}} {{poem.author.lastName}}</p>
            <p v-else><strong>{{poem.title}}</strong> by {{poem.author.username}}</p>
            <div class="stanza">
                <ul>
                    <li v-for="line in poem.content" :key="line">{{line}}</li>
                </ul>
            </div>
        </div>
    </div>             
</template>

<script>
export default {
    name: 'PoetryList',
    props: {
        poems: Array
    },
}
</script>

<style scoped>
.poem {
    padding: 6px 12px;
}

.poetry-list {
    margin-bottom: 30px;
}
</style>