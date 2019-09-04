<template>
    <div class="poll-view">
        <div class="poll-view__title" v-html="question.text"></div>
        <div v-if="!question.openEnded" class="poll-view__results">
            <div class="result" v-for="(answer, index) in result.answers" :key="index">
                <div class="title">
                    {{ answer.text }}
                    <span class="percent">{{ calculatePercent(answer.votes)}}%</span>
                    <span class="votes"> ({{ answer.votes }} {{ getLabel(answer.votes) }})</span>
                </div>
                <div class="bar">
                    <div :style="{width: calculatePercent(answer.votes) + '%'}"></div>
                </div>
            </div>
        </div>
        <div v-if="question.openEnded" class="poll-view__results">
            <div class="result" v-for="(response, index) in responses" :key="index">
                <div class="title">
                    {{ index + 1 }}. {{ response.text }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../services/api'

export default {
    name: 'poll-view',
    data() {
        return {
            questionId: null,
            question: {},
        }
    },
    computed: {
        result() {
            return this.$store.getters['result/getResult']
        },
        responses() {
            return this.$store.getters['result/getResponses']
        },
    },
    mounted() {
        this.questionId = this.$route.params.questionId
        api.getPoll(this.questionId, (err, question) => {
            if (!err) {
                this.question = question
                if (question.openEnded) {
                    api.getResponses(this.questionId, (err, responses) => {
                        if (!err) this.$store.dispatch('result/setResponses', responses)
                    })
                } else {
                    api.getResult(this.questionId, (err, result) => {
                        if (!err) this.$store.dispatch('result/setResult', result)
                    })
                }
            }
        })
        this.$wsConnect(this.questionId)
    },
    methods: {
        calculatePercent(votes) {
            return parseInt((10000 * votes) / this.question.totalVotes) / 100 || 0
        },
        getLabel(votes) {
            return votes < 2 ? 'vote' : 'votes'
        },
    },
}
</script>

<style lang="scss">
@import '../assets/pollice.scss';
</style>