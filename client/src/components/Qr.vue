<template>
    <qrcode :value="qrUrl" :options="{ width: 500 }"></qrcode>
</template>

<script>
import env from '../config/env'

export default {
    name: 'qr-view',
    data() {
        return {
            qrUrl: null,
        }
    },
    mounted() {
        const questionId = this.$route.params.questionId
        this.qrUrl = "https://qr.id.vin/hook?url=" + env.serverUrl + "/qr/" + questionId + "&method=GET"
    }
}
</script>