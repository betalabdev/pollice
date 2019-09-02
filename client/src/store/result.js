const namespaced = true

const state = {
    question: {},
}

const getters = {
    getResult: state => state.question,
}

const mutations = {
    updateResult: (state, payload) => {
        state.question = payload
    },
}

const actions = {
    setResult: ({ commit }, payload) => {
        commit('updateResult', payload)
    },
}

export default {
    namespaced,
    state,
    getters,
    mutations,
    actions,
}
