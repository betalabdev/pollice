<template>
    <div class="poll-view">
        <div class="poll-view__title">
            New poll
        </div>
        <div class="poll-view__inner">
            <div class="poll-view__question">
                <input v-model="question.text" type="text" placeholder="Your Question...">
            </div>
            <div class="poll-view__answers">
                <div v-for="(answer, index) in question.answers" :key="index" class="answer" :style="{zIndex: question.answers.length - index}">
                    <input :placeholder="'Answer ' + (index + 1)" @focus="createNewInput(index)" v-model="question.answers[index].text" type="text">
                    <span class="delete" @click="deleteInput(index)">delete</span>
                </div>
            </div>
            <div class="poll-view__options">
                <label class="checkbox">Allow multiple votes
                    <input v-model="question.multiple" type="checkbox" checked="checked">
                    <span class="checkmark"></span>
                </label>
            </div>
            <div class="poll-view__submit">
                <button @click="createPoll">Create</button>
            </div>
            <div class="poll-view__info" :class="{'success' : success === true, 'error' : success === false}" v-if="success !== null">
                <div v-if="success === true">Created</div>
                <div v-if="success === false">Error</div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "poll-create",
    props: {
        savePollUrl: {
            type: String,
            default: "http://localhost:3000/polls"
        },
    },
    data() {
        return {
            question: {
                presenterId: "admin",
                text: "How old are you?",
                answers: [
                    { text: "10-20" },
                    { text: "21-30" },
                    { text: "31-40" },
                    { text: "" }
                ],
                multiple: false
            },
            isValid: false,
            success: null
        };
    },
    mounted () {
        if (this.question.answers.length == 0) {
            this.question.answers.push({answer: ""})
        }
    },
    methods: {
        createNewInput(index) {
            if (this.question.answers.length - 1 == index) {
                this.question.answers.push({ answer: "" });
            }
        },
        deleteInput(index) {
            if (index > 0 || this.question.answers.length > 1) {
                this.question.answers.splice(index, 1);
            }
        },
        createPoll() {
            this.validate();
            if (this.isValid) {
                axios.post(this.savePollUrl, this.question)
                .then(() => {
                    this.alert(true)
                    setTimeout(() => {this.resetPoll()}, 1500)
                })
                .catch((error) => {
                    this.alert(false)
                    error.request.res.destroy()
                });
            } else {
                this.alert(false)
            }
        },
        resetPoll() {
            this.question.multiple = false;
            this.question.answers = [];
            this.question.answers.push({answer: ""})
            this.question.answers.push({answer: ""})
            this.question.answers.push({answer: ""})
            this.question.text = ""
            this.isValid = false
        },
        validate () {
            this.question.answers = this.question.answers
                .filter(answer => answer.text && answer.text.length);
            var count = this.question.answers.length
            if (count > 1) {
                this.isValid = true;
            } else  {
                this.isValid = false;
            }
        },
        alert(success) {
            this.success = success
            setTimeout(() => {this.success = null}, 3000)
        }
    }
};
</script>

<style lang="scss">
    @import "../assets/pollice.scss";
</style>