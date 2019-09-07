<template>
    <div class="poll-view">
        <div class="poll-view__title">Poll list</div>
        <div class="poll-view__inner">
            <div v-for="(question, index) in questions" :key="index" class="poll-view__code px-20-pc mb-4">
                <div class="question-title mb-2 py-2">
                    <span class="question-index">{{index+1}}</span>
                    <span class="question-text mx-4">{{ question.text }}</span>
                    <router-link :to="{ name: 'poll-detail', params: { questionId: question._id }}">
                        <img class="icon-edit" src="../assets/icon-edit.png" alt="">
                    </router-link>&nbsp;
                    <router-link :to="{ name: 'vote', params: { questionId: question._id }}">
                        <img class="icon-voting" src="../assets/icon-voting.png" alt="">
                    </router-link>
                </div>
                <div class="input-has-copy">
                    <input class="poll-input mb-2" :id="question._id" :value="'#poll=' + question._id" type="text"/>
                    <img class="icon-copy" src="../assets/icon-copy.png" alt="" @click="copy(question._id)">
                </div>
            </div>
        </div>
        <div class="poll-view__submit">
            <router-link :to="{ name: 'poll-new' }">
                <button class="btn btn-save">New</button>
            </router-link>
        </div>
    </div>
</template>

<script>
    import api from '../services/api'

    export default {
        name: 'poll-create',
        data() {
            return {
                questions: {},
            }
        },
        mounted() {
            api.getPolls((err, data) => {
                if (!err) this.questions = data
            })
        },
        methods: {
            copy(questionId) {
                let codeToCopy = document.getElementById(questionId);
                codeToCopy.setAttribute('type', 'text');
                codeToCopy.select();
                document.execCommand('copy')
            },
        },
    }
</script>

<style lang="scss">
    @import '../assets/pollice.scss';
</style>
