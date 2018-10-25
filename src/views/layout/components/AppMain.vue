<template>
    <section class="app-main">
        <transition name="fade-transform" mode="out-in">
            <div class="app-container">
                <div class="app-box">
                    <el-scrollbar class="scroll-bar" wrap-class="scrollbar-wrapper">
                        <router-view/>
                    </el-scrollbar>
                </div>
            </div>
            <!-- or name="fade" -->
            <!-- <router-view :key="key"></router-view> -->
        </transition>
    </section>
</template>

<script>
    export default {
        name: 'AppMain',
        computed: {
            // key() {
            //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
            // }
        }
    }
</script>

<style scoped>
    .app-main {
        /*50 = navbar  */
        height: calc(100vh - 50px);
        position: relative;
        overflow: hidden;
        background-color: #f8f8f8;
    }

    .app-container {
        box-sizing: border-box;
        height: 100%;
    }

    .app-box {
        height: 100%;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
        border: 1px solid #ebeef5;
        background-color: #fff;
        border-radius: 10px;
    }

    .scroll-bar {
        height: 100%;
    }

</style>
