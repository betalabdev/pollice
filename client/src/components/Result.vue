<template>
    <div class="poll-view">
        <div class="poll-view__title" v-html="question.text"></div>
        <div v-if="!question.openEnded" class="poll-view__results">
            <div v-if="question.multiple" class="chart-container">
                <bar-chart :result="result" />
            </div>
            <div v-else>
                <pie-chart :result="result" class="chart-container"/>
            </div>
        </div>
        <div v-else class="poll-view__results px-20-pc">
            <div v-if="!question.wordCloud">
                <div class="ended-question d-flex mb-6" v-for="(response, index) in words" :key="index">
                    <div class="index">{{ index + 1 }}</div>
                    <div class="answer">{{ response.text }}</div>
                </div>
            </div>
            <div v-else>
                <vue-word-cloud
                    :words="words"
                    :color="color"
                    :rotation="rotation"
                    font-family="Roboto"
                    style="width: 100%; height: 375px;"
                    class="section"
                />
            </div>
        </div>
    </div>
</template>

<script>
import VueWordCloud from 'vuewordcloud'
import Chance from 'chance'

import VueCharts from 'vue-chartjs'
import BarChart from './BarChart'
import PieChart from './PieChart'

import api from '../services/api'

export default {
    name: 'poll-view',
    components: { BarChart, PieChart, VueWordCloud },
    data() {
        return {
            questionId: null,
            question: {},
            words: [],
            colors: ['#ffd077', '#3bc4c7', '#3a9eea', '#ff4e69', '#461e47'],
            rotations: [0, 1 / 8, 3 / 4, 7 / 8],
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
    watch: {
        responses: function() {
            this.words = this.responses.map(r => ({
                text: r._id,
                weight: r.count,
            }))
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
        rotation(word) {
            var chance = new Chance(word.text)
            return chance.pickone(this.rotations)
        },
        color(word) {
            var chance = new Chance(word.text)
            return chance.pickone(this.colors)
        },
    },
}
</script>

<style lang="scss">
@import '../assets/pollice.scss';
</style>