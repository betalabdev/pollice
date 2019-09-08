<template>
    <p>You have been logged out! <a href="/login">Click here to log in.</a></p>
</template>

<script>
export default {
    name : 'log-out',
    mounted() {
        this.$store.dispatch('auth/logout');
    },
}
</script>
