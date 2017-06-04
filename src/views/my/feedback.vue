<template>
    <div>
        <headerBar :titleText="titleText" :isBack="isBack"></headerBar>
        <el-form action="">
            <textarea v-model="form.textarea" name="" id="" cols="30" rows="10"></textarea>
            <el-button :disabled="canNot" @click="submit">提交</el-button>
        </el-form>
    </div>
</template>
<script>
    import headerBar from 'components/common-components/header-bar'
    import xhr from 'services/service'
    import { MessageBox } from 'mint-ui'
    import { sellerId, userId } from 'store/storage'
    export default {
        data() {
            return {
                titleText: '反馈',
                isBack: true,
                sellerId: sellerId,
                userId: userId,
                form: {
                    textarea: ''
                }
            }
        },
        components: {
            headerBar
        },
        computed: {
            canNot() {
                let flag = true
                if (this.form.textarea.length == 0) {
                    flag = true
                } else {
                    flag = false
                }
                return flag
            }
        },
        methods: {
            submit() {
                let query = { User_Id: this.userId, storeId: this.sellerId, content: this.form.textarea }
                xhr.Feedback({ query }).then((res) => {
                    let msg = res
                    MessageBox.confirm(msg).then((res) => {
                        this.$router.push({
                            name: 'my'
                        })
                    })
                }).catch((err) => {
                    console.log('test fail', err)
                })
            }
        }
    }

</script>
<style scoped>
    textarea {
        width: 100%;
        border: none;
    }
    
    .el-button {
        width: 100%;
        margin-top: .2rem;
        /*padding: .2rem;*/
        background: #fd7144;
        color: #fff;
    }
</style>