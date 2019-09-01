<template>
    <div class="poll-view">
        <div class="poll-view__title" v-html="question.text"></div>
        <div v-if="!result" class="poll-view__inner">
            <div class="poll-view__help">
                <span v-if="question.multiple">Choose many answers:</span>
                <span v-else>Choose one answer:</span>
            </div>
            <div class="poll-view__votes">
                <div v-for="(answer, index) in question.answers" :key="answer._id" class="answer">
                    <label class="checkbox">{{ answer.text }}
                        <input type="checkbox" v-model="question.answers[index].voted" @change="multipleCheck(index)">
                        <span class="checkmark"></span>
                    </label>
                </div>
            </div>
            <div class="poll-view__submit">
                <button @click="vote">Vote</button>
            </div>
            <div class="poll-view__info" :class="{'success' : success === true, 'error' : success === false}" v-if="success !== null">
                <div v-if="success === true">Voted</div>
                <div v-if="success === false">Error</div>
            </div>
        </div>

        <div v-if="result" class="poll-view__results">
            Thank you for voting!
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "poll-view",
    props: {
        getPollUrl: {
            type: String,
            default: "http://localhost:3000/polls/",
        },
        saveVoteUrl: {
            type: String,
            default: "http://localhost:3000/votes/",
        },
    },
    data() {
        return {
            question: {},
            questionId: null,
            totalVotes: 0,
            result: false,
            success: null,
            isValid: false
        };
    },
    mounted() {
        this.questionId = this.$route.params.questionId;
        axios.get(this.getPollUrl + this.questionId)
        .then((res) => {
            this.question = res.data;
        })
        .catch((error) => {
            error.request.res.destroy()
        })
    },
    methods: {
        vote() {
            this.validate()
            if (this.isValid) {
                axios.post(this.saveVoteUrl + this.questionId, {
                    userId: "User 1",
                    answerIds: this.votes
                })
                .then(() => {
                    this.alert(true)
                })
                .catch((error) => {
                    this.alert(false)
                    error.request.res.destroy()
                });
            } else {
                this.alert(false)
            }
        },
        multipleCheck(index) {
            if (this.question.multiple == true) return;
            const nrOfVotes = this.question.answers.filter(ans => ans.voted).length
            if (nrOfVotes > 1) {
                this.question.answers[index].voted = false;
            }
        },
        validate() {
            this.votes = this.question.answers.filter(answer => answer.voted).map(answer => answer._id);
            if (this.votes.length) {
                if (this.votes.length > 1) {
                    if (this.question.multiple == true) {
                        this.isValid = true
                    } else {
                        this.isValid = false;
                    }
                } else {
                    this.isValid = true
                }
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
    }
};
</script>

<style lang="scss">
    @import "../assets/pollice.scss";
</style>