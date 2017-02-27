<script>
export default {
    methods: {
        change(obj) {
            console.log(obj.vaSuccess)
        }
    },
    data() {
        return {
            test: {
                el: '1414'
            },
            cfg: {
                format: 'YYYY-MM-DD'
            },
            newReg: {
                reg: /^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})$/
            },
            ll: '',
            rr: '',
            tel: '',
            date: "",
            date2: "",
        }
    }
}
</script>
<template>
    <div class="item">
        <div class="searchGroup">
            <label><span class="must-point">*</span>货品名称</label>
            <div class="s-input">
                <input v-va:vuser='ll' tag='姓名' type="text" v-model='ll'>
                <i class="icon-close r2"></i>
                <i class="icon-search r1"></i>
            </div>
        </div>
        <div class="searchGroup">
            <label><span class="must-point">*</span>密码</label>
            <div class="vaGroup">
                <input v-va:vpwd='rr' tag='密码' type="text" v-model='rr'>
            </div>
        </div>
        <div class="searchGroup">
            <label><span class="must-point">*</span>手机号码</label>
            <div class="vaGroup">
                <input v-va:vtel='tel' type="text" tag='手机号码' v-model='tel' maxlength="11">
            </div>
        </div>
        <div class="searchGroup">
            <label><span class="must-point">*</span>时间</label>
            <input type='text' tag='时间' v-va:vyear='date' :date.sync='date' :config='cfg'/>
        </div>
        <div class="searchGroup">
            <label><span class="must-point">*</span>自定义规则</label>
            <input type='text' tag='自定义时间' v-va:newreg='[date2,newReg]' :date.sync='date2'>
        </div>
        <button @cb='change' class="btn-lg-imp" v-va-check>检测是否通过</button>
    </div>
</template>
<style lang='less'>
@import '../../../public/css/variables.less';
.vaGroup {
    width: auto!important;
}

.searchGroup {
    position: relative;
    min-height: 28px;
    display: flex;
    flex-wrap: wrap;
    width: auto;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 15px;
    &.errGroup {
        margin-bottom: 25px;
    }
    p {
        word-break: break-all;
    }
    .error {
        display: block;
        font-style: normal;
        font-size: @font-size-small;
        color: @danger;
        line-height: 1;
        padding: 3px 0;
    }
    .s-input {
        position: relative;
        [class^="icon-"] {
            position: absolute;
            width: 28px;
            height: 28px;
            line-height: 28px;
            text-align: center;
            top: 0px;
        }
        input[type='text']:focus~[class^="icon-"] {
            border-color: @link-color;
            color: @link-color
        }
        .r1 {
            right: 0;
            border-left: 1px solid @border-color;
        }
        .r2 {
            right: 28px;
        }
    }
    .ic2 input[type='text'] {
        padding-right: 56px!important;
    }
    .checkbox {
        font-size: 0;
        input[type='checkbox'] {
            margin-right: 5px;
            vertical-align: 4px;
        }
        * {
            font-size: @font-size-small;
        }
        label {
            height: 28px;
            line-height: 28px;
            margin-right: 20px;
            cursor: pointer;
        }
    }
    >label {
        width: 85px;
        height: 28px;
        line-height: 28px;
        text-align: right;
        margin-right: 15px;
        font-size: @font-size-small;
        .must-point {
            color: @danger;
            font-size: @font-size-small;
            margin-right: 5px;
        }
    }
}
</style>
