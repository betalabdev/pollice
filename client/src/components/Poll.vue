<template>
    <div class="poll-view">
        <div class="poll-view__title">{{ questionId ? 'Edit poll' : 'New poll' }}</div>
        <div class="poll-view__inner">
            <div class="poll-view__question">
                <input class="poll-input" v-model="question.text" type="text" placeholder="Your Question..."/>
            </div>
            <div class="poll-view__answers">
                <div
                        v-for="(answer, index) in question.answers"
                        :key="index"
                        class="answer"
                        :style="{zIndex: question.answers.length - index}"
                >
                    <input class="poll-input"
                           :placeholder="'Answer ' + (index + 1)"
                           @focus="createNewInput(index)"
                           v-model="question.answers[index].text"
                           type="text"
                    />
                    <span class="delete" @click="deleteInput(index)">X</span>
                </div>
            </div>
            <div class="poll-view__options">
                <div class="custom-checkbox">
                    <label for="multiple" class="label-cbx">
                        <input v-model="question.multiple" id="multiple" type="checkbox" class="invisible">
                        <div class="checkbox">
                            <svg width="48" height="48" viewBox="0 0 48 48">
                                <circle cx="24" cy="24" r="11" stroke="#C8CCD4" stroke-width="2" fill="#ffffff"></circle>
                                <polyline points="19 26 24 29 29 18"></polyline>
                            </svg>
                        </div>
                        <span>Allow multiple votes</span>
                    </label>
                </div>

                <div class="custom-checkbox">
                    <label for="openEnded" class="label-cbx">
                        <input v-model="question.openEnded" id="openEnded" type="checkbox" class="invisible">
                        <div class="checkbox">
                            <svg width="48" height="48" viewBox="0 0 48 48">
                                <circle cx="24" cy="24" r="11" stroke="#C8CCD4" stroke-width="2" fill="#ffffff"></circle>
                                <polyline points="19 26 24 29 29 18"></polyline>
                            </svg>
                        </div>
                        <span>Is open-ended question</span>
                    </label>
                </div>
            </div>
            <div class="poll-view__submit">
                <button class="btn btn-save"
                        @click="upsertPoll"
                >{{ questionId ? 'Update' : 'Save' }}
                </button>
            </div>
            <div
                    class="poll-view__info"
                    :class="{'success' : success === true, 'error' : success === false}"
                    v-if="success !== null"
            >
                <div v-if="success === true">{{ questionId ? 'Updated' : 'Created' }}</div>
                <div v-if="success === false">Error</div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '../services/api'

    export default {
        name: 'poll-create',
        data() {
            return {
                question: {
                    presenterId: 'admin',
                    text: 'Question text...',
                    answers: [
                        {text: 'Option 1'},
                        {text: 'Option 2'},
                        {text: 'Option 3'},
                        {text: ''},
                    ],
                    multiple: false,
                    openEnded: false,
                },
                isValid: false,
                success: null,
                questionId: null,
            }
        },
        mounted() {
            this.questionId = this.$route.params.questionId;
            if (this.questionId) {
                api.getPoll(this.questionId, (err, question) => {
                    if (!err) this.question = question;
                })
            } else {
                if (this.question.answers.length == 0) {
                    this.question.answers.push({answer: ''})
                }
            }
        },
        methods: {
            createNewInput(index) {
                if (this.question.answers.length - 1 == index) {
                    this.question.answers.push({answer: ''})
                }
            },
            deleteInput(index) {
                if (index > 0 || this.question.answers.length > 1) {
                    this.question.answers.splice(index, 1)
                }
            },
            upsertPoll() {
                if (this.questionId) this.updatePoll()
                else this.createPoll()
            },
            createPoll() {
                this.validate()
                if (this.isValid) {
                    api.createPoll(this.question, (err) => {
                        if (err) this.alert(false)
                        else {
                            this.alert(true)
                            setTimeout(() => {
                                this.$router.push({name: 'poll-list'})
                            }, 1500)
                        }
                    })
                } else {
                    this.alert(false)
                }
            },
            updatePoll() {
                this.validate()
                if (this.isValid) {
                    api.updatePoll(this.questionId, this.question, (err, question) => {
                        if (err) this.alert(false)
                        else {
                            this.alert(true)
                            this.questionId = question._id
                        }
                    })
                } else {
                    this.alert(false)
                }
            },
            validate() {
                this.question.answers = this.question.answers.filter(
                    answer => answer.text && answer.text.length
                )
                var count = this.question.answers.length
                if (count > 1) {
                    this.isValid = true
                } else {
                    this.isValid = false
                }
            },
            alert(success) {
                this.success = success
                setTimeout(() => {
                    this.success = null
                }, 3000)
            },
        },
    }
</script>

<style lang="scss">
    @import '../assets/pollice.scss';
</style>
