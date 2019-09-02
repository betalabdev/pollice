<template>
    <div class="poll-view">
        <div class="poll-view__title" v-html="question.text"></div>
        <div class="poll-view__results">
            <div class="result" v-for="(answer, index) in question.answers" :key="index">
                <div class="title">
                    {{ answer.text }}
                    <span class="percent">{{ calculatePercent(answer.votes)}}%</span>
                    <span class="votes">({{ answer.votes }} votes)</span>
                </div>
                <div class="bar">
                    <div :style="{width: calculatePercent(answer.votes) + '%'}"></div>
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
        }
    },
    computed: {
        question() {
            return this.$store.getters['result/getResult']
        },
    },
    mounted() {
        this.questionId = this.$route.params.questionId
        api.getResult(this.questionId, (err, question) => {
            if (!err) this.$store.dispatch('result/setResult', question)
        })
        this.$wsConnect()
    },
    methods: {
        calculatePercent(votes) {
            return parseInt((10000 * votes) / this.question.totalVotes) / 100 || 0
        },
    },
}
</script>

<style lang="scss">
@import '../assets/pollice.scss';
</style>