<template>
    <div class="poll-view">
        <div class="poll-view__title" v-html="question.text"></div>
        <div class="poll-view__results">
            <div class="result" v-for="(answer, index) in question.answers" :key="index">
                <div class="title">
                    {{ answer.text }}
                    <span class="percent">{{ calculatePercent(answer.votes)}}% </span>
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
import axios from 'axios'

export default {
    name: "poll-view",
    props: {
        getResultUrl: {
            type: String,
            default: "http://localhost:3000/results/",
        },
    },
    data() {
        return {
            question: {},
            votes: {},
            questionId: null,
            totalVotes: 0,
            result: false,
        };
    },
    mounted() {
        this.questionId = this.$route.params.questionId;
        axios.get(this.getResultUrl + this.questionId)
        .then((res) => {
            this.question = res.data.question;
            res.data.votes.forEach(vote => {
                this.votes[vote._id] = vote.count;
                this.totalVotes += vote.count;
            });
            this.question.answers = this.question.answers
            .map(answer => Object.assign(answer, { votes: this.votes[answer._id] || 0 }));
        })
        .catch((error) => {
            error.request.res.destroy()
        })
    },
    methods: {
        calculatePercent(votes) {
            return parseInt(10000 * votes / this.totalVotes) / 100;
        },
    }
};
</script>

<style lang="scss">
    @import "../assets/pollice.scss";
</style>