<template>
    <div class="poll-view">
        <div class="poll-view__title" v-html="question.text"></div>
        <div v-if="!result" class="poll-view__inner">
            <div v-if="!question.openEnded">
                <div class="poll-view__help">
                    <span v-if="question.multiple">Choose many answers:</span>
                    <span v-else>Choose one answer:</span>
                </div>
                <div class="poll-view__votes">
                    <div v-for="(answer, index) in question.answers" :key="answer._id" class="answer">
                        <label class="checkbox">
                            {{ answer.text }}
                            <input
                                type="checkbox"
                                v-model="question.answers[index].voted"
                                @change="multipleCheck(index)"
                            />
                            <span class="checkmark"></span>
                        </label>
                    </div>
                </div>
                <div class="poll-view__submit">
                    <button @click="vote">Vote</button>
                </div>
            </div>

            <div v-if="question.openEnded">
                <div class="poll-view__help">
                    <span>Draft your response:</span>
                </div>
                <div class="poll-view__votes">
                    <input type="text" v-model="response" />
                </div>
                <div class="poll-view__submit">
                    <button @click="submit">Submit</button>
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


        <div v-if="result" class="poll-view__results">Thank you for your {{ question.openEnded ? 'response' : 'vote' }}!</div>
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