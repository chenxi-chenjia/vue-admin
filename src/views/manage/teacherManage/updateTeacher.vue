<template>
    <div class="app-container">
        <el-form
            label-width="120px"
            label-position="right"
            v-loading.body="loading"
            status-icon
            :rules="rules"
            ref="form"
            :model="formData"
        >

            <el-row type="flex" align="middle">

                <!--头像-->
                <el-col class="avatar-box" :offset="3">
                    <div class="avatar-label">
                        头像
                    </div>
                    <div class="avatar">
                        <img class="avatar-img" :src="formData.avatar" alt="">
                        <input
                            ref="avatarInput"
                            accept="image/jpg,image/jpeg,image/png,image/gif"
                            @change="updateAvatar"
                            type="file"
                            class="avatar-input"/>
                    </div>
                </el-col>

            </el-row>

            <el-row>

                <!--用户名-->
                <el-col :span="8" :offset="3">
                    <el-form-item
                        label="用户名"
                        prop="username"
                    >
                        <el-input
                            maxlength="20"
                            minlength="5"
                            :clearable="true"
                            v-model="formData.username"
                            placeholder="请输入用户名"
                            :disabled="true"
                        />
                    </el-form-item>
                </el-col>

            </el-row>

            <el-row>

                <el-col :span="8" :offset="3">
                    <el-form-item
                        label="权限"
                        prop="roleId"
                    >
                        <el-select v-model="formData.roleId" clearable style="width: 100%;" placeholder="请选择">
                            <el-option
                                v-for="item in userRole"
                                :key="item.id"
                                :label="item.roleDiscribe"
                                :value="item.id"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="8" :offset="2">
                    <el-form-item
                        label="所属学校"
                        :required="true"
                        prop="schoolId"
                    >
                        <el-select v-model="formData.schoolId" clearable style="width: 100%;" placeholder="请选择">
                            <el-option
                                v-for="item in schools"
                                :key="item.id"
                                :label="item.schoolDiscribe"
                                :value="item.id"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>

            </el-row>

            <el-row>

                <el-col :span="8" :offset="3">
                    <el-form-item
                        label="姓名"
                        prop="name"
                    >
                        <el-input
                            maxlength="20"
                            :clearable="true"
                            v-model="formData.name"
                            placeholder="请输入姓名"
                        />
                    </el-form-item>
                </el-col>

            </el-row>

            <el-row>

                <el-col :span="8" :offset="3">
                    <el-form-item
                        label="手机号码"
                        prop="phoneNumber"
                    >
                        <el-input
                            maxlength="11"
                            :clearable="true"
                            v-model="formData.phoneNumber"
                            placeholder="请输入手机号码"
                        />
                    </el-form-item>
                </el-col>

                <el-col :span="8" :offset="2">
                    <el-form-item
                        label="邮箱"
                        prop="email"
                    >
                        <el-input
                            maxlength="20"
                            :clearable="true"
                            v-model="formData.email"
                            placeholder="请输入邮箱"
                        />
                    </el-form-item>
                </el-col>

            </el-row>

            <el-row>
                <el-col :span="18" :offset="3">
                    <el-form-item
                        label="地址"
                        prop="address"
                    >
                        <el-input
                            maxlength="200"
                            :clearable="true"
                            v-model="formData.address"
                            placeholder="请输入地址"
                        />
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="18" :offset="3">
                    <el-form-item
                        label="备注"
                        prop="remark"
                    >
                        <el-input
                            maxlength="200"
                            :clearable="true"
                            v-model="formData.remark"
                            placeholder="请输入备注"
                        />
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col style="text-align: center;">
                    <el-button
                        type="primary"
                        @click="submitForm('form')"
                    >
                        确定
                    </el-button>
                    <el-button
                        type="danger"
                        @click="deleteFrom('form')"
                    >
                        删除
                    </el-button>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>

    import avatarImg from '@/assets/avatarDefault.svg'
    import { findAllSchools } from "@/api/schools";
    import { findAllUserRole } from "@/api/userRole";
    import {
        searchUsernameCount,
        searchPhoneNumberCount,
        searchEmailCount,
        searchNameCount,
        getTeacherInfoById,
        updateTeacherInfoByAdmin,
        deleteTeacher,
    } from '@/api/teacher'
    import { validatNumCase, validateEmail, validatePhoneNumber } from '@/utils/validate'

    export default {
        name: 'addTeacher',
        data(){

            //验证username
            const validatorUsername = (rule, username, callback) => {
                if ( ! validatNumCase(username) ){
                    callback(new Error('请输入大小写字母数字的用户名'))
                    return
                }

                if ( this.userInfo.username == username ){
                    callback()
                    return
                }

                searchUsernameCount({
                    username
                }).then((res) => {
                    if ( res.data.errorCode == 1 ){
                        callback(new Error(res.data.errorMessage))
                    } else {
                        callback()
                    }
                })
            }

            const validatorName = (rule, name, callback) => {
                console.log(name)
                console.log(this.userInfo.name)
                if ( ! name ){
                    callback(new Error('请输入姓名'))
                    return
                }

                if ( this.userInfo.name == name ){
                    callback()
                    return
                }

                searchNameCount({
                    name
                }).then((res) => {
                    if ( res.data.errorCode == 1 ){
                        callback(new Error(res.data.errorMessage))
                    } else {
                        callback()
                    }
                })
            }

            const validatorPhoneNumber = (rule, phoneNumber, callback) => {
                if ( ! validatePhoneNumber(phoneNumber) ){
                    callback(new Error('请输入正确的手机号码'))
                    return
                }

                if ( this.userInfo.phoneNumber == phoneNumber ){
                    callback()
                    return
                }

                searchPhoneNumberCount({
                    phoneNumber
                }).then((res) => {
                    if ( res.data.errorCode == 1 ){
                        callback(new Error(res.data.errorMessage))
                    } else {
                        callback()
                    }
                })
            }

            const validatorEmail = (rule, email, callback) => {
                if ( ! validateEmail(email) ){
                    callback(new Error('请输入正确的邮箱'))
                    return
                }

                if ( this.userInfo.email == email ){
                    callback()
                    return
                }

                searchPhoneNumberCount({
                    email
                }).then((res) => {
                    if ( res.data.errorCode == 1 ){
                        callback(new Error(res.data.errorMessage))
                    } else {
                        callback()
                    }
                })
            }

            return {
                formData: {
                    username: '',
                    password: '123',
                    avatar: avatarImg,
                    schoolId: '',
                    address: '',
                    email: '',
                    name: '',
                    phoneNumber: '',
                    remark: '',
                    roleId: '',
                },
                userInfo: {},
                rules: {
                    username: [ {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    }, {
                        validator: validatorUsername,
                        trigger: 'blur'
                    } ],
                    name: [ {
                        required: true,
                        message: '请输入姓名',
                        trigger: 'blur'
                    }, {
                        validator: validatorName,
                        trigger: 'blur'
                    } ],
                    phoneNumber: [ {
                        required: true,
                        message: '请输入手机号',
                        trigger: 'blur'
                    }, {
                        validator: validatorPhoneNumber,
                        trigger: 'blur'
                    } ],
                    email: [ {
                        validator: validatorEmail,
                        trigger: 'blur'
                    } ],
                    roleId: [ {
                        required: true,
                        message: '请选择权限',
                        trigger: 'change'
                    } ],
                    schoolId: [ {
                        required: true,
                        message: '请选择学校',
                        trigger: 'change'
                    } ]
                },

                //获取数据显示loading框，加载完成为true
                getSchoolLoading: true,
                getUserRoleLoading: true,
                bodyLoading: true,

                schools: [],
                userRole: [],

                // 判断是否点击员工列表进入
                userId: '',
            }
        },
        computed: {
            loading(){
                return ! (
                    this.getSchoolLoading &&
                    this.getUserRoleLoading &&
                    this.bodyLoading
                )
            }
        },

        methods: {

            // 修改头像
            updateAvatar(file){
                const fileReader = new FileReader()
                fileReader.onload = (evt) => {
                    this.formData.avatar = evt.target.result
                }
                fileReader.readAsDataURL(file.target.files[ 0 ])
            },

            // 获取全部学校
            getSchools(){
                this.getSchoolLoading = false
                findAllSchools().then((res) => {
                    if ( res.data.errorCode !== 0 ){
                        this.$message.error(res.data.errorMessage)
                    } else {
                        this.schools = res.data.data
                    }
                    this.getSchoolLoading = true
                }).catch(() => {
                    this.getSchoolLoading = true
                })
            },

            // 获取所有用户权限
            getUserRole(){
                this.getUserRoleLoading = false
                findAllUserRole().then((res) => {

                    if ( res.data.errorCode !== 0 ){
                        this.$message.error(res.data.errorMessage)
                    } else {
                        this.userRole = res.data.data
                    }
                    this.getUserRoleLoading = true
                }).catch(() => {
                    this.getUserRoleLoading = true
                })
            },

            // 重置表单
            resetForm(formName){
                this.$refs[ formName ].resetFields()
            },


            //管理员修改员工信息
            submitForm(formName){
                this.$refs[ formName ].validate((valid) => {
                    if ( valid ){
                        this.$confirm('您确定要修改此员工？', '修改提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                        }).then(() => {
                            this.updateTeacherInfo()
                        })
                    } else {
                        console.log('请检查输入项后重新提交');
                        return false;
                    }
                })
            },

            updateTeacherInfo(){
                this.bodyLoading = false
                const {
                    formData
                } = this
                updateTeacherInfoByAdmin({
                    ...formData
                }).then((res) => {
                    if ( res.data.errorCode != 0 ){
                        this.$message.error(res.data.errorMessage)
                    } else {
                        this.$message.success(res.data.errorMessage)

                        this.userInfo = {
                            ...this.formData
                        }
                    }


                    this.bodyLoading = true

                }).catch(() => {
                    this.bodyLoading = true
                })
            },

            // 通过userId获取员工信息
            getTeacherInfo(userId){
                this.bodyLoading = false
                getTeacherInfoById({
                    userId
                }).then((res) => {
                    if ( res.data.errorCode != 0 ){
                        this.$message.error(res.data.errorMessage)

                        setTimeout(() => {
                            this.$router.back()
                        }, 2000)
                    } else {
                        this.userInfo = {
                            ...res.data.data
                        }

                        this.formData = {
                            ...res.data.data
                        }
                    }

                    this.bodyLoading = true
                }).catch(() => {
                    this.bodyLoading = true
                })
            },

            deleteFrom(){
                if ( this.userId ){
                    this.$confirm('您确定要删除此员工？', '删除提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'error',
                    }).then(() => {
                        this.deleteTeacher()
                    })
                } else {
                    this.$message.error('无此用户')
                }
            },
            deleteTeacher(){
                const userId = this.userId
                if ( ! userId ){
                    this.$message.info('用户不存在')
                    return
                }

                this.bodyLoading = false
                deleteTeacher({
                    userId
                }).then((res) => {
                    if ( res.data.errorCode != 0 ){
                        this.$message.error(res.data.errorMessage)
                    } else {
                        this.$message.success(res.data.errorMessage)
                        setTimeout(() => {
                            this.$router.back()
                        }, 2000)
                    }

                    this.bodyLoading = true
                }).catch(() => {
                    this.bodyLoading = true
                })
            }

        },
        created(){
            const { userId } = this.$router.history.current.query

            this.getSchools()
            this.getUserRole()

            if ( userId ){
                this.getTeacherInfo(userId)
                this.userId = userId
            } else {
                this.$message.error('查询失败')
                setTimeout(() => {
                    this.$router.back()
                }, 2000)
            }

        }
    }
</script>

<style scoped lang="less">

    .avatar-box {
        width: 240px;
        display: flex;
        align-items: center;
        margin-bottom: 22px;
    }

    .avatar-label {
        width: 120px;
        text-align: right;
        padding-right: 12px;
    }

    .avatar {
        width: 120px;
        height: 120px;
        position: relative;
        border: 1px solid #dcdfe6;
        border-radius: 50%;
        overflow: hidden;
    }

    .avatar-img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
    }

    .avatar-input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        opacity: 0;
        cursor: pointer;
    }
</style>
