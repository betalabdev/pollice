import axios from 'axios'

const baseUrl = "http://127.0.0.1:3000";

export default {
    getResult(questionId, callback) {
        axios
            .get(`${baseUrl}/results/${questionId}`)
            .then(res => {
                let totalVotes = 0
                const votes = {}
                const question = res.data.question
                res.data.votes.forEach(vote => {
                    votes[vote._id] = vote.count
                    totalVotes += vote.count
                })
                question.answers = question.answers.map(answer =>
                    Object.assign(answer, {
                        votes: votes[answer._id] || 0,
                    })
                )
                question.totalVotes = totalVotes
                callback(null, question)
            })
            .catch(error => {
                callback(error)
            })
    },
}