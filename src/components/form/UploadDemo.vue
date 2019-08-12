<template>
    <div>
        <UpLoad :action="action"
                :listen-preview="listenPreview"
                :listen-delete="listenDelete"
                :multiple="multiple"
                :limit="limit"
                :list-type="listType"
                :file-type="fileType"
                :limit-size="limitSize"
                :auto-upload="autoUpload"
                :submit-data="submitData"
                :fileList="fileData"
                @imagesListFlaush="imagesListFlaush"
                :isReflush="isReflush"></UpLoad>
        <el-table
                :data="fileData"
                style="width: 100%">

            <el-table-column
                    prop="name"
                    label="文件名字"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="url"
                    label="地址">
            </el-table-column>
            <el-table-column
                    label="头像"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px"><a @click="_lookImage(scope.row.name)">查看</a></span>
                    <span style="margin-left: 10px"><a @click="_download(scope.row.name)">下载</a></span>
                </template>
            </el-table-column>
        </el-table>

        <!-- 增加修改 -->
        <el-dialog
                title="查看头像"
                :visible.sync="dialogImages"
                width="400px"
                height="400px"
                :before-close="imagesClose">
            <img :src="currentImage" ref="currentImage"  style="width: 300px;height: 300px;"/>
        </el-dialog>
    </div>

</template>

<script>
    import UpLoad from 'base/form/Upload'
    export default {
        created () {
            this._initData()
        },
        components: {
            UpLoad
        },
        data () {
            return {
                isReflush:true,
                dialogImages: false,
                action: '',
                // 监听预览事件
                listenPreview: true,
                // 监听移除事件
                listenDelete: true,
                // 是否支持多文件上传
                multiple: true,
                // 限制上传个数
                limit: 3,
                // 文件列表样式
                listType: 'text',
                // 上传文件类型
                fileType: 'image/jpeg',
                // 上传文件大小 默认KB
                limitSize: 1024,
                // 是否自动上传
                autoUpload:false,
                // 用户自定义参数
                submitData: {
                    id: '123456'
                },
                fileData: [],
                currentImage: false
            }
        },
        methods: {
            _initData () {
                this.$_POST(this.$_APIPATH.upload.read).then( res =>{
                    this.fileData = res.data.data
                })
            },
            imagesClose (done) {
                done()
            },
            imagesListFlaush () {
                this.fileData = []
                this._initData()
            },
            _lookImage (val) {
                this.dialogImages = true
                this.currentImage = this.$_LOOK(this.$_APIPATH.upload.download ,{
                    images: val
                })
            },
            _download (val) {
                this.$_DOWNLOAD(this.$_APIPATH.upload.download ,{
                    images: val
                })
            },
        }
    }
</script>
