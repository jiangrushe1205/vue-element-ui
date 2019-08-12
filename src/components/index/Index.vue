<template>
    <div class="m-layout">
        <layout :model="model" height="100%" width="250px">
            <Nav></Nav>
        </layout>
    </div>
</template>
<script>
    import Layout from 'base/layout/Layout'
    import Nav from 'components/nav/Nav'
    export default {
        name: 'index',
        components: {
            Layout, Nav
        },
        data () {
            return {
                model: 1
            }
        }
    }
</script>

<style scoped>
    .m-layout {
        width: 100%;
        height: 100%;
    }
</style>
