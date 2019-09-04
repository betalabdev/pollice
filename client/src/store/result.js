const namespaced = true

const state = {
    question: {},
    responses: [],
}

const getters = {
    getResult: state => state.question,
    getResponses: state => state.responses,
}

const mutations = {
    updateResult: (state, payload) => {
        state.question = payload
    },
    updateResponses: (state, payload) => {
        state.responses = payload
    },
    addResponse: (state, payload) => {
        state.responses.push(payload)
    }
}

const actions = {
    setResult: ({ commit }, payload) => {
        commit('updateResult', payload)
    },
    setResponses: ({ commit }, payload) => {
        commit('updateResponses', payload)
    },
    addResponse: ({ commit }, payload) => {
        commit('addResponse', payload)
    }
}

export default {
    namespaced,
    state,
    getters,
    mutations,
    actions,
}