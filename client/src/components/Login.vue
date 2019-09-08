<template>
    <div class="poll-view">
        <div class="poll-view__title">
            <h1>Welcome to Pollice app</h1>
        </div>
        <g-signin-button
            :params="googleSignInParams"
            @success="onSignInSuccess"
            @error="onSignInError"
        >Sign in with Google Email</g-signin-button>

        <h2>Download Chrome Extension <a href="https://gitlab.com/betalabdev/pollice/-/archive/master/pollice-master.zip?path=chrome_extension">here</a>.</h2>
    </div>
</template>

<script>
import api from '../services/api'
import env from '../config/env'

export default {
    data() {
        return {
            googleSignInParams: {
                client_id: env.clientId,
            },
        }
    },
    computed: {
        isLoggedIn: function() {
            return this.$store.getters['auth/isLoggedIn']
        },
    },
    methods: {
        onSignInSuccess(googleUser) {
            var id_token = googleUser.getAuthResponse().id_token
            api.auth({ idtoken: id_token }, (err, token) => {
                if (!err) {
                    this.$store.dispatch(
                        'auth/login',
                        token['token'],
                        googleUser
                    )
                    this.$router.push('/')
                } else {
                    this.$store.dispatch(
                        'auth/handleError',
                        token['token'],
                        googleUser
                    )
                    this.$router.push({ name: 'login' })
                }
            })
        },
        onSignInError(error) {
            this.$router.push({ name: 'login' })
        },
    },
}
</script>

<style>
.g-signin-button {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 3px;
    background-color: #3c82f7;
    color: #fff;
    box-shadow: 0 3px 0 #0f69ff;
}
</style>