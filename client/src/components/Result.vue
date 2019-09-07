<template>
    <div class="poll-view">
        <div class="poll-view__title" v-html="question.text"></div>
        <div v-if="!question.openEnded" class="poll-view__results">
            <bar-chart :data="getChartData(result)" />
        </div>
        <div v-if="question.openEnded" class="poll-view__results px-20-pc">
            <div class="result" v-for="(response, index) in responses" :key="index">
                <div class="title">{{ index + 1 }}. {{ response.text }}</div>
            </div>
        </div>
        <!--<div class="position-relative py-4">-->
            <!--<router-link :to="{ name: 'poll-list' }">-->
                <!--<div class="icon">-->
                    <!--<div class="arrow"></div>-->
                    <!--<span class="text-back">Back list</span>-->
                <!--</div>-->
            <!--</router-link>-->
        <!--</div>-->
    </div>
</template>

<script>
import api from '../services/api'
import VueCharts from 'vue-chartjs'
import BarChart from './BarChart'

export default {
    name: 'poll-view',
    components: { BarChart },
    data() {
        return {
            questionId: null,
            question: {},
        }
    },
    computed: {
        responses() {
            return this.$store.getters['result/getResponses']
        },
        result() {
            return this.$store.getters['result/getResult']
        },
    },
    mounted() {
        this.questionId = this.$route.params.questionId
        api.getPoll(this.questionId, (err, question) => {
            if (!err) {
                this.question = question
                if (question.openEnded) {
                    api.getResponses(this.questionId, (err, responses) => {
                        if (!err)
                            this.$store.dispatch(
                                'result/setResponses',
                                responses
                            )
                    })
                } else {
                    api.getResult(this.questionId, (err, result) => {
                        if (!err)
                            this.$store.dispatch('result/setResult', result)
                    })
                }
            }
        })
        this.$wsConnect(this.questionId)
    },
    methods: {
        calculatePercent(votes) {
            return parseInt((10000 * votes) / this.result.totalVotes) / 100 || 0
        },
        getLabel(votes) {
            return votes < 2 ? 'vote' : 'votes'
        },
        getChartData(result) {
            if (!result.answers) return
            return {
                labels: result.answers.map(a => a.text),
                datasets: [
                    {
                        label: result.text,
                        backgroundColor: '#f87979',
                        data: result.answers.map(a => a.votes),
                    },
                ],
            }
        },
    },
}
</script>

<style lang="scss">
@import '../assets/pollice.scss';
</style>