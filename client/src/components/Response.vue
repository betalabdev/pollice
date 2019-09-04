<template>
    <div class="poll-view">
        <div class="poll-view__title" v-html="question.text"></div>
        <div v-if="!result" class="poll-view__inner">
            <div class="poll-view__help">
                <span>Draft your response:</span>
            </div>
            <div class="poll-view__votes">
                <input type="text" v-model="response" />
            </div>
            <div class="poll-view__submit">
                <button @click="submit">Submit</button>
            </div>
            <div
                class="poll-view__info"
                :class="{'success' : success === true, 'error' : success === false}"
                v-if="success !== null"
            >
                <div v-if="success === true">Voted</div>
                <div v-if="success === false">Error</div>
            </div>
        </div>

        <div v-if="result" class="poll-view__results">Thank you for your response!</div>
    </div>
</template>

<script>
import api from '../services/api'

export default {
    name: 'poll-view',
    data() {
        return {
            question: {},
            response: "",
            questionId: null,
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
        submit() {
            this.validate()
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
        validate() {
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