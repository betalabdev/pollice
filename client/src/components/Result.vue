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
            colors: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(255, 159, 64, 0.8)',
                'rgba(255, 205, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(201, 203, 207, 0.8)',
            ],
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
                        backgroundColor: this.colors,  // FIXME: Multiply this
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