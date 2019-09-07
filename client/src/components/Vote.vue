<template>
    <div class="poll-view">
        <div class="poll-view__title" v-html="question.text"></div>
        <div v-if="!result" class="poll-view__inner">
            <div class="px-20-pc" v-if="!question.openEnded">
                <div class="poll-view__help">
                    <div class="question-title mb-2 py-2">
                        <span class="question-text" v-if="question.multiple">Choose many answers:</span>
                        <span class="question-text" v-else>Choose one answer:</span>
                    </div>
                </div>
                <div class="poll-view__votes mb-4">
                    <div class="custom-checkbox" v-for="(answer, index) in question.answers" :key="answer._id">
                        <label :for="[index+1]" class="label-cbx">
                            <input v-model="question.answers[index].voted" @change="multipleCheck(index)" type="checkbox" :id="[index+1]" class="invisible">
                            <div class="checkbox">
                                <svg width="48" height="48" viewBox="0 0 48 48">
                                    <circle cx="24" cy="24" r="11"></circle>
                                    <polyline points="19 26 24 29 29 18"></polyline>
                                </svg>
                            </div>
                            <span class="checkbox-title">{{ answer.text }}</span>
                        </label>
                    </div>
                </div>
                <div class="poll-view__submit">
                    <button class="btn btn-save" @click="vote">Vote</button>
                </div>
            </div>

            <div class="px-20-pc" v-if="question.openEnded">
                <div class="poll-view__help question-title mb-4">
                    <span class="question-text">Draft your response:</span>
                </div>
                <div class="poll-view__votes">
                    <input type="text" class="poll-input" v-model="response" />
                </div>
                <div class="poll-view__submit">
                    <button class="btn btn-save" @click="submit">Submit</button>
                </div>
            </div>

            <div
                class="poll-view__info"
                :class="{'success' : success === true, 'error' : success === false}"
                v-if="success !== null"
            >
                <div v-if="success === true">{{ question.openEnded ? 'Submitted' : 'Voted' }}</div>
                <div v-if="success === false">Error</div>
            </div>
        </div>


        <div v-if="result">
            <div class="thank-voting">Thank you for your {{ question.openEnded ? 'response' : 'vote' }}!</div>
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

export default {
    name: 'poll-view',
    data() {
        return {
            question: {},
            questionId: null,
            response: "",
            result: false,
            success: null,
            isValid: false,
        }
    },
    mounted() {
        this.questionId = this.$route.params.questionId
        api.getPoll(this.questionId, (err, question) => {
            if (!err) this.question = question
        })
    },
    methods: {
        vote() {
            this.validateVote()
            if (this.isValid) {
                api.vote(
                    this.questionId,
                    {
                        userId: 'User 1',
                        answerIds: this.votes,
                    },
                    err => {
                        if (err) this.alert(false)
                        else this.alert(true)
                    }
                )
            } else {
                this.alert(false)
            }
        },
        submit() {
            this.validateResponse()
            if (this.isValid) {
                api.response(
                    this.questionId,
                    {
                        userId: 'User 1',
                        questionId: this.questionId,
                        text: this.response,
                    },
                    err => {
                        if (err) this.alert(false)
                        else this.alert(true)
                    }
                )
            } else {
                this.alert(false)
            }
        },
        multipleCheck(index) {
            if (this.question.multiple == true) return
            const nrOfVotes = this.question.answers.filter(ans => ans.voted)
                .length
            if (nrOfVotes > 1) {
                this.question.answers = this.question.answers.map((answer, i) =>
                    Object.assign(answer, { voted: i != index ? false : true })
                )
            }
        },
        validateVote() {
            this.votes = this.question.answers
                .filter(answer => answer.voted)
                .map(answer => answer._id)
            if (this.votes.length) {
                if (this.votes.length > 1) {
                    if (this.question.multiple == true) {
                        this.isValid = true
                    } else {
                        this.isValid = false
                    }
                } else {
                    this.isValid = true
                }
            } else {
                this.isValid = false
            }
        },
        validateResponse() {
            if (this.response) {
                this.isValid = true
            } else {
                this.isValid = false
            }
        },
        alert(success) {
            this.success = success
            setTimeout(() => {
                this.success = null
                this.result = success
            }, 1500)
        },
    },
}
</script>

<style lang="scss">
@import '../assets/pollice.scss';
</style>