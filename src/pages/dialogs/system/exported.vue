<template>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button class="close" type="button" @click="lbClosedialog($event)">
                    <span aria-hidden="true">×</span>
                    <span class="sr-only">关闭</span>
                </button>
                <h3 class="modal-title">
                    导出</h3>
            </div>
            <div class="modal-body">
                <p>
                    <button @click="downloadExl(jsono)">导出该列表</button>
                    <!--<a href="" download="这里是下载的文件名.xlsx" id="hf"></a>-->
                </p>
            </div>
            <div class="modal-footer text-center">
                <button class="btn btn-warning" @click="lbClosedialog($event)">关闭</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            jsono: [{
                "保质期临期预警(天)": "adventLifecycle",
                "商品标题": "title",
            }]
        }
    },
    computed: {
    },
    mounted() {
        let a = this.getTableApidata('ownervote')
        console.log('sss123456', a)
        console.log('jsono', this.jsono)
    },
    methods: {
        downloadExl(json, type) {
            var tmpDown
            var tmpdata = json[0];
            json.unshift({});
            var keyMap = [];
            for (var k in tmpdata) {
                keyMap.push(k);
                json[0][k] = k;
            }
            var tmpdata = [];
            json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
                v: v[k],
                position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
            }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {
                v: v.v
            });
            var outputPos = Object.keys(tmpdata);
            var tmpWB = {
                SheetNames: ['mySheet'],
                Sheets: {
                    'mySheet': Object.assign({},
                        tmpdata,
                        {
                            '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1]
                        })
                }
            };
            tmpDown = new Blob([this.s2ab(XLSX.write(tmpWB, {
                bookType: (type == undefined ? 'xlsx' : type),
                bookSST: false,
                type: 'binary'
            }
            ))], {
                    type: ""
                });
            var href = URL.createObjectURL(tmpDown);
            document.getElementById("hf").href = href;
            document.getElementById("hf").click();
            setTimeout(function() {
                URL.revokeObjectURL(tmpDown);
            }, 100);
        },

        s2ab(s) {
            var tmpDown
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        },
        getCharCol(n) {
            var tmpDown
            let temCol = '',
                s = '',
                m = 0
            while (n > 0) {
                m = n % 26 + 1
                s = String.fromCharCode(m + 64) + s
                n = (n - m) / 26
            }
            return s
        },
       
    }
}
</script>