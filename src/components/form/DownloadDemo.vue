<template>
    <Download ref="download" :url="url" @click="download"></Download>
</template>
<script>
    import Download from 'base/form/Download'
    export default {
        components: {
            Download
        },
        data () {
            return {
                url: this.$_APIPATH.upload.download
            }
        },
        methods: {
            download () {
                this.$refs.download.download();
            }
        }

    }
</script>
