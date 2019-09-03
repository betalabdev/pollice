<template>
    <div class="poll-view">
        <div class="poll-view__title">Poll list</div>
        <div class="poll-view__inner">
            <div v-for="(question, index) in questions" :key="index" class="poll-view__question">
                <h2>
                    {{index+1}}. {{ question.text }} <router-link :to="{ name: 'poll-detail', params: { questionId: question._id }}">&#9997;</router-link>
                </h2>
                <input :value="'#poll=' + question._id" type="text" />
            </div>
        </div>
        <div class="poll-view__submit">
            <router-link :to="{ name: 'poll-new' }"><button>New</button></router-link>
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
}
</script>

<style lang="scss">
@import '../assets/pollice.scss';
</style>