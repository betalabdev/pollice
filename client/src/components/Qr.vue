<template>
    <qrcode :value="qrUrl" :options="{ width: 500 }"></qrcode>
</template>

<script>
export default {
    name: 'qr-view',
    data() {
        return {
            qrUrl: null,
        }
    },
    mounted() {
        this.questionId = this.$route.params.questionId
        this.qrUrl = "https://qr.id.vin/hook?url=http://www.mocky.io/v2/5d7324c62f00009dbb7d4f07"
    }
}
</script>