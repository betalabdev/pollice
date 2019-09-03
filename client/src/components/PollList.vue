<template>
    <div class="poll-view">
        <div class="poll-view__title">Poll list</div>
        <div class="poll-view__inner">
            <div v-for="(question, index) in questions" :key="index" class="poll-view__code">
                <h2>
                    {{index+1}}. {{ question.text }}&nbsp;
                    <router-link
                        :to="{ name: 'poll-detail', params: { questionId: question._id }}"
                    >&#9997;</router-link>&nbsp;
                    <router-link :to="{ name: 'vote', params: { questionId: question._id }}">&#9995;</router-link>
                </h2>
                <input :id="question._id" :value="'#poll=' + question._id" type="text" />
                <button @click="copy(question._id)">Copy code</button>
            </div>
        </div>
        <div class="poll-view__submit">
            <router-link :to="{ name: 'poll-new' }">
                <button>New</button>
            </router-link>
        </div>
    </div>
</template>

<script>
import api from '../services/api'

export default {
    name: 'poll-create',
    data() {
        return {
            questions: {},
        }
    },
    mounted() {
        api.getPolls((err, data) => {
            if (!err) this.questions = data
        })
    },
    methods: {
        copy(questionId) {
            let codeToCopy = document.getElementById(questionId)
            codeToCopy.setAttribute('type', 'text')
            codeToCopy.select()
            document.execCommand('copy')
        },
    },
}
</script>

<style lang="scss">
@import '../assets/pollice.scss';
</style>