<!-- 暂时没有封装。请勿使用 -->
<template>
    <slot></slot>
</template>

<script>
    export default {
        methods: {
            open() {
                this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', 'HTML 片段', {
                    dangerouslyUseHTMLString: true
                });
            }
        }
    }
</script>
