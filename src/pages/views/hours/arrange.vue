<template>
    <div class="wrapper">
        <div class="wrapper panel panel-default bg-white" :class="{result:getSelectName}">
            <div class="row  m-t">
                <div id='calendar'></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'arrange',
    data() {
        let localdata = {
            'form': {
                'duration': '',
                'select_name': '',
                'select_id': '',
                'show_type': '老师'
            },
            'duration': [{
                'value': 'day',
                'text': '今日'
            }, {
                'value': 'week',
                'text': '本周'
            }, {
                'value': 'month',
                'text': '本月'
            }],
            'show_type': [{
                'value': '老师',
                'text': '按老师显示',
                'show': 'lb-selectstudenttpl'
            }, {
                'value': '教室',
                'text': '按教室显示',
                'show': 'lb-selectstudenttpl'
            }, {
                'value': '班级',
                'text': '按班级显示',
                'show': 'lb-selectstudenttpl'
            }, {
                'value': '课程',
                'text': '按课程显示',
                'show': 'lb-selectstudenttpl'
            }, {
                'value': '学员',
                'text': '按学员显示',
                'show': 'lb-selectstudenttpl'
            }],
            'lookupclasses': {
                'localField': 'classes_id',
                'from': 'classes',
                'foreignField': '_id',
                'as': 'classes'
            },
            'lookupsclasses': {
                'localField': 'sclasses_id',
                'from': 'sclasses',
                'foreignField': '_id',
                'as': 'sclasses'
            },
            'lookuptech': {
                'localField': 'teacher_id',
                'from': 'employee',
                'foreignField': '_id',
                'as': 'employee'
            }
        }
        return {
            localdata,
            tables: ['arrange'],
        }
    },
    mounted() {
        let vm = this
        $('#calendar').fullCalendar({
            schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
            nowIndicator: true,
            editable: false,
            aspectRatio: 1.8,
            scrollTime: '07:00',
            header: {
                left: 'arrange today,prev,next',
                center: 'title',
                right: 'agendaDay,agendaWeek,month,listWeek'
            },
            allDaySlot: false,
            customButtons: {
                arrange: {
                    text: '添加排课',
                    click: function () {
                        vm.handleShowDialog('lb-arrangeedit')
                    }
                }
            },
            defaultView: 'agendaDay',
            views: {
                timelineDay: {
                    buttonText: '日',
                    slotDuration: '00:30'
                }
            },
            navLinks: true,
            resourceAreaWidth: '20%',
            resourceLabelText: '教室',
            resources: function (callback) {
                vm.getTableApidata('sclasses').then(function (obj) {
                    let res = []
                    for (var item of obj.data.data) {
                        let resitem = {}
                        resitem.id = item._id
                        resitem.title = item.class_name
                        res.push(resitem)
                    }
                    callback(res)
                })
            },
            eventClick: function (calEvent, jsEvent, view) {
                vm.handleShowDialog('lb-arrangeedit', calEvent)
            },
            events: function (start, end, timezone, callback) {
                let filterObj = []
                let startTime = vm.getDatetimeStartEndOf(start._d)
                let endTime = vm.getDatetimeStartEndOf(end._d, end)

                filterObj.push({
                    'key': 'daterange2',
                    'value': startTime,
                    'type': 'gte'
                })
                filterObj.push({
                    'key': 'lookup',
                    'value': vm.localdata.lookupclasses,
                    'type': 'lookup'
                })
                filterObj.push({
                    'key': 'lookup',
                    'value': vm.localdata.lookupsclasses,
                    'type': 'lookup'
                })
                filterObj.push({
                    'key': 'lookup',
                    'value': vm.localdata.lookuptech,
                    'type': 'lookup'
                })
                let filterTxt = vm.base64.encode(JSON.stringify(filterObj))
                vm.handleGetFilterTable(filterTxt).then(function (obj) {
                    let eve = []
                    for (var item of obj.data.data) {
                        let evnitem = {}
                        evnitem.id = item._id
                        evnitem.resourceId = item.sclasses_id
                        evnitem.title = ''
                        if (item.employee && item.employee.length > 0) {
                            evnitem.title = '老师：' + item.employee[0].name
                        }
                        if (item.classes && item.classes.length > 0) {
                            evnitem.title += ' 班级：' + item.classes[0].class_name
                        }
                        if (item.sclasses && item.sclasses.length > 0) {
                            evnitem.title += ' 教室：' + item.sclasses[0].class_name
                        }
                        if (item.dayloop) {
                            let loopdatastart = item.daterange1
                            let loopdataend = item.daterange2
                            let loopcount = 0
                            while (loopdatastart <= loopdataend) {
                                if (loopcount > 1000) {
                                    break
                                }
                                let days = vm.moment(loopdatastart).days()
                                if (item['day_' + days]) {
                                    evnitem.start = vm.getDate2timeFormat(loopdatastart, item.timerange1)
                                    evnitem.end = vm.getDate2timeFormat(loopdatastart, item.timerange2)
                                    let evncpitem = {}
                                    Object.assign(evncpitem, evnitem)
                                    eve.push(evncpitem)
                                }
                                loopdatastart = vm.moment(loopdatastart).add(1, 'days').toDate().getTime()
                                loopcount++
                            }
                        } else {
                            evnitem.start = vm.getDate2timeFormat(item.daterange1, item.timerange1)
                            evnitem.end = vm.getDate2timeFormat(item.daterange1, item.timerange2)
                            eve.push(evnitem)
                        }
                    }
                    callback(eve)
                })
            }
        })
    },
    computed: {
        getClassesData() {
            let classes = this.$store.state.models.models.classes.data
            return classes
        },
        getSelectName() {
            if (this.$store.state.envs.currDialog == 'lb-selectstudenttpl') {
                if (this.$store.state.envs.currDialogResult) {
                    this.localdata.form.select_name = this.$store.state.envs.currDialogResult.student_name
                    this.localdata.form.select_id = this.$store.state.envs.currDialogResult._id
                } else {
                    this.localdata.form.select_id = ''
                    this.localdata.form.select_name = ''
                }
                this.handleSearch()
            }
            if (this.$store.state.envs.currDialog == 'lb-arrange') {
                $('#calendar').fullCalendar('refetchEvents')
                this.$store.state.envs.currDialog = ''
            }
            return true
        },
    },
    watch: {},
    methods: {
        handleSelect() {
            let obj = this.lodash.find(this.localdata.show_type, {
                'value': this.localdata.form.show_type
            })
            if (obj) {
                this.handleShowDialog(obj.show)
            }
        },
        selectShowType() {
            this.localdata.form.select_name = ''
            this.localdata.form.select_id = ''
            this.handleSearch()
        },
        handleDuration() {
            let duration = this.localdata.form.duration.trim()
            let start = this.getDatetimeStartOf(duration)
            const end = this.getDatetimeStartOf('day', true)
            this.localdata.form.daterange = [start, end]
            //this.handleSearch()
        },
        handleSearch() {
            //let filterObj = []
            //let filterTxt = this.base64.encode(JSON.stringify(filterObj))
            //this.handleGetFilterTable(filterTxt)
        }
    }
}
</script>
