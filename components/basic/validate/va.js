/* 
 *
 * validate for yj company
 * vue-directive
 * 
 * v-va {directive} for date
 * v-check {directive} for checker
 * $dispatch {Boolean} is success
 *
 * @Fovsweet
 *
 */

const va = {},
    TYPE_OBJ = '[object Object]',
    TYPE_STRING = '[object String]',
    TYPE_ARRAY = '[object Array]'

function unique(arr) {
    var hashTable = {},
        newArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (!hashTable[arr[i]]) {
            hashTable[arr[i]] = true;
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

function domType(dom) {
    if (dom.tagName == 'INPUT') {
        return dom
    } else {
        return dom.querySelector('input[type="text"]')
    }
}

// 报错函数
function showErr(name, checkResult) {
    let type = checkResult[0],
        ext = checkResult[1] || [],
        ERR_MSG = {
            nonvoid: `${name}不能为空`,
            reg: `${name}格式错误`,
            limit: `${name}必须在${ext[0]}与${ext[1]}之间`,
            equal: `两次${ext}不相同`,
            unique: `${name}重复`
        }

    return ERR_MSG[type]
}

// 提示报错字段
function domErr(targetElement, name, checkResult) {
    let type = checkResult[0],
        ERR_MSG = showErr(name, checkResult),
        parent = domType(targetElement).parentNode,
        newElement = document.createElement("i")

    domSuc(domType(targetElement))

    newElement.className = 'error'
    newElement.innerText = ERR_MSG

    if (parent.lastChild == domType(targetElement)) {
        // 如果最后的节点是目标元素，则直接添加。因为默认是最后
        parent.append(newElement);
    } else {
        //如果不是，则插入在目标元素的下一个兄弟节点的前面。也就是目标元素的后面
        parent.insertBefore(newElement, domType(targetElement).nextSibling);
    }
}

function domSuc(targetElement) {
    let removeDom = targetElement.parentNode.querySelectorAll('.error')

    if (removeDom.length) {
        for (let i = 0; i < removeDom.length; i++) {
            targetElement.parentNode.removeChild(removeDom[i])
        }
    }
}

//va配置的构造函数
function VaConfig(type, typeVal, errMsg, name, tag, Vue) {
    let initArr = ['type', 'typeVal', 'errMsg', 'name', 'tag']

    for (let i in initArr) {
        this[initArr[i]] = arguments[i]
    }
}

//校验函数
function check(v, conditions) {
    var res = 0; //0代表OK, 若为数组代表是某个字段的错误
    //验证函数
    const cfg = {
        //非空
        nonvoid: (v, bool) => {
            if (bool) {
                return v ? 0 : ['nonvoid'];
            } else {
                return 0;
            }
        },
        reg: (v, reg) => reg.test(v) ? 0 : ['reg'], //正则
        limit: (v, interval) => (v >= interval[0] && v <= interval[1]) ? 0 : ['limit', interval],
        equal: (v, target) => { //和什么相等
            let _list = document.getElementsByName(target),
                _target
            for (let i = 0; i < _list.length; i++) {
                if (_list[i].className.indexOf('va') > -1) {
                    _target = _list[i];
                }
            }
            return (_target.value === v) ? 0 : ['equal', _target.getAttribute('tag')]
        },
        unique: (v, name) => {
            let _list = document.getElementsByName(name),
                valList = [].map.call(_list, item => item.value)
            return (unique(valList).length === valList.length) ? 0 : ['unique']
        }
    }

    for (let i = 0; i < conditions.length; i++) {
        let type = conditions[i].type,
            typeVal = conditions[i].typeVal

        res = cfg[type](v, typeVal)
        if (res) {
            res = conditions[i].errMsg || res
        }
    }

    return res;
}

// 自定义规则
function personalVali(el, binding, vnode) {
    let vm = vnode.context,
        dom = domType(el),
        name = dom.name,
        obj = binding.value,
        conditions = vm.vaConfig[name]

    if (vm.vaReady && obj == '') {
        vm.vaReady = false
    } else {
        const eazyNew = (type, typeVal) => {
            return new VaConfig(type, typeVal, '', name, conditions[0].tag)
        }

        if (Object.prototype.toString.call(obj) == TYPE_OBJ) {
            // TYPE_OBJ
            // let conditions = this.vm.vaConfig[obj.arg];
            // check(obj, conditions)
        }

        if (Object.prototype.toString.call(obj) == TYPE_ARRAY) {
            let isInit = vm.vaConfig[name].length
            if (conditions[conditions.length - 1].typeVal != obj[1][conditions[conditions.length - 1].type]) {
                for (let i in obj[1]) {
                    conditions.push(eazyNew(i, obj[1][i]))
                }
            }
            conditions = check(obj, conditions)

            if (isInit > 1) valiOwn(el, binding, vnode, obj[0])
        }

        if (Object.prototype.toString.call(obj) == TYPE_STRING) {
            valiOwn(el, binding, vnode, obj)
        }
    }
}

function valiOwn(el, binding, vnode, val) {
    let vm = vnode.context,
        name = binding.arg == undefined ? 'nonvoid' : binding.arg, //参数
        nel = domType(el), //dom节点
        tag = el.getAttribute('tag'), //tag属性名称
        option = binding.modifiers //修饰符

    vm.vaResult || (vm.vaResult = {})
    vm.vaVal || (vm.vaVal = {})

    var conditions = vm.vaConfig[name];

    //如果允许为空的此时为空，不校验
    if (val === '' && option.none) {
        vm.vaVal[name] = val
        return
    }

    vm.vaResult[name] = check(val, conditions);

    var _result = vm.vaResult[name]

    if (_result) {
        //如果返回的是字符串，则为自定义报错； 如果是数组，则使用showErr 报错
        typeof _result === 'string' ? alert(_result) : domErr(nel, conditions[0].tag, _result)

        // el.value = vm.vaVal[name] = ''
        return
    }

    domSuc(nel)

    vm.vaVal[name] = val
}

//用来剔除重复的规则，以及规则的覆盖。默认后面的取代前面
function uConcat(basearr, tararr) {
    const comb = basearr.concat(tararr),
        unique = {},
        result = []

    for (let i = 0; i < comb.length; i++) {
        let type = comb[i].type
        if (unique[type]) {
            let index = unique[type].index
            unique[type] = comb[i]
            unique[type].index = index;
        } else {
            unique[type] = comb[i]
            unique[type].index = i;
        }
    }

    for (let i = 0; i < 100; i++) {
        for (let item in unique) {
            if (unique[item].index === i) {
                delete unique[item].index
                result.push(unique[item])
            }
        }
    }

    return result
}

//正则表
var regList = {
    vuser: /^[\w|\d]{4,16}$/,
    vpwd: /^[\w!@#$%^&*.]{6,16}$/,
    vtel: /^1[0-9]{10}$/,
    vrealname: /^[\u4e00-\u9fa5 ]{2,10}$/,
    vbanknum: /^\d{10,19}$/,
    vmoney: /^\d{1,}(\.\d{1,2})?$/,
    vdate: /^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})$/,
    vyear: /^(\d{4}-\d{2}-\d{2})$/,
    vidcard: /[^a-zA-Z\_\.0-9\+\-\*\/\|\@\#\$\%\&\[\]\{\}]/i,
    vmail: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i
}

va.install = (Vue) => {
    Vue.directive('va', {
        bind(el, binding, vnode) {
            let vm = vnode.context, //上下文 ViewModel
                name = binding.arg == undefined ? 'nonvoid' : binding.arg, //参数
                tag = el.getAttribute('tag'), //tag属性名称
                nel = domType(el), //dom节点
                baseCfg = [], //默认的校验规则    --不用写，默认存在的规则（如非空）
                optionalConfig = [], //用户选择的配置成套    --与name相关
                customConfig = [], //用户自定义的规则（组件中）  --bingding.value
                option = binding.modifiers, //修饰符
                errMsg = ''

            vm.vaReady = true
            nel.classList.add('va' + vm._uid)
            nel.name = name
            vm.vaConfig || (vm.vaConfig = {})

            const eazyNew = (type, typeVal) => {
                return new VaConfig(type, typeVal, '', name, tag)
            }

            const NON_VOID = eazyNew('nonvoid', true)

            //默认非空,如果加了canNull的修饰符就允许为空
            if (!option.none) {
                baseCfg.push(NON_VOID)
            }

            nel.addEventListener('blur', function() {
                valiOwn(nel, binding, vnode, nel.value)
            })

            //不能重复的
            if (option.unique) optionalConfig.push(eazyNew('unique', name))

            //如果有在正则表里
            let regOptions = Object.keys(option);

            for (let i in regOptions) {
                var regOption = regOptions[i]
                if (regList[regOptions[i]]) {
                    optionalConfig.push(eazyNew('reg', regList[regOption]))
                }
            }

            //如果regList里有name对应的，直接就加进optionalConfig
            if (regList[name]) {
                optionalConfig.push(eazyNew('reg', regList[name]))
            }

            //用户自定义的规则
            if (Object.prototype.toString.call(binding.value) == TYPE_ARRAY) {
                let item = binding.value[1],
                    type = Object.keys(item)[0];
                customConfig = new VaConfig(type, item[type], '', name, tag)
            }

            //规则由 默认规则 + 修饰符规则 + 写在属性的自定义规则 合并（后面的同type规则会覆盖前面的）
            vm.vaConfig[name] = uConcat(uConcat(baseCfg, optionalConfig), customConfig)
        }
    })

    Vue.directive('va-check', {
        bind(el, binding, vnode) {
            let vm = vnode.context,
                success = [],
                outSuccess = false,
                event = new Event('cb')

            el.addEventListener('click', function() {
                const domList = document.getElementsByClassName('va' + vm._uid);
                vm.vaResult || (vm.vaResult = {})
                vm.vaVal || (vm.vaVal = {})

                for (let i = 0; i < domList.length; i++) {
                    let dom = domList[i],
                        name = dom.name,
                        value = dom.value,
                        conditions = vm.vaConfig[name];

                    vm.vaResult[name] = check(value, conditions);

                    let _result = vm.vaResult[name]
                        //如果返回不为0,则有报错
                    if (_result) {
                        //如果返回的是字符串，则为自定义报错； 如果是数组，则使用showErr 报错
                        typeof _result === 'string' ? alert(_result) : domErr(dom, conditions[0].tag, _result)
                        success.splice(i, 1, false)

                        /* 是否需要单条单条验证 */
                        // return
                    } else {
                        success.splice(i, 1, true)
                    }
                    vm.vaVal[name] = value
                }
                for (let i = 0; i < success.length; i++) {
                    if (!success[i]) {
                        outSuccess = false
                        break
                    } else {
                        outSuccess = true
                    }
                }
                event.vaSuccess = outSuccess
                el.dispatchEvent(event)
            })
        }
    })

    /*
     *  在实例的monuted周期使用 api设置自定义配置
     */

    //设置自定义报错信息
    Vue.prototype.$va_setErrMsg = function(name, type, errMsg) {
        for (var i = 0, _conditions = this.vaConfig[name]; i < _conditions.length; i++) {
            if (_conditions[i].type === type) {
                _conditions[i].errMsg = errMsg
            }
        }
    }

    Vue.prototype.$warmMsg = function(errMsg) {
        console.warn(errMsg)
    }

    //设置区间限制
    Vue.prototype.$va_setLimit = function(name, limit) {
        for (var i = 0, _conditions = this.vaConfig[name]; i < _conditions.length; i++) {
            if (_conditions[i].type === 'limit') {
                _conditions[i].typeVal = limit;
            }
        }
    }
}

export default va
