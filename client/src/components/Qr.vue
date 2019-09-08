<template>
    <div class="poll-view text-center d-flex">
        <qrcode :value="qrUrl" :options="{ width: 500 }"></qrcode>
    </div>
</template>

<script>
    import VueQrcode from '@chenfengyuan/vue-qrcode';
    import env from '../config/env'

    export default {
        name: 'qr-view',
        components: {[VueQrcode.name]: VueQrcode},
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