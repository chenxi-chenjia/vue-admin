<template>
    <el-menu class="navbar" mode="horizontal">
        <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
        <breadcrumb/>


        <el-dropdown class="avatar-container" style="margin-right: 35px;" trigger="hover">
            <div class="avatar-wrapper navbar-item">
                <i class="iconfont myicon-user"></i>
            </div>
            <el-dropdown-menu slot="dropdown" class="user-dropdown">
                <router-link class="inlineBlock" to="/">
                    <el-dropdown-item>
                        Home
                    </el-dropdown-item>
                </router-link>
                <el-dropdown-item divided>
                    <span style="display:block;" @click="logout">LogOut</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>

        <div class="avatar-wrapper navbar-item avatar-container">
            <el-badge style="height: 20px;line-height: 20px;" :value="12">
                <svg-icon style="width: 20px;height: 20px;vertical-align: middle;" icon-class="notifier"></svg-icon>
            </el-badge>
        </div>


        <transition name="fade-transform" mode="out-in">
            <div
                @click="searchBtnClick"
                class="avatar-wrapper navbar-item avatar-container"

            >
                <i class="el-icon-search" style="color: #515151;"></i>
            </div>
        </transition>

        <transition name="fade-transform" mode="out-in">
            <el-autocomplete
                ref="searchInput"
                @blur="searchBtnShow = !searchBtnShow"
                v-if="!searchBtnShow"
                class="search-input"
                v-model="searchContent"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                :trigger-on-focus="false"
                @select="handleSelect"
            >
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-autocomplete>
        </transition>

    </el-menu>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Breadcrumb from '@/components/Breadcrumb'
    import Hamburger from '@/components/Hamburger'

    export default {
        components: {
            Breadcrumb,
            Hamburger
        },
        computed: {
            ...mapGetters([
                'sidebar',
                'avatar'
            ])
        },
        data(){
            return {
                searchContent: '',
                searchBtnShow: true,
            }
        },
        methods: {
            toggleSideBar(){
                this.$store.dispatch('ToggleSideBar')
            },
            logout(){
                this.$store.dispatch('LogOut').then(() => {
                    location.reload() // 为了重新实例化vue-router对象 避免bug
                })
            },
            querySearch(querySearch, cb){
                console.log(this.$router)
                //输入搜索
                console.log(querySearch)
                cb([ { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
                    { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" }, ])
            },
            handleSelect(item){

            },
            searchBtnClick(){
                this.searchBtnShow = false
                setTimeout(() => {
                    this.$refs.searchInput.focus()
                }, 500)
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .navbar {
        height: 50px;
        line-height: 50px;
        border-radius: 0px !important;
        overflow: hidden;
        .hamburger-container {
            line-height: 58px;
            height: 50px;
            float: left;
            padding: 0 10px;
        }
        .screenfull {
            position: absolute;
            right: 90px;
            top: 16px;
            color: red;
        }
        .avatar-container {
            height: 50px;
            float: right;
            cursor: pointer;
            .avatar-wrapper {
                cursor: pointer;
                margin-top: 5px;
                position: relative;
                .user-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }
                .el-icon-caret-bottom {
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }

    .search-input {
        float: right;
        margin-right: 30px;
    }

    .navbar-item {
        display: inline-block;
        padding: 0 20px;
        margin-top: 0 !important;
    }

    .navbar-item:hover {
        background: #f9f9f9;
    }
</style>

