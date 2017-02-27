/**
 * config(参数配置)
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
<script>
export default {
	props:['config'],
	data(){
		return{
			activeTab:0,
			opencode:''
		}
	},
	methods:{
		chiceTab(item,index){
			this.activeTab=index;
			this.$emit('changetab',item,index)
		},
		openFirst(item,index){
			this.opencode=item.code
		}
	}
}
</script>

<template>
<div class='list_div'>
	<div class='list_head'>
		<div v-if='config.btn.left' class='leftbtn'>
			<i></i>
			<p>{{config.btn.left.name}}</p>
		</div>
		<div v-if='config.btn.right' class='rightbtn'>
			<i></i>
			<p>{{config.btn.right.name}}</p>
		</div>
	</div>
	<div class='list_tab' v-if='config.tab'>
		<a href="javascript:;" v-for='(item,index) in config.tab' @click='chiceTab(item,index)' :class="{ckd:index==activeTab}">
			<div v-if='item.tips' class='redtips'></div>
			{{item.name}}
		</a>
	</div>
	<div class='list_content'>
		<template v-if='activeTab==index' v-for='(item,index) in config.body'>
			<ul class='listbox'>
				<li class='first_li' v-for='(firstLv,index) in item'>
					<a @click='openFirst(firstLv,index)' href="javascript:;">
						<p class='main'>{{firstLv.firstTitle}}</p>
						<p class='minor'>{{firstLv.secContent}}</p>
						<p class='minor'>{{firstLv.thrContent}}</p>
						<span>{{firstLv.rightContent}}</span>
					</a>
					<ul v-show='firstLv.code==opencode' class='sec_ul'>
						<li class='sec_li' v-for='(secLv,index) in firstLv.secList'>
							<p class='main'>{{secLv.firstTitle}}</p>
							<p class='minor'>{{secLv.secContent}}</p>
							<p class='minor'>{{secLv.thrContent}}</p>
							<span>{{secLv.rightContent}}</span>
						</li>
					</ul>
				</li>
			</ul>
		</template>
	</div>
</div>
</template>
<style lang='less' scoped>
.list_div{
	width: 383px;
	border: 1px solid #dbe5ea;
	.list_head{
		height: 46px;
		border-bottom: 1px solid #dbe5ea;
		.leftbtn{
			display: inline-block;
			float: left;
			margin-left: 15px;
			height: 46px;
			line-height: 46px;
		}
		.rightbtn{
			display: inline-block;
			float: right;
			margin-right: 15px;
			height: 46px;
			line-height: 46px;
		}
		p{
			font-size: 14px;
			color: #212121;
			margin: 0;
		}
	}
	.list_tab{
		display: flex;
    	font-size: 0;
    	border-bottom: 1px solid #dbe5ea;
    	a{
    		display: inline-block;
    		padding: 18px 0;
    		width: 50%;
    		text-align: center;
    		font-size: 14px;
    		color: #212121;
    		margin-bottom: -2px;
    		border-bottom: 2px solid transparent;
    		text-decoration: none;
    		position: relative;
    		.redtips{
    			display: inline-block;
    			width: 4px;
    			height: 4px;
    			background: red;
    			border-radius: 2px;
    			position: absolute;
    			top: 22px;
    			margin-left: -8px;
    		}
    	}
    	.ckd{
    		border-color: #008af4;
    	}
	}
	.list_content{
		ul{
			list-style: none;
			padding: 0;
			margin: 0
		}
		a{
			text-decoration:none;
			p,span{
				color: #212121;
			}
		}
		.listbox{
			text-align: left;
			.first_li{
				
			}
		}
	}
}
</style>