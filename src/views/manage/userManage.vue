<template>
    <div class="app-container">
        <el-row type="flex" justify="space-between">
            <el-col :span="12">
                <el-input
                    style='width:340px;'
                    placeholder="请输入要查询的内容"
                    prefix-icon="el-icon-search"
                    v-model="searchInput"
                />
                <el-button
                    type="primary"
                    icon="document"
                    @click="searchHandle"
                    style="margin-left: 30px;"
                >
                    搜索
                </el-button>
            </el-col>
            <el-col style="text-align: right;">
                <router-link to="/userManage/teacherManage/addTeacher">
                    <el-button
                        type="primary"
                        icon="document"
                        style="margin-left: 30px;"
                    >
                        添加员工
                    </el-button>
                </router-link>
            </el-col>
        </el-row>

        <div style="height:20px;"></div>

        <el-table
            v-loading="listLoading"
            :data="list"
            border
            fit
            element-loading-text="拼命加载中"
            highlight-current-row
            @row-click="tableRowClick"
            style="width: 100%;">

            <el-table-column label="Id" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.userId}}</span>
                </template>
            </el-table-column>

            <el-table-column label="姓名" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.username }}</span>
                </template>
            </el-table-column>

            <el-table-column label="用户角色" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.userDescribe }}</span>
                </template>
            </el-table-column>

            <el-table-column label="电话" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.phoneNumber }}</span>
                </template>
            </el-table-column>

            <el-table-column label="所属" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.schoolDiscribe }}</span>
                </template>
            </el-table-column>

            <el-table-column label="备注" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.remark }}</span>
                </template>
            </el-table-column>

        </el-table>

        <div style="height: 20px;"></div>
        <el-row>
            <el-col :span="24">
                <el-pagination
                    style="float: right;"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :total="listTotalNum"
                    :current-page="currentPage"
                    :page-sizes="[10,15,20,25]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                >
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script>

    import { searchTeacherBySearchContent } from '@/api/teacher'

    export default {
        name: 'permission',
        data(){
            return {
                list: [],
                listLoading: false,
                searchInput: '',
                currentPage: 1,
                pageSize: 10,
                listTotalNum: 0,
            }
        },
        computed: {},
        methods: {
            searchHandle(){
                //搜索按钮
                this.fetchData()
            },
            handleSizeChange(pageSize){
                //更改每页条数
                this.pageSize = pageSize
                this.currentPage = 1
                this.list = []
                this.searchHandle()
            },
            handleCurrentChange(currentPage){
                //更改当前页数
                this.currentPage = currentPage
                this.searchHandle()
            },
            tableRowClick(row, event, column){
                const { userId } = row
                this.$router.push({
                    path: '/userManage/teacherManage/addTeacher',
                    params: {
                        userId
                    }
                })
            },

            fetchData(){
                this.listLoading = true
                const limitStart = this.pageSize * (this.currentPage - 1)
                const limit = this.pageSize
                const {
                    startTime,
                    endTime,
                    searchContent,
                } = this

                searchTeacherBySearchContent({
                    startTime,
                    endTime,
                    searchContent,
                    limitStart,
                    limit
                }).then((res) => {
                    this.listLoading = false
                    this.list = res.data.data.list
                    this.listTotalNum = res.data.data.total
                }).catch(() => {
                    this.listLoading = false
                })
            },

        }
    }
</script>

<style scoped lang="less">

</style>
