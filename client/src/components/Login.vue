<template>
  <g-signin-button
    :params="googleSignInParams"
    @success="onSignInSuccess"
    @error="onSignInError">
    Sign in with Google Email
  </g-signin-button>
</template>

<script>
import api from '../services/api'
import env from '../config/env'

export default {
  data () {
    return {
      googleSignInParams: {
        client_id: env.secretKey
      }
    }
  },
  computed : {
    isLoggedIn : function(){ return this.$store.getters["auth/isLoggedIn"]}
  },
  methods: {
    onSignInSuccess (googleUser) {
      var id_token = googleUser.getAuthResponse().id_token
      api.auth({idtoken: id_token}, (err, token) => {
          if (!err) {
            this.$store.dispatch('auth/login', token, googleUser)
            this.$router.push('/')
          } else {
            this.$store.dispatch('auth/handleError', token, googleUser)
            this.$router.push('/login')
          }
        }
      )
    },
    onSignInError (error) {
      console.log('OH NOES', error)
    }
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