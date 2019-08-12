<template>
    <div>
        <el-button type="primary" @click="download">下载</el-button>
    </div>
</template>
<script>
    export default {
        props: {
            url:{
                type: String,
                default: ''
            }
        },
        methods:{
            download () {
                if (this.url) {
                    this.$_DOWNLOAD(this.$_APIPATH.upload.download);
                }
            }
        }
    }
</script>
