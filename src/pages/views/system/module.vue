<template>
    <div class="table-box" style="margin:0;" :class="{'table-blockinfo':info,'table-block':!info}">
        <div class="search" style="height:62px;" v-if="getSearch">
            <div class="floatlefts" v-if="textSearch">
                <el-input placeholder="请输入内容" v-model="textSearchValue" @change="handleSearch">
                    <el-select v-model="textSearchKey" slot="prepend" placeholder="请选择" @change="handleSearch">
                        <el-option v-for="item in textSearchInfo" :key="item.value" :value="item.value" :label="item.label"></el-option>
                    </el-select>
                </el-input>
            </div>
            <div class="floatlefts" v-if="handleback">
                <div class="btn-group dropdown" dropdown="">
                    <a class="btn btn-default" @click="lessonrouter($event,'/hours/lessons')">返回</a>
                </div>
            </div>
            <div class="floatlefts" v-if="dateSearch">
                <div class="block">
                    <el-date-picker v-model="datevalue" type="daterange" align="left" placeholder="选择日期范围" :picker-options="pickerOptions" @change="handleSearch">
                    </el-date-picker>
                </div>
            </div>
            <div class="floatlefts" v-if="selectSearch">
                <template v-for="item in selectSearchInfo">
                    <lb-selectesearch @input="handleSearch" v-model="selectsearchValue" :selected="selStudentAddInquiry" :default="item.text" :showdialog="item.showdialog" :searchfield="item.search" :table="item.table"></lb-selectesearch>
                </template>
            </div>
            <div class="floatlefts" v-if="radioGroupSearch">
                <template v-for="item in radioGroupSearchInfo">
                    <el-radio-group v-model="radiovalue" @change="handleSearch">
                        <template v-for="(value,index) in item.labels">
                            <el-radio-button class="normalfont" :label="index">{{value.label}}</el-radio-button>
                        </template>
                    </el-radio-group>
                </template>
            </div>
            <div class="pull-right" v-if="groupBtnSearch">
                <el-button-group>
                    <template v-for="item in groupBtnSearchInfo">
                        <el-button style="float:right;" :type="item.type">
                            {{item.label}}</el-button>
                    </template>
                </el-button-group>
            </div>
            <div v-if="singleBtnSearch" class="pull-right">
                <template v-for="item in singleBtnSearchInfo">
                    <template v-if="item.exported">
                        <el-button style="float:right;margin-left:3px;padding:2.5px;position:relative;width: 68px;top: 10px;" :type="item.type" @click="getExported()" :icon="item.icon">{{item.label}}</el-button>
                    </template>
                    <template v-if="item.imported">
                        <input type="file" @change="getImported" style="float:right;margin-left:39px;width:69px;position:relative;top: 10px;font-size: 16px;left: -28px;">
                        <!-- <button style="width:57px;height:35px;line-height: 29px;">导入<input type="file" @change="getImported" style="float:right;margin-left:39px;width:69px;position:relative;top: -16px;font-size: 16px;left: 13px;z-index: 999;opacity: 0;"></button> -->
                    </template>
                    <template v-else-if="getActionOption(item.actionoption)">
                        <el-button style="float:right;margin-left:3px;" :type="item.type" @click="singleBtnAction(item)" :icon="item.icon">{{item.label}}</el-button>
                    </template>
                </template>
            </div>
        </div>
        <el-table ref="table" :data="moduleTableData" stripe border :class="getUpdata" highlight-current-row @current-change="handleTableChange" @selection-change="handleSelectionChange">
            <template v-for="(item,index) in textTableInfo">
                <template v-if="item.type=='checkbox'">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                </template>
                <template v-else-if="item.type=='operation'">
                    <el-table-column :label="item.label" width="90">
                        <template scope="scope">
                            <lb-dropdown :student="item.student" :drop-menu-data="getMenuOption" :menu-data="scope.row" @command="handleCommand">
                                <lb-dropdown-button slot="buttonslot" button-class="btn btn-xs btn-default" class="btn btn-info btn-xs">
                                    <i class="fa fa-cog"></i>操作
                                    <span class="caret"></span>
                                </lb-dropdown-button>
                            </lb-dropdown>
                        </template>
                    </el-table-column>
                </template>
                <template v-else-if="item.type!='checkbox'&&item.type!='operation'">
                    <el-table-column :label="item.label" :type="item.expand?'expand':''">
                        <template scope="scope">
                            <template v-if="item.type=='postbutton'">
                                <el-button type="success" size="mini" @click="postMsg(scope.row)">发送报价</el-button>
                            </template>
                            <template v-if="item.type=='tableexpand'">
                                <!-- <lb-systemmodule :module="item.props" :info="true" :search-value="$store.state.envs.currStudent._id"></lb-systemmodule> -->
                            </template>
                            <template v-if="item.type=='constant'">
                                {{item.prop}}
                            </template>
                            <template v-if="item.type=='lessonrouter'">
                                <a class="link" @click="lessonrouter($event,item.prop,scope.row)">排课详情</a>
                            </template>
                            <template v-if="item.type=='getPic'">
                                <img :src="scope.row[item.prop]" style="height:90px">
                            </template>
                            <template v-if="item.type=='teachertype'">
                                <el-tag type="success">{{ scope.row[item.prop] == '0' ? '全职':'兼职' }}</el-tag>
                            </template>
                            <template v-if="item.type=='notwrite'">
                                {{scope.row[item.prop].length>0?scope.row[item.prop]:'未填写'}}
                            </template>
                            <template v-if="item.type=='payment'">
                                {{getDictText('2',scope.row[item.prop])}}
                            </template>
                            <template v-if="item.type=='lessoncount'">
                                {{ scope.row[item.prop]?scope.row[item.prop].length:0 }}
                            </template>
                            <template v-if="item.type=='content'">
                                <el-tooltip :content="scope.row[item.prop]" placement="top">
                                    <el-button>{{ scope.row[item.prop]}}</el-button>
                                </el-tooltip>
                                <!-- <pre class="ng-binding widths">{{ scope.row[item.prop]}}</pre> -->
                            </template>
                            <template v-if="item.type=='datetime'">
                                <span style="margin-left: 10px">{{ getDateFormat(scope.row[item.prop]) }}</span>
                            </template>
                            <template v-if="item.type=='datetimeMinute'">
                                <el-icon name="time"></el-icon>
                                <span style="margin-left: 10px">{{ getDatetimeFormat(scope.row[item.prop]) }}</span>
                            </template>
                            <template v-if="item.type=='tabledatetime'">
                                <el-icon name="time"></el-icon>
                                <span style="margin-left: 10px">{{ getDateFormat(getLookUp(scope.row[item.table],item.prop)) }}</span>
                            </template>
                            <template v-if="item.type=='datetimeRange'">
                                <span style="margin-left: 10px">{{ getDatetimeRanget(scope.row[item.prop1],scope.row[item.prop2]) }}</span>
                            </template>
                            <template v-if="item.type=='lesson'">
                                <lb-lessontype :lessonData="scope.row" :typeData="item"></lb-lessontype>
                            </template>
                            <template v-if="item.type=='checkweek'">
                                <lb-checkweek :lessonData="scope.row"></lb-checkweek>
                            </template>
                            <template v-if="item.type=='getButtongroupText'">
                                <el-tag :type="item.color">{{getButtongroupText(item.othertype,scope.row[item.prop])}}</el-tag>
                            </template>
                            <template v-if="item.type=='getdataPurpose'">
                                <el-tag :type="getDictText('6',scope.row[item.prop])==getdataPurpose(scope.row[item.prop])?'primary':'gray'">{{ getdataPurpose(scope.row[item.prop])}}</el-tag>
                            </template>
                            <template v-if="item.type=='getEmployeeName'">
                                <el-tag :type="getEmployeeName(scope.row)=='未设定'?'gray':'primary'">{{ getEmployeeName(scope.row) }}</el-tag>
                            </template>
                            <template v-if="item.type=='studenttracksadd'">
                                <lb-studenttracksadd :lessonData="scope.row" :typeData="item"></lb-studenttracksadd>
                            </template>
                            <template v-if="item.type=='lastTrack'">
                                <lb-lasttrack :lessonData="scope.row" :typeData="item"></lb-lasttrack>
                            </template>
                            <template v-if="item.type=='checkstatus'">
                                <lb-checkstatus :lessonData="scope.row" :typeData="item" v-on:search="handleSearch"></lb-checkstatus>
                            </template>
                            <template v-if="item.type=='subtext'">
                                {{ getSubText(scope.row,item.prop,item.subprop) }}
                            </template>
                            <template v-if="item.type=='vmsubtext'">
                                {{ getSubText(vm,item.prop,item.subprop) }}
                            </template>
                            <template v-if="item.type=='substatus'">
                                <lb-checkstatus :lessonData="scope.row" :typeData="getSubText(scope.row,item.prop,item.subprop)" :tabletype="item.subprop" v-on:search="handleSearch"></lb-checkstatus>
                            </template>
                            <template v-if="item.type=='text'">
                                {{ scope.row[item.prop] }}
                            </template>
                            <template v-if="item.type=='textphone'">
                                {{ scope.row.student[0].first_tel }}
                            </template>
                            <template v-if="item.type=='fromNow'">
                                {{ fromNow(scope.row.birth) }}
                            </template>
                            <template v-if="item.type=='studentRouter'">
                                <lb-studentrouter :lessonData="scope.row"></lb-studentrouter>
                            </template>
                            <template v-if="item.type=='studentRouter1'">
                                <lb-studentrouter :lessonData="getLookUp(scope.row.student)"></lb-studentrouter>
                            </template>
                            <template v-if="item.type=='studentlink'">
                                <a class="link" @click="handleRouter($event,scope.row[item.prop])">
                                    <span></span>{{ getLookUp(scope.row[item.prop],'student_name') }}
                                </a>
                            </template>
                            <template v-if="item.type=='tabletext'">
                                {{ getLookUp(scope.row[item.table],item.prop) }}
                            </template>
                            <template v-if="item.type=='textScale'">
                                <el-tag type="warning">{{scope.row[item.prop1]?scope.row[item.prop1].length:0}}/{{scope.row[item.prop2]}}</el-tag>
                            </template>
                            <template v-if="item.type=='textTag'">
                                <el-tag :type="item.color">{{ getToFixed(scope.row[item.prop])}}</el-tag>
                            </template>
                            <template v-if="item.type=='negativeTag'">
                                <el-tag :type="item.color">-{{ getToFixed(scope.row[item.prop])}}</el-tag>
                            </template>
                            <template v-if="item.type=='payconditions'">
                                <el-tooltip :content='"￥"+getPayAmout(scope.row[item.order])+"/￥"+getTotalAmout(scope.row[item.order])' placement="top">
                                    <el-button>￥{{getPayAmout(scope.row[item.order])}}/￥{{getTotalAmout(scope.row[item.order])}}</el-button>
                                </el-tooltip>
                            </template>
                            <template v-if="item.type=='progress'">
                                <el-tag type="warning">{{getPressageText(scope.row)}}</el-tag>
                            </template>
                            <template v-if="item.type=='priceText'">
                                <lb-payconditions :lessonData="scope.row" :typeData="item"></lb-payconditions>
                            </template>
                            <template v-if="item.type=='getToFixed'">
                                <el-tag type="gray">{{getToFixed(scope.row[item.prop])}}</el-tag>
                            </template>
                            <template v-if="item.type=='lessonpriceText'">
                                <lb-lessonprice :lessonData="scope.row" :typeData="item"></lb-lessonprice>
                            </template>
                            <template v-if="item.type=='contentText'">
                                <lb-lessonhours :lessonData="scope.row" :typeData="item"></lb-lessonhours>
                            </template>
                            <template v-if="item.type=='subtract'">
                                <el-tag type="gray">{{Number(scope.row[item.prop1])-Number(scope.row[item.prop2])}}元</el-tag>
                            </template>
                            <template v-if="item.type=='studentoperation'">
                                <a class="link" @click="do_recover(scope.row._id)">
                                    <i class="icon-lock-open"></i>恢复
                                </a>
                                <a class="link" @click="confirm_delete(scope.row._id)">
                                    <i class="fa fa-times"></i>删除
                                </a>
                            </template>
                            <template v-if="item.type=='button'">
                                <el-button @click="handleShowDialog(item.dialog,scope.row)">{{item.text}}</el-button>
                            </template>
                        </template>
                    </el-table-column>
                </template>
            </template>
        </el-table>
        <div class="pagination" v-if="getPagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-sizes="pagination.pagesizes" :page-size="pagination.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
            </el-pagination>
        </div>
        <div class="clear"></div>
    </div>
</template>
<style>
.floatlefts {
    float: left;
    margin-left: 5px;
}

.table-blockinfo {
    border-radius: 4px;
    background: #fff;
}

.table-block {
    border: 1px solid #cccccc;
    border-radius: 4px;
    margin: 15px;
    background: #fff;
}

.table-block.hover {
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5)
}

.search {
    padding: 12px;
}

.table-block .pagination {
    padding: 5px;
    float: right;
}

.table-blockinfo .pagination {
    padding: 5px;
    float: right;
}

.table-block .clear {
    clear: both;
    height: 0px;
}

.search .el-select .el-input {
    width: 100;
}
</style>
<script>
import pagesmodule from '~/stores/module.js'
export default {
    name: 'systemmodule',
    props: ['module', 'info', 'searchValue', 'value', 'stepsdata'],
    data() {
        return {
            moduledata: '',
            textSearchKey: '',
            textSearchValue: '',
            moduleTableData: [],
            checked: false,
            datevalue: '',
            radiovalue: '0',
            highlight: false,
            filterData: '',
            selectsearchValue: '',
            multipleSelection: [],
            deffilterObj: [],
            lesson_name: '请选择课程',
            lbTagArr: ['lb-trash', 'lb-addmodal', 'lb-editstudentinfo', 'lb-inquiry', 'lb-recording', 'lb-newsclass', 'lb-lesson', 'lb-openclass', 'lb-leaveshours', 'lb-suspendshours', 'lb-flow', 'lb-unpay_clear', 'lb-attendance'],
            openDialogArr: ['leavesform', 'suspendform', 'recordingform', 'inquiryform', 'studentsmsform'],
            hastableSearch: false,
            selStudentAddInquiry: '',
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            }
        }
    },
    created() {
        if (typeof (this.module) == 'object') {
            this.moduledata = this.module
        } else if (typeof (this.module) == 'string' && this.module != '') {
            this.moduledata = pagesmodule[this.module]
        }
        if (this.module.created) {
            this.module.created(this)
        }
    },
    mounted() {
        if (this.module.mounted) {
            this.module.mounted(this)
        }
    },
    computed: {

        getPagination() {
            let pagination = true
            if (this.moduledata.paginationhide) {
                pagination = false
            }
            return pagination
        },
        getCheckHighlight() {
            this.highlight = true
        },
        getUpdata() {
            if ('moduleform' == this.$store.state.envs.currDialog) {
                this.handleSearch()
            } else if (this.lbTagArr.indexOf(this.$store.state.envs.currDialog) != '-1') {
                this.handleSearch()
            } else if (this.$store.state.envs.currDialog == 'selectstudentdialog') {
                if (this.selStudentAddInquiry.length > 0) {
                    if (this.$store.state.envs.currDialogResult) {
                        let student = this.$store.state.envs.currDialogResult
                        this.$store.state.envs.currStudent = student
                        this.handleShowDialog(this.selStudentAddInquiry, student)
                    }
                    this.$store.state.envs.currDialog = ''
                    this.selStudentAddInquiry = ''
                }
            }
        },
        getSearch() {
            let nSearch = false
            if (this.moduledata && this.moduledata.pageSearch.length > 0) {
                nSearch = true
            }
            return nSearch
        },
        handleFun() {
            return this.getSearchFun('handle')
        },
        handlebackFun() {
            return this.getSearchFun('handleback')
        },
        handleback() {
            return this.getModuleSearchInfo('handleback').length > 0
        },
        textSearchInfo() {
            return this.getModuleSearchInfo('textSearch')
        },
        textSearch() {
            return this.getModuleSearchInfo('textSearch').length > 0
        },
        dateSearch() {
            return this.getModuleSearchInfo('dateSearch').length > 0
        },
        dateSearchInfo() {
            return this.getSearchFun('dateSearch')
        },
        singleBtnSearch() {
            return this.getModuleSearchInfo('singleBtnSearch').length > 0
        },
        singleBtnSearchInfo() {
            return this.getModuleSearchInfo('singleBtnSearch')
        },
        groupBtnSearch() {
            return this.getModuleSearchInfo('groupBtnSearch').length > 0
        },
        groupBtnSearchInfo() {
            return this.getModuleSearchInfo('groupBtnSearch')
        },
        radioGroupSearch() {
            return this.getModuleSearchInfo('radioGroupSearch').length > 0
        },
        radioGroupSearchInfo() {
            return this.getModuleSearchInfo('radioGroupSearch')
        },
        radioGroupSearchFun() {
            return this.getSearchFun('radioGroupSearch')
        },
        selectSearch() {
            return this.getModuleSearchInfo('selectSearch').length > 0
        },
        selectSearchInfo() {
            console.log('2222', this.getModuleSearchInfo('selectSearch'))
            return this.getModuleSearchInfo('selectSearch')
        },
        selectesearchFun() {
            return this.getSearchFun('selectSearch')
        },
        //表格
        textTableInfo() {
            if (this.moduledata && this.moduledata.pageTableField.length > 0) {
                let textTableInfo = this.moduledata.pageTableField
                return textTableInfo
            }
        }
    },
    watch: {
        module: function(val) {
            if (typeof (val) == 'object') {
                this.moduledata = val
                this.handleSearch()
            } else if (typeof (val) == 'string' && this.module != '') {
                this.moduledata = pagesmodule[val]
                this.datevalue = ''
                this.radiovalue = ''
                this.selectsearchValue = ''
                this.handleSearch()
            }
        }
    },
    methods: {
        postMsg(msg) {
            console.log(msg)
            let msginfo = {
                "touser": "oQBciwwrZulw5OGALBB74MVnlnn8",
                "template_id": "EPoBuDGSu3F_9pWK2-uTR455ugxyL-TCkBfYILuBSyQ",
                "url": "http://wx.yx101.cn/login.html",
                "topcolor": "#FF0000",
                "data": {
                    "first": {
                        "value": "你的报修请求通过了，详情如下",
                        "color": "#173177"
                    },
                    "keyword1": {
                        "value": msg.repair_no,
                        "color": "#173177"
                    },
                    "keyword2": {
                        "value": "维修价格为"+msg.repair_price+"元",
                        "color": "#173177"
                    },
                    "remark": {
                        "value": "请点击详情，选择你是否需要进行此项报修，谢谢！",
                        "color": "#173177"
                    }
                }
            }
            axios.post('http://api.yx101.cn/wxpostmsg', msginfo).then(obj => {
                    console.log(obj)
            })

        },
        getExported() {
            let exportedData = this.moduleTableData
            console.log('exp', exportedData)
        },
        getImported(obj) {
            console.log('123', obj.srcElement.files)
            var wb
            var rABS = false
            let vm = this
            if (!obj.srcElement.files) {
                return
            }
            var f = obj.srcElement.files[0]
            var reader = new FileReader()
            console.log('456', reader)
            reader.onload = function(e) {
                var data = e.target.result
                if (rABS) {
                    wb = XLSX.read(btoa(fixdata(data)), {
                        type: 'base64'
                    })
                } else {
                    wb = XLSX.read(data, {
                        type: 'binary'
                    })
                }
                let obj = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
                vm.mx_db_bulkwrite('test1', obj).then(obj => {
                    console.log(obj)
                    console.log('158', JSON.stringify(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])))
                })
                //document.getElementById("demo").innerHTML = JSON.stringify(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]))
            };
            if (rABS) {
                reader.readAsArrayBuffer(f)
            } else {
                reader.readAsBinaryString(f)
            }
        },

        fixdata(data) {
            var wb
            var rABS = false
            var o = "",
                l = 0,
                w = 10240;
            for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
            o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
            return o;
        },
        handleSelectionChange(val) {
            this.multipleSelection = val
        },
        singleBtnAction(item) {
            if (item.showdialog) {
                let dialogdata = {}
                if (this.moduledata.getOpenDialogData) {
                    dialogdata = this.moduledata.getOpenDialogData(this, item.param)
                }
                this.handOpenDialog(item.showdialog, dialogdata)
            } else {
                if (this.moduledata[item.func]) {
                    this.moduledata[item.func](this, item.param)
                }
            }
        },
        confirm_delete(id) {
            let vm = this
            vm.$confirm('是否确定删除学员的档案?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.tables = []
                this.tables.push(this.moduledata.pageTable)
                vm.handleDelete(id).then(() => {
                    vm.$message({
                        message: '删除成功',
                        type: 'success'
                    })
                    this.$store.state.envs.currDialog = 'trashdialog'
                    vm.handleSearch()
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },
        do_recover(id) {
            let vm = this
            vm.updateTeble('student', id, {
                'isdel': false
            }).then(() => {
                vm.$message({
                    message: '操作成功',
                    type: 'success'
                })
                this.$store.state.envs.currDialog = 'lb-trash'
                vm.handleSearch()
            })
        },
        handleTableChange(val) {
            this.$emit('tablechange', { 'row': val, 'dialog': this.module.dialogUrl })
        },
        lessonrouter(event, url, info) {
            if (info) {
                this.$store.commit('class', info._id)
            }
            this.$store.commit('router', url)
            event.stopPropagation()
        },
        handOpenDialog(dialog, data) {
            if (this.openDialogArr.indexOf(dialog) != '-1') {
                this.selStudentAddInquiry = dialog
                this.$store.state.envs.currDialog = ''
                this.$store.state.envs.currDialogResult = null
                this.handleShowDialog('selectstudentdialog')
            } else {
                this.handleShowDialog(dialog, data)
            }
        },
        getModuleSearchSpan(Search, count) {
            let searchSpan = count
            if (this.moduledata && this.moduledata.pageSearch.length > 0) {
                let searchdata = this.moduledata.pageSearch
                if (searchdata) {
                    for (let item of this.moduledata.pageSearch) {
                        if (item.type == Search && item.span) {
                            searchSpan = item.span
                            break
                        }
                    }
                }
            }
            return searchSpan
        },
        getModuleSearchInfo(Search) {
            let searchInfo = []
            if (this.moduledata && this.moduledata.pageSearch.length > 0) {
                let searchdata = this.moduledata.pageSearch
                if (searchdata) {
                    for (let item of searchdata) {
                        if (item.type == Search) {
                            searchInfo = item.fields
                            break
                        }
                    }
                }
            }
            return searchInfo
        },
        getSearchFun(Search) {
            let searchfun
            if (this.moduledata && this.moduledata.pageSearch.length > 0) {
                let searchdata = this.moduledata.pageSearch
                if (searchdata) {
                    for (let item of searchdata) {
                        if (item.type == Search) {
                            if (item.searchfunction) {
                                searchfun = item.searchfunction
                                break
                            }
                        }
                    }
                }
            }
            return searchfun
        },
        getEmployeeName(item) {
            let name = '未设定'
            if (item.employee && item.employee.length > 0) {
                name = this.getLookUp(item.employee, 'name')
            }
            return name
        },
        handleSearch() {
            let filterObj = []
            let datetime = this.datevalue
            if (this.dateSearchInfo) {
                let filterObjItem = this.dateSearchInfo(datetime, this)
                for (let item of filterObjItem) {
                    filterObj.push(item)
                }
            }
            if (this.handlebackFun) {
                let filterObjItem = this.handlebackFun(this)
                for (let item of filterObjItem) {
                    filterObj.push(item)
                }
            }
            if (this.handleFun) {
                let filterObjItem = this.handleFun(this)
                for (let item of filterObjItem) {
                    filterObj.push(item)
                }
            }
            let selectesearch = this.selectsearchValue
            if (this.selectesearchFun) {
                let filterObjItem = this.selectesearchFun(selectesearch)
                for (let item of filterObjItem) {
                    filterObj.push(item)
                }
            }
            let radiosearch_value = this.radiovalue
            if (this.radioGroupSearchFun) {
                let filterObjItem = this.radioGroupSearchFun(radiosearch_value)
                for (let item of filterObjItem) {
                    filterObj.push(item)
                }
            }
            let textsearch_value = this.textSearchValue
            if (textsearch_value.length > 0) {
                filterObj.push({
                    'key': this.textSearchKey,
                    'value': textsearch_value,
                    'type': 'like'
                })
            }
            if (this.searchValue) {
                filterObj.push({
                    'key': 'student_id',
                    'value': this.searchValue,
                    'type': ''
                })
            }
            for (let item of this.deffilterObj) {
                filterObj.push(item)
            }
            if (this.moduledata && this.moduledata.tableSearch && this.moduledata.tableSearch.length > 0) {
                let tablesSearch = this.moduledata.tableSearch
                for (let item of tablesSearch) {
                    if (item.type == '') {
                        filterObj.push(item)
                    } else if (item.type && item.type.length > 0) {
                        filterObj.push(item)
                    } else {
                        filterObj.push({
                            'key': 'lookup',
                            'value': item,
                            'type': 'lookup'
                        })
                    }
                }
            }
            console.log(filterObj)
            let filterTxt = this.base64.encode(JSON.stringify(filterObj))
            this.filterData = filterTxt
            if (this.moduledata.pagesize) {
                this.pagination.pagesize = this.moduledata.pagesize
            }
            if (this.moduledata && this.moduledata.pageTable) {
                this.handleGetFilterTableTable(this.moduledata.pageTable, filterTxt).then((obj) => {
                    if (this.moduledata.tableChange) {
                        this.moduledata.tableChange(this, obj.data.data).then((obj) => {
                            this.moduleTableData = obj
                            console.log(obj)
                        })
                    } else {
                        this.moduleTableData = obj.data.data
                    }
                    console.log(this.moduledata.pageTable, this.moduleTableData)
                })
            }
        },
        getPercentage(order, maxStudent) {
            let percentage = 100
            let ordercount = 0
            if (order) {
                ordercount = order.length
            }
            if (maxStudent > 0) {
                percentage = Number(ordercount) * 100 / Number(maxStudent)
            }
            return percentage
        },
        getPressageText(row) {
            let count = row.order ? row.order.length : 0
            return count + '/' + row.max_student_num
        },
        getTotalAmout(orders) {
            var totalamount = 0
            if (orders) {
                for (var item of orders) {
                    totalamount += Number(item.order_amount)
                }
            }
            return parseFloat(totalamount).toFixed(2)
        },
        getPayAmout(orders) {
            var payamount = 0
            var totalamount = 0
            if (orders) {
                for (var item of orders) {
                    totalamount += Number(item.order_amount)
                }
                for (var item of orders) {
                    payamount += Number(item.unpay_amount)
                }
            }
            return parseFloat(totalamount - payamount).toFixed(2)
        },
        getdataPurpose(value) {
            let purpose = ''
            purpose = this.getDictText('6', value)
            if (purpose == '') {
                purpose = this.getDictText('6', this.getDictDefvalue('6'))
            }
            return purpose
        },
        handleDelClick(id) {
            this.handleDelete(id).then(() => {
                this.$message({
                    message: '删除成功',
                    type: 'success'
                })
                this.handleGetTable()
            })
        },
        handleCommand({
            action,
            data
        }) {
            if (action == 'delete') {
                if (data.sclesses) {
                    this.$message({
                        type: 'info',
                        message: '该教室已有排课，请先删除排课教室再进行此操作'
                    })
                } else {
                    this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.tables = []
                        this.tables.push(this.moduledata.pageTable)
                        this.handleDelete(data._id).then(() => {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            })
                            this.handleSearch()
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        })
                    })
                }
            }
            if (action == 'lock' || action == 'unlock') {
                let info = '离职封存适用于员工离职之后，封存之后该账号对应的历史记录保留在系统，但是不能再登陆系统, 是否继续?'
                let infomessage = '封存成功'
                let lock = true
                if (action == 'unlock') {
                    info = '您确定要解封 ' + data.name + ' 的资料吗?'
                    infomessage = '解封成功'
                    lock = false
                }

                this.$confirm(info, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.updateTeble('employee', data._id, {
                        'lock': lock
                    }).then(() => {
                        this.$message({
                            message: infomessage,
                            type: 'success'
                        })
                        this.handleSearch()
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            }
        }
    }
}
</script>
