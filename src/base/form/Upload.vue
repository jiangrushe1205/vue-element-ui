<template>
    <el-upload ref="upload"
            class="upload-demo"
            action="/#/indexm"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
             multiple
            :limit="limit"
            :on-exceed="handleExceed"
            :list-type="listType"
            :auto-upload="autoUpload"
            :data="submitData"
            :before-upload="beforeAvatarUpload"
               :http-request="uploadFile">
        <el-button v-if="autoUpload"  size="small" type="primary">点击上传</el-button>
        <el-button v-if="!autoUpload" slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button v-if="!autoUpload"  style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传{{fileType}}文件，且不超过{{limitSize}}kb</div>
    </el-upload>
</template>

<script>
    export default {
        computed: {
        },
        props: {
            // 服务器上传url
            action: {
                type: String,
                defalut: ''
            },
            // 监听预览
            listenPreview: {
                type: Boolean,
                defalut: false
            },
            // 监听移除
            listenDelete: {
                type: Boolean,
                defalut: false
            },
            // 监听移除
            listenDelete: {
                type: Boolean,
                defalut: false
            },
            // 是否支持多文件上传
            multiple: {
                type: Boolean,
                defalut: false
            },
            // 限制文件上传个数
            limit: {
                type: Number,
                defalut: 1
            },
            // 文件列表样式 text/picture/picture-card
            listType: {
                type: String,
                defalut: 'picture-card'
            },
            // 设置文件类型
            fileType: {
                type: String,
                defalut: ''
            },
            // 设置文件大小 默认 字节
            limitSize: {
                type: Number,
                defalut: 1024
            },
            // 是否自动上传
            autoUpload: {
                type: Boolean,
                defalut: false
            },
            // 上传文件额外参数
            submitData: {
                type: Object,
                defualt: {}
            },
            isReflush: {
                type: Boolean,
                defalut: true
            }
        },
        data () {
            return  {
                isValidate:true,
                percentage: 0,
                formData:{},
                fileList:[]
            }
        },
        methods: {
            handleRemove (file, fileList) {
                console.log(file, fileList)
            },
            handlePreview (file) {
                console.log(file)
            },
            handleExceed (files, fileList) {
                this.$message.warning('当前限制选择 ' + this.limit + ' 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件');
            },
            beforeRemove (file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`)
            },
            beforeAvatarUpload (file) {

                let isJPG = false
                console.log(file.type  + '---图片验证')
                if (file.type !== null && file.type !== '') {
                    isJPG = this.fileType.indexOf(file.type) > -1;
                }
                const isLtKb = file.size / 1024  < this.limitSize;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 ' + this.fileType + ' 格式!');
                }
                if (!isLtKb) {
                    this.$message.error('上传头像图片大小不能超过 ' + this.limitSize + 'k!');
                }

                this.isValidate = isJPG && isLtKb
                console.log(this.isValidate + '---图片验证')
                return this.isValidate;
            },
            uploadFile:function(files){
                this.formData.append('file', files.file);
            },
            onSuccess () {
            },
            submitUpload () {
                this.formData = new FormData()
                this.$refs.upload.submit();
                if(!this.isValidate){
                    return
                }

                for (let k in this.submitData) {
                    console.log('k = ' + k)
                    console.log('value = ' + this.submitData[k])
                    this.formData.append(k, this.submitData[k]);
                }
                this.$_UPLOAD(this.$_APIPATH.upload.moreUploadFiles, this.formData).then((req) => {
                    if(req.data.code === 0){
                        this.$emit('imagesListFlaush')
                        this.$emit('imgListReflush')
                        this.ruleForm = {}
                        this.$message({
                            message: '上传成功',
                            type: 'success'
                        });
                        this.$refs.upload.clearFiles();

                        setTimeout(1000,function () {
                            this.ruleForm = req.data.info;
                        })
                    }else{
                        this.error({
                            message: '上传失败'
                        });
                    }
                })
            }
        }
    }
</script>
