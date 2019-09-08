<template>
    <p>
        You have been logged out!
        <router-link :to="{ name: 'login' }">Click here to login</router-link>.
    </p>
</template>

<script>
export default {
    name: 'log-out',
    mounted() {
        this.$store.dispatch('auth/logout')
    },
}
</script>
