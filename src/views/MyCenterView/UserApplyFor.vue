<template>
<div class="applyFor-wrap myCenter-breadcrumb padB20">
	<el-dialog
		title="提示"
		:visible.sync="dialogVisible"
		width="30%">
		<span>ie浏览器下无法下载，请使用其他浏览器进行下载（推荐使用谷歌浏览器）</span>
		<span slot="footer" class="dialog-footer">
			<el-button @click="dialogVisible = false">取 消</el-button>
			<el-button type="primary" @click="uploadOther">确 定</el-button>
		</span>
	</el-dialog>
	<el-breadcrumb separator="/">
		<el-breadcrumb-item>个人中心</el-breadcrumb-item>
		<el-breadcrumb-item>我的申请</el-breadcrumb-item>
	</el-breadcrumb>
        <div class="pad15">
            <el-table
                v-loading="loading"
                ref="multipleTable"
                :data="applyForLists"
                tooltip-effect="dark"
                style="width: 100%"
                stripe
                >
                <el-table-column prop="SignType" header-align="center" align="center" label="申请类型" width="120" :formatter="formatSignType"></el-table-column>
                <el-table-column prop="Code" header-align="center" align="center" label="申请单号" width="190"></el-table-column>
                <el-table-column prop="Data" header-align="center" align="center" label="提交时间" width="190"></el-table-column>
                <el-table-column prop="State" header-align="center" align="center" label="审批结果" width="120">
                    <template slot-scope="scope">
                        <el-tag :type="filterFunc(scope.row)" disable-transitions>
                            {{ scope.row | filterState}}
                        </el-tag>
                    </template>
			</el-table-column>
			<el-table-column header-align="center" align="center" label="操作">
				<template slot-scope="scope">
                        <!-- 退续租申请 查看 -->
                        <el-button v-if="scope.row.Category == '2' && (scope.row.Type == 4 || scope.row.Type == 3 || scope.row.Type == 2)" size="mini" type="primary" @click="checkApplyForRetreat(scope.$index, scope.row)">查看</el-button>
                        <el-button v-if="scope.row.Category == '1'" size="mini" type="primary" @click="checkApplyFor(scope.$index, scope.row)">查看</el-button>
                        <el-button v-if="scope.row.State == '6'&& scope.row.Category == '1'" size="mini" type="primary"  :loading="btn_loading == scope.$index" @click="uploadApplyFor(scope.$index, scope.row)">下载</el-button>
                    </template>
			</el-table-column>
		</el-table>
	</div>
	<!-- <el-pagination class="tc" @current-change="handleCurrentChange" background
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="listsTotal">
        </el-pagination> -->
	<el-dialog id="applynoHead" :visible.sync="dialogReatreat" center width="1100px">
		<div class="applyBody" v-loading="loading">
			<h2 class="tc" style="margin-bottom:10px;font-size: 28px;">{{ titleReatreat }}</h2>
			<div class="clearfix" style="margin-bottom:10px;">
				<div class="clearfix">
					<div class="pull-right" style="margin-top:15px">
						<p class="pull-left" style="margin-right:20px;margin-left:20px;">
							<span>合同编号：</span>
							<span class="qContract">{{ dialogInfo_cdw.Code }}</span>
						</p>
						<p class="pull-left">
							<span>签约日期：</span>
							<span>{{ dialogInfo_cdw.Date }}</span>
						</p>
					</div>
				</div>
			</div>

			<table class="retreatTable" style="border-collapse: collapse; min-width: 100%;border: 1px solid #999;margin-bottom: 20px;">
				<colgroup>
					<col style="width: 130px;" />
					<col style="width: 130px;" />
					<col style="width: 130px;" />
					<col style="width: 130px;" />
					<col style="width: 130px;" />
					<col style="width: 130px;" />
				</colgroup>
				<tbody>
					<tr>
						<td>申请人：</td>
						<td>{{ dialogInfo_cdw.CustimerName }}</td>

						<td>身份证号：</td>
						<td>{{ dialogInfo_member.IDCard }}</td>

						<td>联系电话：</td>
						<td>{{ dialogInfo_member.Phone }}</td>
					</tr>
					<tr>
						<td>租赁房屋：</td>
						<td colspan="5">{{ dialogInfo_cpi.RoomName }}</td>
					</tr>
					<tr>
						<td>建筑面积：</td>
						<td>{{ dialogInfo_cpi.RoomArea }}</td>

						<td>户型：</td>
						<td>{{ dialogInfo_cpi.RoomType }}</td>

						<td>每月租金：</td>
						<td>{{ dialogInfo_cdw.MontylyRent }}</td>
					</tr>
					<tr>
						<td>租赁起始日期：</td>
						<td>{{ dialogInfo_cdw.BeginDate | dateFormat }}</td>

						<td>租赁终止日期：</td>
						<td>{{ dialogInfo_cdw.EndDate | dateFormat }}</td>

						<td>租赁年限（年）：</td>
						<td>{{ dialogInfo_cdw.RentYear }}</td>
					</tr>
				</tbody>
			</table>

			<table class="retreatTable" style="border-collapse: collapse; min-width: 100%;">
				<tbody>
					<tr>
						<td style="width: 15%;">退租类型：</td>
						<td style="width: 35%;">
							<span v-if="dialogInfo_cdw.Category == '0'">到期退租</span>
							<span v-if="dialogInfo_cdw.Category == '1'">提前退租</span>
						</td>
						<td style="width: 15%;">
							租赁终止日期：
						</td>
						<td style="width: 35%;">
                            {{ dialogInfo_cdw.EndDate | dateFormat}}
						</td>
					</tr>
					<tr>
						<td style="width: 15%;">附加说明：</td>
						<td colspan="3">{{ dialogInfo_member.Description }}
						</td>
					</tr>
				</tbody>
			</table>
            <div style="padding:15px;">
                <div style="width:10%;float:left;">
                    <el-tag v-if="stateContent == 1" type="danger" disable-transitions>审核中</el-tag>
                    <el-tag v-else-if="stateContent == 2" type="success" disable-transitions>审核通过</el-tag>
                    <el-tag v-else-if="stateContent == 3" type="danger" disable-transitions>审核不通过</el-tag>
                    <el-tag v-else type="danger" disable-transitions>未知</el-tag>
                </div>
                <div style="width:90%;float:left;" v-show="stateContent == 1 || stateContent == 3">
                    <p class="marB20">审批日期：{{ dialogInfo_cdw.ModifyDate }}</p>
                    <p>审批意见：</p>
                </div>
            </div>
		</div>
		<span slot="footer" class="dialog-footer">
            <el-button @click="dialogReatreat = false">关闭</el-button>
        </span>
	</el-dialog>


	<!-- 下载pdf -->
	<div class="download_pdf_wrapper">
		<div class="download_pdf" id="pdfDom">
			<div class="first_page_wrapper rel">
				<h4 class="tc fs24">申请人基本情况申报表</h4>
				<div class="first_page">
					<div class="first_page_1 clearfix">
						<h4 class="fl">主申请人  <span class="inline" style="transform:rotate(90deg);"> （</span>单身申请人<span class="inline" style="transform:rotate(90deg);">）</span></h4>
						<div class="fl">
							<ul class="clearfix fir_row">
								<li class="fl">姓名</li>
								<li class="fl">{{name}}</li>
								<li class="fl">性别</li>
								<li class="fl">
									<el-checkbox-group v-model="sex" disabled>
										<el-checkbox label="男"></el-checkbox>
										<el-checkbox label="女"></el-checkbox>
									</el-checkbox-group>
								</li>
								<li class="fl">民族</li>
								<li class="fl" style="border-right:0;">{{nation}}</li>
							</ul>
							<ul class="clearfix sec_row">
								<li class="fl">婚姻状况</li>
								<li class="fl last_child" style="width:800px;">
									<el-checkbox-group v-model="marriage" disabled>
										<el-checkbox label="已婚"></el-checkbox>
										<el-checkbox label="未婚"></el-checkbox>
										<el-checkbox label="离婚"></el-checkbox>
										<el-checkbox label="丧偶"></el-checkbox>
									</el-checkbox-group>
								</li>
							</ul>
							<ul class="clearfix thi_row">
								<li class="fl">身份证号</li>
								<li class="fl" v-for="(item,index) in IDCard">{{item}}</li>
							</ul>
							<ul class="clearfix four_row">
								<li class="fl">文化程度</li>
								<li class="fl last_child">
									<el-checkbox-group v-model="cultural" disabled>
										<el-checkbox label="博士"></el-checkbox>
										<el-checkbox label="硕士"></el-checkbox>
										<el-checkbox label="本科"></el-checkbox>
										<el-checkbox label="大专、高职"></el-checkbox>
										<el-checkbox label="高中"></el-checkbox>
										<el-checkbox label="中专、职校"></el-checkbox>
										<el-checkbox label="初中"></el-checkbox>
										<el-checkbox label="小学"></el-checkbox>
									</el-checkbox-group>
									<span class="other">
                                            <span>其他</span>
									<input disabled>
									</span>
								</li>
							</ul>
							<ul class="four_row fif_row clearfix">
								<li class="fl">单位类别</li>
								<li class="fl clearfix last_child">
									<el-checkbox-group v-model="unit" disabled class="fl">
										<el-checkbox label="机关单位"></el-checkbox>
										<el-checkbox label="事业单位"></el-checkbox>
										<el-checkbox label="国有企业"></el-checkbox>
										<el-checkbox label="集体企业"></el-checkbox>
										<el-checkbox label="外资企业"></el-checkbox>
										<el-checkbox label="合资企业"></el-checkbox>
										<el-checkbox label="私营企业"></el-checkbox>
										<el-checkbox label="港澳台企业"></el-checkbox>
										<el-checkbox label="社会团体"></el-checkbox>
										<el-checkbox label="个体工商户"></el-checkbox>
										<el-checkbox label="非正规就业劳动组织"></el-checkbox>
									</el-checkbox-group>
									<span class="other fl">
                                            <span>其他</span>
									<input disabled>
									</span>
								</li>
							</ul>
							<ul class="six_row clearfix">
								<li class="fl">是否缴纳本市住房公积金</li>
								<li class="fl clearfix tc">
									<el-checkbox-group v-model="isLocalMoney" disabled>
										<el-checkbox label="是"></el-checkbox>
										<el-checkbox label="否"></el-checkbox>
									</el-checkbox-group>
								</li>
								<li class="fl">住房公积金账号</li>
								<li class="fl last_child">{{ProvidentFundCard}}</li>
							</ul>
							<ul class="sev_row clearfix">
								<li class="fl">持居住证人员填写</li>
								<li class="fl">
									<div>
										<label>居住证号码</label>
										<span>{{LiveCard}}</span>
									</div>
									<div style="border-bottom:none;">
										<label>是否缴纳社保金</label>
										<span>
                                                <el-checkbox-group v-model="HasSocialSecurityFund" disabled>
                                                    <el-checkbox label="是"></el-checkbox>
                                                    <el-checkbox label="否"></el-checkbox>
                                                </el-checkbox-group>
                                            </span>
									</div>
								</li>
								<li class="fl last_child">
									<div class="clearfix">
										<label class="fl">持证年限是否满两年</label>
										<span class="fl">
                                                <el-checkbox-group v-model="isLocalMoney" disabled>
                                                    <el-checkbox label="是"></el-checkbox>
                                                    <el-checkbox label="否"></el-checkbox>
                                                </el-checkbox-group>
                                            </span>
									</div>
									<div class="clearfix" style="border-bottom:none;">
										<label class="fl">连续交金年限是否满一年</label>
										<span class="fl ">
                                                <el-checkbox-group v-model="SocialSecurityFullYear" disabled>
                                                    <el-checkbox label="是"></el-checkbox>
                                                    <el-checkbox label="否"></el-checkbox>
                                                </el-checkbox-group>
                                            </span>
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div class="first_page_1 first_page_2 clearfix">
						<h4 class="fl">共同主申请人一</h4>
						<div class="fl">
							<ul class="clearfix fir_row">
								<li class="fl">姓名</li>
								<li class="fl">{{common_1.Name}}</li>
								<li class="fl">性别</li>
								<li class="fl">
									<el-checkbox-group v-model="common_1.Sex" disabled>
										<el-checkbox label="男"></el-checkbox>
										<el-checkbox label="女"></el-checkbox>
									</el-checkbox-group>
								</li>
								<li class="fl">本市常住人口</li>
								<li class="fl" style="border-right:0;">
									<el-checkbox-group v-model="common_1.IsPermanent" disabled>
										<el-checkbox label="是"></el-checkbox>
										<el-checkbox label="否"></el-checkbox>
									</el-checkbox-group>
								</li>
							</ul>
							<ul class="clearfix sec_row">
								<li class="fl">与主申请人关系</li>
								<li class="fl">
									<el-checkbox-group v-model="common_1.Relation" disabled>
										<el-checkbox label="配偶"></el-checkbox>
										<el-checkbox label="子女"></el-checkbox>
									</el-checkbox-group>
								</li>
								<li class="fl">婚姻状况</li>
								<li class="fl last_child" style="width:480px;">
									<el-checkbox-group v-model="common_1.MarryInfo" disabled>
										<el-checkbox label="已婚"></el-checkbox>
										<el-checkbox label="未婚"></el-checkbox>
										<el-checkbox label="离婚"></el-checkbox>
										<el-checkbox label="丧偶"></el-checkbox>
									</el-checkbox-group>
								</li>
							</ul>
							<ul class="clearfix thi_row">
								<li class="fl">身份证号</li>
								<li class="fl" v-for="(item,index) in common_1.IDCard">{{item}}</li>
							</ul>
						</div>
					</div>
					<div class="first_page_1 first_page_2 clearfix">
						<h4 class="fl">共同主申请人二</h4>
						<div class="fl">
							<ul class="clearfix fir_row">
								<li class="fl">姓名</li>
								<li class="fl">{{common_2.Name}}</li>
								<li class="fl">性别</li>
								<li class="fl">
									<el-checkbox-group v-model="common_2.Sex" disabled>
										<el-checkbox label="男"></el-checkbox>
										<el-checkbox label="女"></el-checkbox>
									</el-checkbox-group>
								</li>
								<li class="fl">本市常住人口</li>
								<li class="fl" style="border-right:0;">
									<el-checkbox-group v-model="common_2.IsPermanent" disabled>
										<el-checkbox label="是"></el-checkbox>
										<el-checkbox label="否"></el-checkbox>
									</el-checkbox-group>
								</li>
							</ul>
							<ul class="clearfix sec_row">
								<li class="fl">与主申请人关系</li>
								<li class="fl">
									<el-checkbox-group v-model="common_2.Relation" disabled>
										<el-checkbox label="配偶"></el-checkbox>
										<el-checkbox label="子女"></el-checkbox>
									</el-checkbox-group>
								</li>
								<li class="fl">婚姻状况</li>
								<li class="fl last_child" style="width:480px;">
									<el-checkbox-group v-model="common_2.MarryInfo" disabled>
										<el-checkbox label="已婚"></el-checkbox>
										<el-checkbox label="未婚"></el-checkbox>
										<el-checkbox label="离婚"></el-checkbox>
										<el-checkbox label="丧偶"></el-checkbox>
									</el-checkbox-group>
								</li>
							</ul>
							<ul class="clearfix thi_row">
								<li class="fl">身份证号</li>
								<li class="fl" v-for="(item,index) in common_2.IDCard">{{item}}</li>
							</ul>
						</div>
					</div>
					<div class="first_page_1 first_page_2 clearfix">
						<h4 class="fl">共同主申请人三</h4>
						<div class="fl">
							<ul class="clearfix fir_row">
								<li class="fl">姓名</li>
								<li class="fl">{{common_3.Name}}</li>
								<li class="fl">性别</li>
								<li class="fl">
									<el-checkbox-group v-model="common_3.Sex" disabled>
										<el-checkbox label="男"></el-checkbox>
										<el-checkbox label="女"></el-checkbox>
									</el-checkbox-group>
								</li>
								<li class="fl">本市常住人口</li>
								<li class="fl" style="border-right:0;">
									<el-checkbox-group v-model="common_3.IsPermanent" disabled>
										<el-checkbox label="是"></el-checkbox>
										<el-checkbox label="否"></el-checkbox>
									</el-checkbox-group>
								</li>
							</ul>
							<ul class="clearfix sec_row">
								<li class="fl">与主申请人关系</li>
								<li class="fl">
									<el-checkbox-group v-model="common_3.Relation" disabled>
										<el-checkbox label="配偶"></el-checkbox>
										<el-checkbox label="子女"></el-checkbox>
									</el-checkbox-group>
								</li>
								<li class="fl">婚姻状况</li>
								<li class="fl last_child" style="width:480px;">
									<el-checkbox-group v-model="common_3.MarryInfo" disabled>
										<el-checkbox label="已婚"></el-checkbox>
										<el-checkbox label="未婚"></el-checkbox>
										<el-checkbox label="离婚"></el-checkbox>
										<el-checkbox label="丧偶"></el-checkbox>
									</el-checkbox-group>
								</li>
							</ul>
							<ul class="clearfix thi_row">
								<li class="fl">身份证号</li>
								<li class="fl" v-for="(item,index) in common_3.IDCard">{{item}}</li>
							</ul>
						</div>
					</div>
					<div class='first_page_3'>
						<h4 class="marB30">主申请人（单身申请人）工作单位确认意见：</h4>
						<p class="marB20">
							<span>{{name}}</span> 已与我单位（组织机构代码：
							<span>{{USCCode}}</span>） 签订
							<el-checkbox-group v-model="SignYear" disabled>
								<el-checkbox label="一年"></el-checkbox>
								<el-checkbox label="两年"></el-checkbox>
							</el-checkbox-group>
							以上劳动合同。其填写的《申请人基本情况申报表》经我单位确认内容属实。如获准租赁公共租赁住房，租赁合同由
							<el-checkbox-group v-model="userType" disabled>
								<el-checkbox label="申请人"></el-checkbox>
								<el-checkbox label="我单位"></el-checkbox>
							</el-checkbox-group>
							与公共租赁住房项目运营机构签署。
						</p>
						<h5 class="fs14 tr marB20">负责人签字：</h5>
						<h5 class="fs14 tr">单位盖章：</h5>
					</div>
				</div>
				<div class="tip">
					<p class="marB20">注：1、《上海市居住证》持证年限包括之前持有《上海市临时居住证》年限</p>
					<p style="text-indent:2em;">2、16岁以下不持有居民身份证的共同申请人，身份证号码按《居民户口薄》内的身份证编号填写。</p>
				</div>
				<h6 class="abs">-&nbsp;&nbsp;1&nbsp;&nbsp;-</h6>
			</div>
			<div class="second_page_wrapper rel">
				<h4 class="tc fs24" style="padding:15px 0;">申请人本市住房情况申报表</h4>
				<div class="second_page">
					<div class="section_one">
						<h4 class="tc fs18">本市户籍地住址1</h4>
						<ul class="clearfix fir_ul">
							<li>房屋坐落地址</li>
							<li class="nth_2">{{roomLists[0].Address}}</li>
							<li class="nth_3">
								<el-checkbox-group v-model="roomLists[0].isUserArea" disabled>
									<el-checkbox label="建筑面积"></el-checkbox>
									<el-checkbox label="居住面积"></el-checkbox>
								</el-checkbox-group>
							</li>
							<li class="last_child">
								<span v-show="roomLists[0].Area==0">{{roomLists[0].UseArea}}</span>
								<span v-show="roomLists[0].Area!=0">{{roomLists[0].Area}}</span> 平方米
							</li>
						</ul>
						<ul class="clearfix fir_ul">
							<li>产权人或公房承租人</li>
							<li class="nth_2">{{roomLists[0].Owner}}</li>
							<li class="nth_3">该住房户籍人口总数</li>
							<li class="last_child">{{roomLists[0].PeopleCount}}</li>
						</ul>
						<ul class="clearfix sec_ul">
							<li>产权性质</li>
							<li class="nth_2 last_child">
								<el-checkbox-group v-model="roomLists[0].PropertyType" disabled>
									<el-checkbox label="直营公房"></el-checkbox>
									<el-checkbox label="系统公房"></el-checkbox>
									<el-checkbox label="已购产权房"></el-checkbox>
									<el-checkbox label="自有私房"></el-checkbox>
									<el-checkbox label="其他房"></el-checkbox>
								</el-checkbox-group>
							</li>
						</ul>
						<ul class="clearfix thi_ul">
							<li class="nth_1">房屋类型</li>
							<li class="nth_2 last_child clearfix">
								<el-checkbox-group v-model="roomLists[0].RoomType" disabled class="fl">
									<el-checkbox label="老式公寓"></el-checkbox>
									<el-checkbox label="花园住宅"></el-checkbox>
									<el-checkbox label="新里"></el-checkbox>
									<el-checkbox label="高层"></el-checkbox>
									<el-checkbox label="多层（成套）"></el-checkbox>
									<el-checkbox label="多层（不成套）"></el-checkbox>
									<el-checkbox label="旧里及非改居"></el-checkbox>
									<el-checkbox label="简屋"></el-checkbox>
									<el-checkbox label="'两万户'新公房"></el-checkbox>
									<el-checkbox label="其他"></el-checkbox>
								</el-checkbox-group>
								<div class="remark">备注<span></span></div>
							</li>
						</ul>
					</div>
					<div class="section_one">
						<h4 class="tc fs18">本市户籍地住址2</h4>
						<ul class="clearfix fir_ul">
							<li>房屋坐落地址</li>
							<li class="nth_2">{{roomLists[1].Address}}</li>
							<li class="nth_3">
								<el-checkbox-group v-model="roomLists[1].isUserArea" disabled>
									<el-checkbox label="建筑面积"></el-checkbox>
									<el-checkbox label="居住面积"></el-checkbox>
								</el-checkbox-group>
							</li>
							<li class="last_child">
								<span v-show="roomLists[1].Area==0">{{roomLists[1].UseArea}}</span>
								<span v-show="roomLists[1].Area!=0">{{roomLists[1].Area}}</span> 平方米
							</li>
						</ul>
						<ul class="clearfix fir_ul">
							<li>产权人或公房承租人</li>
							<li class="nth_2">{{roomLists[1].Owner}}</li>
							<li class="nth_3">该住房户籍人口总数</li>
							<li class="last_child">{{roomLists[1].PeopleCount}}</li>
						</ul>
						<ul class="clearfix sec_ul">
							<li>产权性质</li>
							<li class="nth_2 last_child">
								<el-checkbox-group v-model="roomLists[1].PropertyType" disabled>
									<el-checkbox label="直营公房"></el-checkbox>
									<el-checkbox label="系统公房"></el-checkbox>
									<el-checkbox label="已购产权房"></el-checkbox>
									<el-checkbox label="自有私房"></el-checkbox>
									<el-checkbox label="其他房"></el-checkbox>
								</el-checkbox-group>
							</li>
						</ul>
						<ul class="clearfix thi_ul">
							<li class="nth_1">房屋类型</li>
							<li class="nth_2 last_child clearfix">
								<el-checkbox-group v-model="roomLists[1].RoomType" disabled class="fl">
									<el-checkbox label="老式公寓"></el-checkbox>
									<el-checkbox label="花园住宅"></el-checkbox>
									<el-checkbox label="新里"></el-checkbox>
									<el-checkbox label="高层"></el-checkbox>
									<el-checkbox label="多层（成套）"></el-checkbox>
									<el-checkbox label="多层（不成套）"></el-checkbox>
									<el-checkbox label="旧里及非改居"></el-checkbox>
									<el-checkbox label="简屋"></el-checkbox>
									<el-checkbox label="'两万户'新公房"></el-checkbox>
									<el-checkbox label="其他"></el-checkbox>
								</el-checkbox-group>
								<div class="remark">备注<span></span></div>
							</li>
						</ul>
					</div>
					<div class="section_one">
						<h4 class="tc fs18">拥有本市产权住房1</h4>
						<ul class="clearfix fir_ul">
							<li>房屋坐落地址</li>
							<li class="nth_2">{{roomLists[2].Address}}</li>
							<li class="nth_3">建筑面积</li>
							<li class="last_child">
								<span>{{roomLists[2].Area}}</span>平方米
							</li>
						</ul>
						<ul class="clearfix fir_ul">
							<li>产权人</li>
							<li class="nth_2">{{roomLists[2].Owner}}</li>
							<li class="nth_3">该住房户籍人口总数</li>
							<li class="last_child">{{roomLists[2].PeopleCount}}</li>
						</ul>
					</div>
					<div class="section_one">
						<h4 class="tc fs18">拥有本市产权住房2</h4>
						<ul class="clearfix fir_ul">
							<li>房屋坐落地址</li>
							<li class="nth_2">{{roomLists[3].Address}}</li>
							<li class="nth_3">建筑面积</li>
							<li class="last_child">
								<span>{{roomLists[3].Area}}</span>平方米
							</li>
						</ul>
						<ul class="clearfix fir_ul">
							<li>产权人</li>
							<li class="nth_2">{{roomLists[3].Owner}}</li>
							<li class="nth_3">该住房户籍人口总数</li>
							<li class="last_child">{{roomLists[3].PeopleCount}}</li>
						</ul>
					</div>
					<div class="section_one">
						<h4 class="tc fs18">承租本市公有住房</h4>
						<ul class="clearfix fir_ul">
							<li>房屋坐落地址</li>
							<li class="nth_2">{{roomLists[4].Address}}</li>
							<li class="nth_3">
								<el-checkbox-group v-model="roomLists[4].isUserArea" disabled>
									<el-checkbox label="建筑面积"></el-checkbox>
									<el-checkbox label="居住面积"></el-checkbox>
								</el-checkbox-group>
							</li>
							<li class="last_child">
								<span v-show="roomLists[4].Area==0">{{roomLists[1].UseArea}}</span>
								<span v-show="roomLists[4].Area!=0">{{roomLists[1].Area}}</span> 平方米
							</li>
						</ul>
						<ul class="clearfix fir_ul">
							<li>公房承租人</li>
							<li class="nth_2">{{roomLists[4].Owner}}</li>
							<li class="nth_3">该住房户籍人口总数</li>
							<li class="last_child">{{roomLists[4].PeopleCount}}</li>
						</ul>
						<ul class="clearfix thi_ul last_child">
							<li class="nth_1">房屋类型</li>
							<li class="nth_2 last_child clearfix">
								<el-checkbox-group v-model="roomLists[1].RoomType" disabled class="fl">
									<el-checkbox label="老式公寓"></el-checkbox>
									<el-checkbox label="花园住宅"></el-checkbox>
									<el-checkbox label="新里"></el-checkbox>
									<el-checkbox label="高层"></el-checkbox>
									<el-checkbox label="多层（成套）"></el-checkbox>
									<el-checkbox label="多层（不成套）"></el-checkbox>
									<el-checkbox label="旧里及非改居"></el-checkbox>
									<el-checkbox label="简屋"></el-checkbox>
									<el-checkbox label="'两万户'新公房"></el-checkbox>
									<el-checkbox label="其他"></el-checkbox>
								</el-checkbox-group>
								<div class="remark">备注<span></span></div>
							</li>
						</ul>
					</div>
				</div>
				<div class="tip">
					<p class="marB20">注：</p>
					<p class="marB20">1、建筑面积、居住面积由申请人按《房地产权证》或《租用居住公房凭证》上机记载的面积填写。</p>
					<p class="marB20">2、上述住房如有除产权人或公租房承租人之外的户籍人口，需提供本市户口薄复印件。</p>
					<p>3、同一住房在不同栏目中不需要重复填写。</p>
				</div>
				<h6 class="abs">-&nbsp;&nbsp;2&nbsp;&nbsp;-</h6>
			</div>
			<div class="third_page_wrapper rel">
				<h4 class="tc fs30" style="padding-top:132px;">授权书</h4>
				<div class="third_page">
					<p>我们同意授权并配合住房保障机构对我们的住房情况等相关信息进行核查。</p>
					<p>特此授权。</p>
					<h5 class="tc fs24 c-3 marB30">主申请人、共同申请人、单身申请人签字：</h5>
					<ul class="clearfix">
						<li class="clearfix">
							<span>序号</span>
							<span>姓名（签名）</span>
							<span class="last_child">签名日期</span>
						</li>
						<li class="clearfix">
							<span></span>
							<span></span>
							<span class="last_child"></span>
						</li>
						<li class="clearfix">
							<span></span>
							<span></span>
							<span class="last_child"></span>
						</li>
						<li class="clearfix">
							<span></span>
							<span></span>
							<span class="last_child"></span>
						</li>
						<li class="clearfix">
							<span></span>
							<span></span>
							<span class="last_child"></span>
						</li>
					</ul>
				</div>
				<h4 class="tc fs30" style="padding-top:120px;">承诺书</h4>
				<div class="third_page chengnuoshu">
					<p>1、本人了解上海市浦东新区公共租赁住房相关政策，所填表格中的内容均属实，所提交的相关证明材料真实有效。如有虚假，愿意接受住房保障机构按照公共租赁住房相关规定所作的处理决定</p>
					<p>2、经核查，住房面积超过一定范围的，本人愿意接受住房保障机构将本人信息录入上海市个人信用联合征信系统。</p>
					<p class="tr nth_3">主申请人（单身申请人）签字：<span></span></p>
					<p class="tr nth_4"><span></span>年<span></span>月<span></span>日</p>
					<p class="nth_5">注：本申请表请用蓝色或黑色钢笔、水笔或签字笔填写，字迹工整，不得涂抹。</p>
				</div>
				<h6 class="abs">-&nbsp;&nbsp;3&nbsp;&nbsp;-</h6>
			</div>
			<div class="fourth_page_wrapper rel">
				<div class="fourth_page">
					<p class="tr nth_1">受理编号（系统生成）：<span class="inline">{{Code}}</span></p>
					<h4 class="tc fs30 bold">上海市浦东新区公共租赁住房准入资格申请表</h4>
					<ul>
						<li class="nth_1">主申请人（单身申请人）姓名：<span>{{name}}</span></li>
						<li class="nth_2">户籍所在地：<span>{{HouseholdAddress}}</span></li>
						<li class="nth_3">通讯地址：<span class="nth_1">{{Address}}</span>邮编：<span class="nth_2">{{PostalCode}}</span></li>
						<li class="nth_4">移动电话：<span class="nth_1">{{Phone}}</span>固定电话：<span class="nth_2">{{PhoneNum}}</span></li>
						<li class="nth_3">单位名称：<span class="nth_1">{{CompanyName}}</span>邮编：<span class="nth_2">{{CompanyPostalCode}}</span></li>
						<li class="nth_4" style="margin-bottom:0;">单位地址：<span class="nth_1" style="width:730px;margin-bottom:30px;">{{CompanyAddress}}</span>单位电话：<span class="nth_2">{{CompanyPhone}}</span></li>
					</ul>
					<p class="nth_2 tc">上海市浦东新区公共租赁住房投资运营有限公司</p>
					<p class="nth_3 tc">二〇一四一月印制</p>
				</div>
				<h6 class="abs">-&nbsp;&nbsp;4&nbsp;&nbsp;-</h6>
			</div>
		</div>
		<button type="button" class="btn btn-primary" v-on:click="getPdf()">导出PDF</button>
	</div>
</div>
</template>
<script>
    import { getApplyForLists,getApplyForInfo,getContractDetail } from '../../api/api.js'
	import moment from 'moment'
    import { IEVersion } from '../../util'
    export default{
        data(){
            return {
			//提示是否能下载
			dialogVisible:false,
			loading: false,
			dialogReatreat: false,
			titleReatreat: '',
			dialogInfo_cdw: '',
			dialogInfo_cpi: '',
			dialogInfo_member: '',
            stateContent:'',
			btn_loading: '-1',
			applyForLists: [{
				SignType: '',
				Code: '',
				Data: '',
				State: '',
			}],
			listsTotal: 10,
			page: 1,
			pageSize: 1,

			htmlTitle: '提交申请pdf',
			//pdf表格
			//个人情况
			name: '',
			sex: '',
			nation: '',
			marriage: '',
			IDCard: '',
			cultural: '',
			unit: '',
			isLocalMoney: '',
			ProvidentFundCard: '',
			LiveCard: '',
			HasSocialSecurityFund: '',
			isTwoYear: '',
			SocialSecurityFullYear: '',
			//共同申请人1
			common_1: {
				Name: '',
				IDCard: [, , , , , , , , , , , , , , , , , ],
				MarryInfo: '',
				Relation: '',
				IsPermanent: '',
				Sex: ''
			},
			//共同申请人2
			common_2: {
				Name: '',
				IDCard: [, , , , , , , , , , , , , , , , , ],
				MarryInfo: '',
				Relation: '',
				IsPermanent: '',
				Sex: ''
			},
			//共同申请人1
			common_3: {
				Name: '',
				IDCard: [, , , , , , , , , , , , , , , , , ],
				MarryInfo: '',
				Relation: '',
				IsPermanent: '',
				Sex: ''
			},
			USCCode: '',
			SignYear: [''],
			userType: [''],
			//表二
			isUserArea: [''],
			roomLists: [{
				Address: '', //房租坐落地址
				houseAreaType: '1',
				houseArea: '',
				Area: '',
				UseArea: '',
				Owner: '', //产权人或公房承租人
				PeopleCount: '', //该住房户籍人口总数
				PropertyType: '', //产权性质
				RoomType: '', //房屋类型
				isUserArea: '',
			}, {
				Address: '', //房租坐落地址
				houseAreaType: '1',
				houseArea: '',
				Area: '',
				UseArea: '',
				Owner: '', //产权人或公房承租人
				PeopleCount: '', //该住房户籍人口总数
				PropertyType: '', //产权性质
				RoomType: '', //房屋类型
				isUserArea: '',
			}, {
				Address: '',
				Area: '',
				Owner: '',
				PeopleCount: '',
				isUserArea: '',
			}, {
				Address: '',
				Area: '',
				Owner: '',
				PeopleCount: '',
				isUserArea: '',
			}, {
				Address: '', //房租坐落地址
				houseAreaType: '1',
				houseArea: '',
				Area: '',
				UseArea: '',
				Owner: '', //产权人或公房承租人
				PeopleCount: '', //该住房户籍人口总数
				PropertyType: '', //产权性质
				RoomType: '', //房屋类型
				isUserArea: '',
			}, ],

			//表四
			Code: '',
			HouseholdAddress: '',
			Address: '',
			PostalCode: '',
			Phone: '',
			PhoneNum: "",
			CompanyName: '',
			CompanyAddress: '',
			CompanyPhone: '',
			CompanyPostalCode: '',
		}
	},

	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.$store.commit('SET_MYCENTERNAV', 2)
		})
	},
	filters: {
		filterIDCard(val) {
			var arr = []
                for(var i in val){
                    arr[i] = val[i]

				}
			return arr
		},
		filterState(val) {
			if (val.Category == '1') {
				if (val.State == '1' || val.State == '2' || val.State == '4' || val.State == '5') {
					return '审核中'
				} else if (val.State == '-1' || val.State == '3') {
					return '不通过'
				} else if (val.State == '6') {
					return '审核通过'
				} else if (val.State == '8') {
					return '失效（作废）'
				} else if (val.State == '7') {
					return '撤回'
				} else {
					return '未知'
				}
			} else if (val.Category == '2') {
				if (val.State == '1') {
					return '审核中'
				} else if (val.State == '2') {
					return '审核通过'
				} else if (val.State == '3') {
					return '审核不通过'
				} else {
					return '未知'
				}
			}

		},
		//时间格式化
		dateFormat: function(date) {
			if (date == undefined) {
				return "";
			}
			return moment(date).format("YYYY-MM-DD");
		}
	},
	methods: {
		filterFunc(val) {
			if (val.State == '1') {
				return 'primary'
			} else if (val.State == '-1') {
				return 'danger'
			} else if (val.State == '6') {
				return 'success'
			} else if (val.State == '8') {
				return 'danger'
			} else {
				return '未知'
			}
		},
		formatSignType: function(row, column) {
			if (row.Category == 1) { //资格申请单
				if (row.Type == 1) { //资格申请
					return '资格申请'
				} else if (row.Type == 2) { //续租资格申请
					return '续租资格申请'
				} else {
					return '未知'
				}
			} else if (row.Category == 2) { //合同业务申请单
				if (row.Type == 2) { //续租申请
					return '续租申请'
				} else if (row.Type == 3) { //退租
					return '退租'
				} else if (row.Type == 4) { //申请-退租申请
					return '申请-退租申请'
				} else {
					return '未知'
				}
			}
		},
		checkApplyFor(index, row) {
			this.$store.commit('SET_APPLYFORCODE', row.Code)
			this.$store.commit('SET_ISUSERENTER', '1')

			this.$cookie.set('applyForCode', row.Code)
			this.$cookie.set('isUserEnter', '1')
			this.$router.push({
				path: '/applyFor'
			})
		},
		// 退租详情查看
		checkApplyForRetreat(index, row) {
            this.stateContent = row.State;
            console.log(this.stateContent)
            if(row.Category == 2 && row.Type == 2){
                this.titleReatreat = "续租申请(查看)";
            }else if (row.Category == 2 && row.Type == 3) {
                this.titleReatreat = "退租(查看)";
            }else if (row.Category == 2 && row.Type == 4) {
                this.titleReatreat = "申请-退租申请(查看)";
            }
			console.log(row);
			let params = {
				Id: row.Id
			}
			// 获取合同详情接口
			getContractDetail(params).then((response) => {
				console.log(JSON.parse(response.Data));
				this.dialogReatreat = true;
				var errorText = response.Info;
				switch (response.StatusCode) {
					case 200:
						this.dialogInfo_cdw = JSON.parse(response.Data).cdw;
						this.dialogInfo_cpi = JSON.parse(response.Data).cpi;
						this.dialogInfo_member = JSON.parse(response.Data).member;
						setTimeout(() => {
							this.loading = false
						}, 1000)
						//日期控件默认聚焦时间
						this.ContractId = this.dialogInfo_cdw.Id; //合同id
						break;
					case 500:
						this.$message({
							type: 'error',
							message: errorText
						});
						break;
					default:
						this.$message({
							type: 'error',
							message: '获取信息失败！'
						});
				}
			})
		},
		//改变当前页数
		handleCurrentChange(val) {
			this.page = val
			this.loading = true;
			setTimeout(() => {
				this.loading = false;
			}, 1000)
		},
		getApplyForInfoFunc(id) {
			getApplyForInfo({
				Id: id
			}).then(response => {
				if (response.StatusCode == 200) {
					var data = JSON.parse(response.Data)
					this.name = data.member.Name
					this.sex = data.member.Sex == 1 ? ['男'] : data.member.Sex == 2 ? ["女"] : ['']
					this.nation = data.member.Nation
					this.marriage = data.member.MarryInfo == 1 ? ['未婚'] : data.member.MarryInfo == 2 ? ['已婚'] : data.member.MarryInfo == 3 ? ['离婚'] : data.member.MarryInfo == 4 ? ['丧偶'] : ['']
					this.IDCard = data.member.IDCard
					if (data.member.Cultural == 0) {
						this.cultural = ['博士']
					} else if (data.member.Cultural == 1) {
						this.cultural = ['硕士']
					} else if (data.member.Cultural == 2) {
						this.cultural = ['本科']
					} else if (data.member.Cultural == 3) {
						this.cultural = ['大专、高职']
					} else if (data.member.Cultural == 4) {
						this.cultural = ['高中']
					} else if (data.member.Cultural == 5) {
						this.cultural = ['中专、职校']
					} else if (data.member.Cultural == 6) {
						this.cultural = ['初中']
					} else if (data.member.Cultural == 7) {
						this.cultural = ['小学']
					} else {
						this.cultural = ['']
					}
					if (data.company.CompanyType == 0) {
						this.unit = ['机关单位']
					} else if (data.company.CompanyType == 1) {
						this.unit = ['事业单位']
					} else if (data.company.CompanyType == 2) {
						this.unit = ['国有企业']
					} else if (data.company.CompanyType == 3) {
						this.unit = ['集体企业']
					} else if (data.company.CompanyType == 4) {
						this.unit = ['外资企业']
					} else if (data.company.CompanyType == 5) {
						this.unit = ['合资企业']
					} else if (data.company.CompanyType == 6) {
						this.unit = ['私营企业']
					} else if (data.company.CompanyType == 7) {
						this.unit = ['港澳台企业']
					} else if (data.company.CompanyType == 8) {
						this.unit = ['社会团体']
					} else if (data.company.CompanyType == 9) {
						this.unit = ['个体工商户']
					} else if (data.company.CompanyType == 10) {
						this.unit = ['非正规就业劳动组织']
					}
					this.isLocalMoney = data.member.HasProvidentFund == 1 ? ['是'] : ['否']
					this.ProvidentFundCard = data.member.ProvidentFundCard
					this.LiveCard = data.member.LiveCard
					this.isTwoYear = data.member.LiveCardFull2Year == 1 ? ['是'] : ['否']
					this.HasSocialSecurityFund = data.member.HasSocialSecurityFund == 1 ? ['是'] : ['否']
					this.SocialSecurityFullYear = data.member.SocialSecurityFullYear == 1 ? ['是'] : ['否']
					//共同申请人2
					if (data.residentlist.length == 1) {
						this.common_1 = data.residentlist[0]
						this.common_1.Sex = data.residentlist[0].Sex == 1 ? ['男'] : data.residentlist[0].Sex == 2 ? ["女"] : ['']
						this.common_1.IsPermanent = data.residentlist[0].IsPermanent == 1 ? ['是'] : data.residentlist[0].IsPermanent == 2 ? ['否'] : ['']
						this.common_1.Relation = data.residentlist[0].Relation == '子女' ? ['子女'] : data.residentlist[0].Relation == '配偶' ? ['配偶'] : ['']
						this.common_1.MarryInfo = data.residentlist[0].MarryInfo == 1 ? ['未婚'] : data.residentlist[0].MarryInfo == 2 ? ['已婚'] : data.residentlist[0].MarryInfo == 3 ? ['离婚'] : data.residentlist[0].MarryInfo == 4 ? ['丧偶'] : ['']
					} else if (data.residentlist.length == 2) {
						this.common_1 = data.residentlist[0]
						this.common_1.Sex = data.residentlist[0].Sex == 1 ? ['男'] : data.residentlist[0].Sex == 2 ? ["女"] : ['']
						this.common_1.IsPermanent = data.residentlist[0].IsPermanent == 1 ? ['是'] : data.residentlist[0].IsPermanent == 2 ? ['否'] : ['']
						this.common_1.Relation = data.residentlist[0].Relation == '子女' ? ['子女'] : data.residentlist[0].Relation == '配偶' ? ['配偶'] : ['']
						this.common_1.MarryInfo = data.residentlist[0].MarryInfo == 1 ? ['未婚'] : data.residentlist[0].MarryInfo == 2 ? ['已婚'] : data.residentlist[0].MarryInfo == 3 ? ['离婚'] : data.residentlist[0].MarryInfo == 4 ? ['丧偶'] : ['']
						this.common_2 = data.residentlist[1]
						this.common_2.Sex = data.residentlist[1].Sex == 1 ? ['男'] : data.residentlist[1].Sex == 2 ? ["女"] : ['']
						this.common_2.IsPermanent = data.residentlist[1].IsPermanent == 1 ? ['是'] : data.residentlist[1].IsPermanent == 2 ? ['否'] : ['']
						this.common_2.Relation = data.residentlist[1].Relation == '子女' ? ['子女'] : data.residentlist[1].Relation == '配偶' ? ['配偶'] : ['']
						this.common_2.MarryInfo = data.residentlist[1].MarryInfo == 1 ? ['未婚'] : data.residentlist[1].MarryInfo == 2 ? ['已婚'] : data.residentlist[1].MarryInfo == 3 ? ['离婚'] : data.residentlist[1].MarryInfo == 4 ? ['丧偶'] : ['']
					} else if (data.residentlist.length == 3) {
						this.common_1 = data.residentlist[0]
						this.common_1.Sex = data.residentlist[0].Sex == 1 ? ['男'] : data.residentlist[0].Sex == 2 ? ["女"] : ['']
						this.common_1.IsPermanent = data.residentlist[0].IsPermanent == 1 ? ['是'] : data.residentlist[0].IsPermanent == 2 ? ['否'] : ['']
						this.common_1.Relation = data.residentlist[0].Relation == '子女' ? ['子女'] : data.residentlist[0].Relation == '配偶' ? ['配偶'] : ['']
						this.common_1.MarryInfo = data.residentlist[0].MarryInfo == 1 ? ['未婚'] : data.residentlist[0].MarryInfo == 2 ? ['已婚'] : data.residentlist[0].MarryInfo == 3 ? ['离婚'] : data.residentlist[0].MarryInfo == 4 ? ['丧偶'] : ['']
						this.common_2 = data.residentlist[1]
						this.common_2.Sex = data.residentlist[1].Sex == 1 ? ['男'] : data.residentlist[1].Sex == 2 ? ["女"] : ['']
						this.common_2.IsPermanent = data.residentlist[1].IsPermanent == 1 ? ['是'] : data.residentlist[1].IsPermanent == 2 ? ['否'] : ['']
						this.common_2.Relation = data.residentlist[1].Relation == '子女' ? ['子女'] : data.residentlist[1].Relation == '配偶' ? ['配偶'] : ['']
						this.common_2.MarryInfo = data.residentlist[1].MarryInfo == 1 ? ['未婚'] : data.residentlist[1].MarryInfo == 2 ? ['已婚'] : data.residentlist[1].MarryInfo == 3 ? ['离婚'] : data.residentlist[1].MarryInfo == 4 ? ['丧偶'] : ['']
						this.common_3 = data.residentlist[2]
						this.common_3.Sex = data.residentlist[2].Sex == 1 ? ['男'] : data.residentlist[2].Sex == 2 ? ["女"] : ['']
						this.common_3.IsPermanent = data.residentlist[2].IsPermanent == 1 ? ['是'] : data.residentlist[2].IsPermanent == 2 ? ['否'] : ['']
						this.common_3.Relation = data.residentlist[2].Relation == '子女' ? ['子女'] : data.residentlist[2].Relation == '配偶' ? ['配偶'] : ['']
						this.common_3.MarryInfo = data.residentlist[2].MarryInfo == 1 ? ['未婚'] : data.residentlist[2].MarryInfo == 2 ? ['已婚'] : data.residentlist[0].MarryInfo == 3 ? ['离婚'] : data.residentlist[0].MarryInfo == 4 ? ['丧偶'] : ['']
					}
					this.USCCode = data.company.USCCode
					this.SignYear = data.company.SignYear == 1 ? ['一年'] : ['两年']
					//表二
					if (data.roomlist.length == 1) {
						this.roomLists[0] = data.roomlist[0]
					} else if (data.roomlist.length == 2) {
						this.roomLists[0] = data.roomlist[0]
						this.roomLists[1] = data.roomlist[1]
					} else if (data.roomlist.length == 3) {
						this.roomLists[0] = data.roomlist[0]
						this.roomLists[1] = data.roomlist[1]
						this.roomLists[2] = data.roomlist[2]
					} else if (data.roomlist.length == 4) {
						this.roomLists[0] = data.roomlist[0]
						this.roomLists[1] = data.roomlist[1]
						this.roomLists[2] = data.roomlist[2]
						this.roomLists[3] = data.roomlist[3]
					} else if (data.roomlist.length == 5) {
						this.roomLists[0] = data.roomlist[0]
						this.roomLists[1] = data.roomlist[1]
						this.roomLists[2] = data.roomlist[2]
						this.roomLists[3] = data.roomlist[3]
						this.roomLists[4] = data.roomlist[4]
					}
					for (var i = 0; i < data.roomlist.length; i++) {
						if (data.roomlist[i].Area != 0) {
							this.roomLists[i].isUserArea = ['建筑面积']
						} else {
							this.roomLists[i].isUserArea = ['居住面积']
						}
						if (data.roomlist[i].RoomType == 0) {
							this.roomLists[i].RoomType = ['老式公寓']
						} else if (data.roomlist[i].RoomType = 1) {
							this.roomLists[i].RoomType = ['花园住宅']
						} else if (data.roomlist[i].RoomType == 2) {
							this.roomLists[i].RoomType = ['新里']
						} else if (data.roomlist[i].RoomType == 3) {
							this.roomLists[i].RoomType = ['高层']
						} else if (data.roomlist[i].RoomType == 4) {
							this.roomLists[i].RoomType = ['多层（成套）']
						} else if (data.roomlist[i].RoomType == 5) {
							this.roomLists[i].RoomType = ['多层（不成套）']
						} else if (data.roomlist[i].RoomType == 6) {
							this.roomLists[i].RoomType = ['旧里及非改居']
						} else if (data.roomlist[i].RoomType == 7) {
							this.roomLists[i].RoomType = ['简屋']
						} else if (data.roomlist[i].RoomType == 8) {
							this.roomLists[i].RoomType = ['“两万户”新工房']
						} else if (data.roomlist[i].RoomType = 9) {
							this.roomLists[i].RoomType = ['其他']
						}

						if (data.roomlist[i].PropertyType == 0) {
							this.roomLists[i].PropertyType = ['直管公房']
						} else if (data.roomlist[i].PropertyType == 1) {
							this.roomLists[i].PropertyType = ['系统公房']
						} else if (data.roomlist[i].PropertyType == 2) {
							this.roomLists[i].PropertyType = ['已购产权房']
						} else if (data.roomlist[i].PropertyType == 3) {
							this.roomLists[i].PropertyType = ['自有私房']
						} else if (data.roomlist[i].PropertyType == 4) {
							this.roomLists[i].PropertyType = ['其他房']
						}

					}
					//表四
					this.Code = data.bill.CityBurceauCode
					this.HouseholdAddress = data.member.HouseholdAddress
					this.Address = data.bill.Address
					this.PostalCode = data.bill.PostalCode
					this.Phone = data.member.Phone
					this.PhoneNum = data.member.PhoneNum
					this.CompanyName = data.company.CompanyName
					this.CompanyPhone = data.company.CompanyPhone
					this.CompanyPostalCode = data.company.CompanyPostalCode
					this.CompanyAddress = data.company.CompanyAddress
					setTimeout(() => {
						this.getPdf()
						this.btn_loading = '-1'
					}, 800)

				} else {
					this.$message({
						type: 'success',
						message: response.Info,
					});
					setTimeout(() => {
						this.getPdf()
						this.btn_loading = '-1'
					}, 800)
				}
			}).catch(error => {
				this.$message({
					type: 'error',
					message: error,
				});
			})
		},
		uploadApplyFor(index,row){//点击下载
			// this.$store.commit('SET_APPLYFORCODE',row.Code)
			// this.$store.commit('SET_ISUSERENTER','1')
			// this.$cookie.set('applyForCode',row.Code)
			// this.$cookie.set('isUserEnter','1')
			// this.$router.push({path: '/downloadPdf'})
			console.log(IEVersion())
			if(IEVersion() == -1){
				this.btn_loading= index
				this.getApplyForInfoFunc(row.Code)
			}else{
				this.dialogVisible = true
			}

		},
		//下载其他浏览器
		uploadOther(){
			window.open("http://browsehappy.osfipin.com/")
		},
	},
	created(){
		if(this.$store.getters.userInfo){
			this.loading = true
			//获取申请列表页
			getApplyForLists({QueryJson:{AccountId:this.$store.getters.userInfo.AccountId}}).then(response => {
				switch(response.StatusCode){
					case 500 :
						this.$message.error('申请列表请求失败'+response.Info)
						break;
					case 200:
						this.applyForLists = response.Data
						setTimeout(()=>{
							this.loading = false
						},1000)

				}
			}).catch(error => {
				this.$message.error(error)
			})
		}
	}
    }
</script>
<style lang="scss">
.download_pdf_wrapper {
    position: fixed!important;
    left: 50%;
    top: 0;
    margin-left: -585px;
    opacity: 0!important;
    z-index: -1;
    filter:alpha(opacity=0);
    .el-radio__input.is-disabled .el-radio__inner {
        border-color: #333!important;
    }
    .el-radio__input.is-disabled.is-checked .el-radio__inner::after {
        background-color: #333;
    }
    .el-radio__label {
        color: #333!important;
    }
    .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
        border-color: #333;
    }
    .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
        background-color: #fff;
        border-color: #333;
    }
    .el-checkbox__input.is-disabled .el-checkbox__inner {
        background-color: #fff;
        border-color: #333;
        cursor: not-allowed;
    }
    .el-checkbox__input.is-disabled + span.el-checkbox__label {
        font-size: 16px;
        color: #333;
        cursor: not-allowed;
    }
    .el-checkbox-group {
        display: inline-block;
    }
    .el-checkbox__inner::after {
        -webkit-box-sizing: content-box;
        box-sizing: content-box;
        content: "";
        border: 6px solid #fff;
        border-left: 0;
        border-top: 0;
        height: 13px;
        left: 7px;
        position: absolute;
        top: -13px;
        -webkit-transform: rotate(45deg) scaleY(0);
        transform: rotate(45deg) scaleY(0);
        width: 3px;
        -webkit-transition: -webkit-transform 0.15s cubic-bezier(0.71, -0.46, 0.88, 0.6) 0.05s;
        transition: -webkit-transform 0.15s cubic-bezier(0.71, -0.46, 0.88, 0.6) 0.05s;
        transition: transform 0.15s cubic-bezier(0.71, -0.46, 0.88, 0.6) 0.05s;
        transition: transform 0.15s cubic-bezier(0.71, -0.46, 0.88, 0.6) 0.05s, -webkit-transform 0.15s cubic-bezier(0.71, -0.46, 0.88, 0.6) 0.05s;
        -webkit-transform-origin: center;
        transform-origin: center;
    }
    padding: 20px 0;
    .download_pdf {
        margin: 0 auto;
        width: 1170px;
        background: url("../../assets/images/shuiyin.png") #fff;
        background-size: 80% auto;
        > div {
            > h6 {
                bottom: 20px;
                left: 50%;
                margin-left: -19px;
                font-size: 16px;
            }
        }
    }
    .first_page_wrapper {
        height: 1636px;
        padding: 20px 0 0;
        > h4 {
            padding: 10px 0 20px;
        }
        > .first_page {
            width: 1100px;
            margin: 0 auto;
            border: 1px solid #333;
            > .first_page_1 {
                > h4 {
                    padding: 50px 4px;
                    writing-mode: tb-rl;
                    font-size: 16px;
                }
                > div {
                    width: 1067px;
                    ul {
                        border-left: 1px solid #333;
                        border-bottom: 1px solid #333;
                        li {
                            font-size: 16px;
                            text-align: center;
                            border-right: 1px solid #333;
                            width: 172px;
                            min-height: 22px;
                            padding: 22px 0;
                            &.last_child {
                                border-right: none;
                            }
                        }
                    }
                    ul.fir_row {
                        }
                    ul.sec_row {
                        border-bottom: 1px solid #333;
                        li {
                            &:last-child {
                                width: 800px;
                            }
                        }
                    }
                    ul.thi_row {
                        border-bottom: 1px solid #333;
                        li {
                            &:first-child {
                                width: 172px;
                            }
                            &:nth-of-type(19) {
                                border-right: 0;
                            }
                            width: 48.5px;
                            height: 20px;
                            font-size: 18px;
                        }
                    }
                    ul.four_row {
                        li {
                            &:nth-of-type(2) {
                                width: 850px;
                                .el-checkbox-group {
                                    width: 650px;
                                    label {
                                        margin-left: 12px;
                                    }
                                }
                                .other {
                                    input {
                                        border-bottom: 1px solid #333;
                                    }
                                }
                            }
                        }
                    }
                    ul.fif_row {
                        li {
                            height: 36px;
                            &:nth-of-type(2) {
                                margin-right: 0;
                                width: 850px;
                                .el-radio-group {
                                    .el-radio {
                                        margin-bottom: 4px;
                                    }
                                }
                                .other {
                                    display: inline-block;
                                    width: 200px;
                                }
                            }
                        }
                    }
                    ul.six_row {
                        li {
                            height: 44px;
                            line-height: 44px;
                            &:nth-of-type(2n) {
                                width: 300px;
                            }
                            &:nth-of-type(1) {
                                line-height: normal;
                            }
                        }
                    }
                    ul.sev_row {
                        border-bottom: none;
                        li {
                            padding: 0;
                            height: 80px;
                            text-align: justify;
                            &:nth-of-type(1) {
                                line-height: 80px;
                                text-align: center;
                            }
                            &:nth-of-type(2),
                            &:nth-of-type(3) {
                                width: 445px;
                                > div {
                                    height: 40px;
                                    line-height: 40px;
                                    border-bottom: 1px solid #333;
                                    > label {
                                        text-align: center;
                                        display: inline-block;
                                        width: 120px;
                                        height: 40px;

                                        border-right: 1px solid #333;
                                    }
                                    > span {
                                        text-align: center;
                                        width: 270px;
                                        height: 40px;
                                        display: inline-block;
                                    }
                                }
                            }
                            &:nth-of-type(3) {
                                > div {
                                    > label {
                                        line-height: normal;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            > .first_page_2 {
                > h4 {
                    padding: 21px 4px;
                }
                border-top: 1px solid #333;
                ul.sec_row {
                    li {
                        &:last-child {
                            width: 480px!important;
                        }
                    }
                }
                ul.thi_row {
                    border-bottom: none!important;
                }
            }
            > .first_page_3 {
                border-top: 1px solid #333;
                padding: 20px 40px;
                font-size: 16px;
                > p {
                    text-indent: 2em;
                    line-height: 48px;
                    font-size: 16px;
                    > span {
                        display: inline-block;
                        width: auto;
                        height: 32px;
                        border-bottom: 1px solid #333;
                    }
                    .el-checkbox-group {
                        display: inline-block;
                        border-bottom: 1px solid #333;
                        height: 28px;
                        > .el-checkbox {
                            height: 28px;
                            line-height: 28px;
                            width: 100px;
                            .el-checkbox__input {
                                position: relative;
                                left: -54px;
                                width: 30px;
                            }
                            .el-checkbox__label {
                                width: 65px;
                                position: relative;
                                left: -65px;
                            }
                        }
                    }
                }
                h5 {
                    width: 80%;
                    font-size: 16px;
                }
            }
        }
    }
    .tip {
        padding: 20px 60px;
        p {
            font-size: 16px;
        }
    }
    .second_page_wrapper {
        height: 1656px;
        > h4 {
            padding: 20px;
        }
        .second_page {
            width: 1100px;
            margin: 0 auto;
            border: 1px solid #333;
            .section_one {
                > h4 {
                    padding: 20px 0;
                    border-bottom: 1px solid #333;
                }
                > ul {
                    border-bottom: 1px solid #333;
                    li {
                        font-size: 16px;
                        float: left;
                        padding: 20px 0;
                        min-height: 22px;
                        width: 190px;
                        text-align: center;
                        border-right: 1px solid #333;
                        &.nth_1 {
                            height: 54px;
                            line-height: 54px;
                        }
                        &.nth_2 {
                            width: 386px;
                        }
                        &.nth_3 {
                            width: 330px;
                        }
                        &.last_child {
                            border-right: none;
                        }
                    }
                    &.last_child {
                        border-bottom: none;
                    }
                    &.fir_ul {
                        li {
                            &.last_child {
                                > span {
                                    display: inline-block;
                                    width: 100px;
                                    border-bottom: 1px solid #333;
                                    bottom: -4px;
                                    position: relative;
                                }
                            }
                        }
                    }
                    &.sec_ul {
                        li {
                            &.nth_2 {
                                width: 600px;
                            }
                        }
                    }
                    &.thi_ul {
                        li {
                            &.nth_2 {
                                text-align: left;
                                width: 900px;
                                > div {
                                    width: 648px;
                                    margin-left: 40px;
                                    .el-checkbox {
                                        margin-bottom: 8px;
                                    }
                                    &.remark {
                                        width: 140px;
                                        display: inline-block;
                                        span {
                                            display: inline-block;
                                            width: 80px;
                                            border-bottom: 1px solid #333;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .third_page_wrapper {
        height: 1656px;
        > h4 {
            padding: 40px 0;
        }
        .third_page {
            width: 900px;
            margin: 0 auto;
            > p {
                text-indent: 2em;
                font-size: 26px;
                line-height: 50px;
                margin-bottom: 20px;
            }
            > ul {
                border: 1px solid #333;
                text-align: center;
                li {
                    height: 50px;
                    line-height: 50px;
                    border: 1px solid #333;
                    span {
                        display: block;
                        float: left;
                        width: 297px;
                        height: 50px;
                        font-size: 24px;
                        border-right: 1px solid #333;
                        &.last_child {
                            border-right: none;
                        }
                    }
                }
            }
            &.chengnuoshu {
                > p {
                    > span {
                        display: inline-block;
                        position: relative;
                    }
                    &.nth_3 {
                        padding-top: 120px;
                        > span {
                            width: 200px;
                            border-bottom: 1px solid #333;
                            height: 20px;
                            top: 6px;
                        }
                    }
                    &.nth_4 {
                        > span {
                            width: 90px;
                            height: 20px;
                        }
                    }
                    &.nth_5 {
                        padding: 60px 0;
                        margin-bottom: 0;
                        font-size: 22px;
                    }
                }
            }
        }
    }
    .fourth_page_wrapper {
        height: 1656px;
        .fourth_page {
            width: 900px;
            margin: 0 auto;
            padding-top: 100px;
            > h4 {
                padding: 150px 0 220px;
            }
            p {
                font-size: 26px;
                &.nth_1 {
                    > span {
                        min-width: 180px;
                        height: 20px;
                    }
                }
                &.nth_2 {
                    padding: 540px 0 20px;
                }
                &.nth_3 {
                    padding: 0 0 60px;
                }
            }
            ul {
                li {
                    font-size: 26px;
                    margin-bottom: 30px;
                    > span {
                        display: inline-block;
                        height: 32px;
                        position: relative;
                        top: 0;
                        margin-right: 40px;
                        border-bottom: 1px solid #333;
                    }
                    &.nth_1 {
                        span {
                            width: 490px;
                        }
                    }
                    &.nth_2 {
                        span {
                            width: 698px;
                        }
                    }
                    &.nth_3 {
                        span {
                            width: 688px;
                            &.nth_1 {
                                width: 490px;
                            }
                            &.nth_2 {
                                width: 120px;
                            }
                        }
                    }
                    &.nth_4 {
                        span {
                            width: 688px;
                            &.nth_1 {
                                width: 280px;
                            }
                            &.nth_2 {
                                width: 280px;
                            }
                        }
                    }
                }
            }
        }
    }
}
#applynoHead .el-dialog .el-dialog__header {
    background: white !important;
}
.applyBody {
    width: 960px;
    padding: 0px 30px;
    margin: -25px auto -10px;
}
.retreatTable tbody td {
    border: 1px solid rgb(219, 219, 219);
    padding: 8px;
}
.primary-button {
    background: #009688 !important;
    border-color: #009688 !important;
    color: white !important;
    &:hover {
        background: #18ab9d !important;
        border-color: #18ab9d !important;
        color: white !important;
    }
}
</style>
