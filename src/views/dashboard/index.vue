<template>
    <div class="app-container">
        <el-row>
            <el-col :span="4">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>卡片名称</span>
                        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                    </div>
                    <div v-for="o in 4" :key="o" class="text item">
                        {{'列表内容 ' + o }}
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'Dashboard',
        computed: {
            ...mapGetters([
                'name',
                'roles'
            ])
        }
    }
</script>

<style rel="stylesheet/less" lang="less" scoped>


</style>
