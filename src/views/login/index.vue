<template>
    <div class="login-container">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
                 label-position="left">
            <div class="logo">
                <img src="@/assets/avatar.png" alt="">
            </div>
            <h3 class="title">用户登录</h3>
            <el-form-item prop="username">
                <span class="svg-container">
                  <svg-icon icon-class="user"/>
                </span>
                <el-input v-model="loginForm.username" name="username" type="text"
                          placeholder="请输入用户名"/>
            </el-form-item>
            <el-form-item prop="password">
                <span class="svg-container">
                    <svg-icon icon-class="password"/>
                </span>
                <el-input
                    :type="pwdType"
                    v-model="loginForm.password"
                    name="password"
                    auto-complete="on"
                    placeholder="请输入密码"
                    @keyup.enter.native="handleLogin"/>
                <span class="show-pwd" @click="showPwd">
                        <svg-icon icon-class="eye"/>
                    </span>
            </el-form-item>
            <el-form-item>
                <el-button :loading="loading" type="primary" style="width:100%;"
                           @click.native.prevent="handleLogin">
                    登录
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { isvalidUsername } from '@/utils/validate'

    export default {
        name: 'Login',
        data(){
            const validateUsername = (rule, value, callback) => {
                if ( ! value ){
                    callback(new Error('请输入正确的用户名'))
                } else {
                    callback()
                }
            }
            const validatePass = (rule, value, callback) => {
                if ( ! value.length ){
                    callback(new Error('密码不能小于5位'))
                } else {
                    callback()
                }
            }
            return {
                loginForm: {
                    username: 'admin',
                    password: 'admin'
                },
                loginRules: {
                    username: [ { required: true, trigger: 'blur', validator: validateUsername } ],
                    password: [ { required: true, trigger: 'blur', validator: validatePass } ]
                },
                loading: false,
                pwdType: 'password',
                redirect: undefined
            }
        },
        watch: {
            $route: {
                handler: function (route){
                    this.redirect = route.query && route.query.redirect
                },
                immediate: true
            }
        },
        methods: {
            showPwd(){
                if ( this.pwdType === 'password' ){
                    this.pwdType = ''
                } else {
                    this.pwdType = 'password'
                }
            },
            handleLogin(){
                this.$refs.loginForm.validate(valid => {
                    if ( valid ){
                        this.loading = true

                        this.$store.dispatch('Login', this.loginForm).then(() => {
                            this.loading = false
                            this.$router.push({ path: this.redirect || '/' })
                        }).catch(() => {
                            this.loading = false
                        })
                    } else {
                        console.log('输入有误，请重新输入')
                        return false
                    }
                })
            },

        },
        created(){

        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    $bg: #2d3a4b;
    $light_gray: #eee;

    /* reset element-ui css */
    .login-container {
        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;
            input {
                background: transparent;
                border: 0px;
                -webkit-appearance: none;
                border-radius: 0px;
                padding: 12px 5px 12px 15px;
                color: $light_gray;
                height: 47px;
                &:-webkit-autofill {
                    -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
                    -webkit-text-fill-color: #fff !important;
                }
            }
        }
        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }
    }

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
    $bg: #2d3a4b;
    $dark_gray: #889aa4;
    $light_gray: #eee;
    .login-container {
        position: fixed;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: $bg;
        background-image: url("../../assets/background.jpg");
        background-repeat: no-repeat;
        background-position: top center;
        .login-form {
            position: relative;
            max-width: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            padding: 70px 30px;
            min-width: 320px;
        }
        .tips {
            font-size: 14px;
            color: #fff;
            margin-bottom: 10px;
            span {
                &:first-of-type {
                    margin-right: 16px;
                }
            }
        }
        .svg-container {
            padding: 6px 5px 6px 15px;
            color: $dark_gray;
            vertical-align: middle;
            width: 30px;
            display: inline-block;
        }
        .title {
            font-size: 26px;
            font-weight: 400;
            color: $light_gray;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
        .show-pwd {
            position: absolute;
            right: 10px;
            top: 7px;
            font-size: 16px;
            color: $dark_gray;
            cursor: pointer;
            user-select: none;
        }
    }

    .logo {
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        top: 0;
    }

</style>
