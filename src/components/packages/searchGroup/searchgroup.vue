<template>
   <div class="search" v-if="getSearch">
            <el-row :gutter="12">
                <el-col :span="6" v-if="textSearch">
                    <el-input placeholder="请输入内容" v-model="textSearchValue" @change="handleSearch">
                        <el-select v-model="textSearchKey" slot="prepend" placeholder="请选择" @change="handleSearch">
                            <el-option v-for="item in textSearchInfo" :key="item.value" :value="item.value" :label="item.label"></el-option>
                        </el-select>
                        <el-button slot="append" icon="search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="5" v-if="dateSearch">
                    <div class="block">
                        <el-date-picker v-model="datevalue" type="daterange" align="left" placeholder="选择日期范围" :picker-options="pickerOptions" @change="handleSearch">
                        </el-date-picker>
                    </div>
                </el-col>
                <el-col :span="4" v-if="classesSearch">
                    <el-select v-model="classesId" filterable placeholder="请选择班级">
                        <el-option v-for="item in getClassesData" :key="item._id" :label="item.class_name" :value="item._id">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="5" v-if="selectUserSearch">
                    <lb-selecteusersearch v-on:search="handleSearch"></lb-selecteusersearch>
                </el-col>
                <el-col :span="getModuleSearchSpan('radioGroupSearch',6)" v-if="radioGroupSearch">
                    <template v-for="item in radioGroupSearchInfo">
                        <el-radio-group v-model="radiovalue" @change="handleSearch">
                            <template v-for="(value,index) in item.labels">
                                <el-radio-button :label="index">{{value.label}}</el-radio-button>
                            </template>
                        </el-radio-group>
                    </template>
                </el-col>
                <el-col :span="5" v-if="groupBtnSearch">
                    <el-button-group>
                        <template v-for="item in groupBtnSearchInfo">
                            <el-button :type="item.type">{{item.label}}</el-button>
                        </template>
                    </el-button-group>
                </el-col>
                <el-col :span="getModuleSearchSpan('singleBtnSearch',3)" v-if="singleBtnSearch" class="pull-right">
                    <template v-for="item in singleBtnSearchInfo">
                        <template v-if="getActionOption(item.actionoption)">
                            <el-button :type="item.type" @click="lbShowdialog($event,item.showdialog)" :icon="item.icon">{{item.label}}</el-button>
                        </template>
                    </template>
                </el-col>
            </el-row>
        </div>
</template>
<script>
export default {
    name: 'LbSearchgroup',
    prop:[moduledata,],
    data() {
        return {
        }
    },
    watch: {
    },
    methods: {
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
    },
    computed: {
       getSearch() {
            let nSearch = false
            if (this.moduledata && this.moduledata.pageSearch.length > 0) {
                console.log(this.moduledata.pageSearch)
                nSearch = true
            }
            return nSearch
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
        selectUserSearch() {
            return this.getModuleSearchInfo('selectUserSearch').length > 0
        },
        selectUserSearchInfo() {
            return this.getModuleSearchInfo('selectUserSearch')
        },
        classesSearch() {
            return this.getModuleSearchInfo('classesSearch').length > 0
        },
        //表格
        textTableInfo() {
            if (this.moduledata && this.moduledata.pageTableField.length > 0) {
                let textTableInfo = this.moduledata.pageTableField
                return textTableInfo
            }
        },
        getClassesData() {
            let classes = this.$store.state.models.models.classes.data
            return classes
        },

    }
}
</script>
