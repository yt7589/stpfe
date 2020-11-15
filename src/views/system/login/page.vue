<template>
  <div class="page-login">
    <div class="login-form-box" v-if="page=='login'">
      <div class="login-form">
        <div class="form-title">
          <!--<span class="logo"></span>-->
          <span class="title">用户登录</span>
        </div>
        <el-form class="form-body custom-form" ref="loginForm" :model="loginForm.form" :rules="loginForm.rules" @submit.native.prevent>
          <el-form-item prop="username">
            <el-input placeholder="请输入您的用户名" class="custom-input" v-model="loginForm.form.username">
              <el-image slot="prefix" :src="require('./image/img-username.png')"></el-image>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="请输入您的密码" class="custom-input" v-model=" loginForm.form.password" type="password">
              <el-image slot="prefix" :src="require('./image/img-password.png')"></el-image>
            </el-input>
          </el-form-item>
          <div class="form-forget-password">
            <el-checkbox v-model="loginForm.storePassword" class="save-password">记住密码</el-checkbox>
            <el-link class="forget-password">忘记密码?</el-link>
          </div>
          <div class="form-button">
            <el-button class="custom-button" @click="submit" native-type="submit">安全登陆</el-button>
            <el-button class="custom-button" @click="submit">口令登陆</el-button>
          </div>
          <div class="form-register">
            <span>没有账号? &nbsp;&nbsp;</span>
            <el-link class="register-button" @click="page='register'">点击注册</el-link>
          </div>
        </el-form>
      </div>
    </div>
    <div class="register-form-box" v-if="page=='register'">
      <div class="register-form">
        <el-form class="form-body custom-form" ref="registerForm" :model="registerForm.form" :rules="registerForm.rules" label-width="0.65rem" @submit.native.prevent>
          <el-form-item prop="userCode" label="用户名">
            <span slot="label" class="form-item-prefix">
              <el-image slot="prefix" :src="require('./image/img-username.png')"></el-image>
              用户名
            </span>
            <el-input placeholder="请输入您的用户名" class="custom-input" v-model="registerForm.form.userCode">

            </el-input>
          </el-form-item>
          <el-form-item prop="companyName" label="公司">
            <span slot="label" class="form-item-prefix">
              <el-image slot="prefix" :src="require('./image/img-company.png')"></el-image>
              公司名称
            </span>
            <el-input placeholder="请输入您的公司" class="custom-input" v-model="registerForm.form.companyName">

            </el-input>
          </el-form-item>
          <el-form-item prop="city" label="城市">
            <span slot="label" class="form-item-prefix">
              <el-image slot="prefix" :src="require('./image/img-location.png')"></el-image>
              所在城市
            </span>
            <el-autocomplete
              class="custom-input"
              v-model="registerForm.form.city"
              :fetch-suggestions="queryCitySearch"
              placeholder="请输入您所在的城市"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item prop="mobileCode" label="手机号">
            <span slot="label" class="form-item-prefix">
              <el-image slot="prefix" :src="require('./image/img-phone.png')"></el-image>
              手机号
            </span>
            <el-input placeholder="请输入您的手机号" class="custom-input" v-model="registerForm.form.mobileCode">
            </el-input>
          </el-form-item>
          <el-form-item prop="verifyCode" label="验证码">
            <span slot="label" class="form-item-prefix">
              <el-image slot="prefix" :src="require('./image/register-code.png')"></el-image>
              验证码
            </span>
            <el-input placeholder="请输入验证码" class="custom-input" v-model="registerForm.form.verifyCode">
              <el-button class="button-code" type="password" show-password slot="suffix" @click="getMobileCode" :disabled="!registerForm.mobileCode.enable">{{registerForm.mobileCode.text}}</el-button>
            </el-input>
          </el-form-item>
          <el-form-item prop="userPassword" label="密码">
            <span slot="label" class="form-item-prefix">
              <el-image slot="prefix" :src="require('./image/img-password.png')"></el-image>
              密码
            </span>
            <el-input placeholder="请输入密码" type="password" show-password class="custom-input" v-model="registerForm.form.userPassword">
            </el-input>
          </el-form-item>
          <el-form-item prop="password_check" label="确认密码">
            <span slot="label" class="form-item-prefix">
              <el-image slot="prefix" :src="require('./image/img-password.png')"></el-image>
              确认密码
            </span>
            <el-input placeholder="请再次输入密码" class="custom-input" v-model="registerForm.form.password_check">
            </el-input>
          </el-form-item>
          <el-checkbox v-model="registerForm.readAgreement">
            <span style="color:#FFFFF0;">我已阅读且同意</span>
            <span style="color:#00F6FF;">《转睛云服务协议》</span>
          </el-checkbox>
        </el-form>
        <div class="form-button">
          <el-button class="custom-button" @click="goBack">返回登陆</el-button>
          <el-button class="custom-button" @click="register" native-type="submit">立即注册</el-button>
        </div>
      </div>
      <el-dialog class="register-success-dialog" :visible.sync="registerForm.dialog.visible" width="2.6rem">
        <el-image class="image-close" :src="require('./image/image-close.png')" @click="registerForm.dialog.visible=false"></el-image>
        <el-image class="image-cloud" :src="require('./image/image-cloud.png')"></el-image>
        <div class="text-1">恭喜您已成功注册转睛云<br>认证审核时间w为1-2个工作日</div>
        <div class="text-2">我们客服会尽快联系您，请保持电话畅通<br>如有急需，请拨打客服热线<span style="color:#00F6FF;">133 6603 7936</span></div>
      </el-dialog>
    </div>
    <div class="copyright">XXXX科技有限公司 Copyright 2019 | 沪IPC备XXXXXXXX号</div>
  </div>
</template>

<script>
  import dayjs from 'dayjs'
  import {mapActions} from 'vuex'
  import api from '@/api'

  export default {
    data () {
      return {
        page: 'login',
        loginForm: {
          form: {
            username: '',
            password: ''
          },
          rules: {},
          storePassword: false,
        },
        registerForm: {
          form: {
            userCode: '',
            companyName: '',
            city: '',
            mobileCode: '',
            verifyCode: '',
            userPassword: "",
            password_check: '',
          },
          rules: {
            userCode: [
              {required: true, message: '请输入用户名', trigger: 'blur'},
            ],
            companyName: [
              {required: true, message: '请输入您的公司', trigger: 'blur'},
            ],
            city: [
              {required: true, message: '请输入您所在的城市', trigger: 'blur'},
            ],
            mobileCode: [
              {required: true, message: '请输入您的手机号', trigger: 'blur'},
            ],
            verifyCode: [
              {required: true, message: '请输入验证码', trigger: 'blur'},
            ],
            userPassword: [
              {required: true, message: '请输入密码', trigger: 'blur'},
            ],
            password_check: [
              {required: true, message: '请再次输入密码', trigger: 'blur'},
            ],
          },
          readAgreement: false,
          cityOptions: [{"value": "石家庄市"}, {"value": "邯郸市"}, {"value": "唐山市"}, {"value": "保定市"}, {"value": "秦皇岛市"}, {"value": "邢台市"}, {"value": "张家口市"}, {"value": "承德市"}, {"value": "沧州市"}, {"value": "廊坊市"}, {"value": "衡水市"}, {"value": "辛集市"}, {"value": "晋州市"}, {"value": "新乐市"}, {"value": "遵化市"}, {"value": "迁安市"}, {"value": "霸州市"}, {"value": "三河市"}, {"value": "定州市"}, {"value": "涿州市"}, {"value": "安国市"}, {"value": "高碑店市"}, {"value": "泊头市"}, {"value": "任丘市"}, {"value": "黄骅市"}, {"value": "河间市"}, {"value": "冀州市"}, {"value": "深州市"}, {"value": "南宫市"}, {"value": "沙河市"}, {"value": "武安市"}, {"value": "太原市"}, {"value": "大同市"}, {"value": "朔州市"}, {"value": "阳泉市"}, {"value": "长治市"}, {"value": "晋城市"}, {"value": "忻州市"}, {"value": "吕梁市"}, {"value": "晋中市"}, {"value": "临汾市"}, {"value": "运城市"}, {"value": "古交市"}, {"value": "潞城市"}, {"value": "高平市"}, {"value": "原平市"}, {"value": "孝义市"}, {"value": "汾阳市"}, {"value": "介休市"}, {"value": "侯马市"}, {"value": "霍州市"}, {"value": "永济市"}, {"value": "河津市"}, {"value": "呼和浩特市"}, {"value": "包头市"}, {"value": "乌海市"}, {"value": "赤峰市"}, {"value": "呼伦贝尔市"}, {"value": "通辽市"}, {"value": "乌兰察布市"}, {"value": "鄂尔多斯市"}, {"value": "巴彦淖尔市"}, {"value": "满洲里市"}, {"value": "扎兰屯市"}, {"value": "牙克石市"}, {"value": "根河市"}, {"value": "额尔古纳市"}, {"value": "乌兰浩特市"}, {"value": "阿尔山市"}, {"value": "霍林郭勒市"}, {"value": "锡林浩特市"}, {"value": "二连浩特市"}, {"value": "丰镇市"}, {"value": "沈阳市"}, {"value": "大连市"}, {"value": "朝阳市"}, {"value": "阜新市"}, {"value": "铁岭市"}, {"value": "抚顺市"}, {"value": "本溪市"}, {"value": "辽阳市"}, {"value": "鞍山市"}, {"value": "丹东市"}, {"value": "营口市"}, {"value": "盘锦市"}, {"value": "锦州市"}, {"value": "葫芦岛市"}, {"value": "新民市"}, {"value": "瓦房店市"}, {"value": "庄河市"}, {"value": "北票市"}, {"value": "凌源市"}, {"value": "调兵山市"}, {"value": "开原市"}, {"value": "灯塔市"}, {"value": "海城市"}, {"value": "凤城市"}, {"value": "东港市"}, {"value": "大石桥市"}, {"value": "盖州市"}, {"value": "凌海市"}, {"value": "北镇市"}, {"value": "兴城市"}, {"value": "长春市"}, {"value": "吉林市"}, {"value": "白城市"}, {"value": "松原市"}, {"value": "四平市"}, {"value": "辽源市"}, {"value": "通化市"}, {"value": "白山市"}, {"value": "德惠市"}, {"value": "榆树市"}, {"value": "磐石市"}, {"value": "蛟河市"}, {"value": "桦甸市"}, {"value": "舒兰市"}, {"value": "洮南市"}, {"value": "大安市"}, {"value": "双辽市"}, {"value": "公主岭市"}, {"value": "梅河口市"}, {"value": "集安市"}, {"value": "临江市"}, {"value": "延吉市"}, {"value": "图们市"}, {"value": "敦化市"}, {"value": "珲春市"}, {"value": "龙井市"}, {"value": "和龙市"}, {"value": "扶余市"}, {"value": "哈尔滨市"}, {"value": "齐齐哈尔市"}, {"value": "黑河市"}, {"value": "大庆市"}, {"value": "伊春市"}, {"value": "鹤岗市"}, {"value": "佳木斯市"}, {"value": "双鸭山市"}, {"value": "七台河市"}, {"value": "鸡西市"}, {"value": "牡丹江市"}, {"value": "绥化市"}, {"value": "尚志市"}, {"value": "五常市"}, {"value": "讷河市"}, {"value": "北安市"}, {"value": "五大连池市"}, {"value": "铁力市"}, {"value": "同江市"}, {"value": "富锦市"}, {"value": "虎林市"}, {"value": "密山市"}, {"value": "绥芬河市"}, {"value": "海林市"}, {"value": "宁安市"}, {"value": "安达市"}, {"value": "肇东市"}, {"value": "海伦市"}, {"value": "穆棱市"}, {"value": "东宁市"}, {"value": "抚远市"}, {"value": "南京市"}, {"value": "徐州市"}, {"value": "连云港市"}, {"value": "宿迁市"}, {"value": "淮安市"}, {"value": "盐城市"}, {"value": "扬州市"}, {"value": "泰州市"}, {"value": "南通市"}, {"value": "镇江市"}, {"value": "常州市"}, {"value": "无锡市"}, {"value": "苏州市"}, {"value": "常熟市"}, {"value": "张家港市"}, {"value": "太仓市"}, {"value": "昆山市"}, {"value": "江阴市"}, {"value": "宜兴市"}, {"value": "溧阳市"}, {"value": "扬中市"}, {"value": "句容市"}, {"value": "丹阳市"}, {"value": "如皋市"}, {"value": "海门市"}, {"value": "启东市"}, {"value": "高邮市"}, {"value": "仪征市"}, {"value": "兴化市"}, {"value": "泰兴市"}, {"value": "靖江市"}, {"value": "东台市"}, {"value": "邳州市"}, {"value": "新沂市"}, {"value": "杭州市"}, {"value": "宁波市"}, {"value": "湖州市"}, {"value": "嘉兴市"}, {"value": "舟山市"}, {"value": "绍兴市"}, {"value": "衢州市"}, {"value": "金华市"}, {"value": "台州市"}, {"value": "温州市"}, {"value": "丽水市"}, {"value": "临安市"}, {"value": "建德市"}, {"value": "慈溪市"}, {"value": "余姚市"}, {"value": "平湖市"}, {"value": "海宁市"}, {"value": "桐乡市"}, {"value": "诸暨市"}, {"value": "嵊州市"}, {"value": "江山市"}, {"value": "兰溪市"}, {"value": "永康市"}, {"value": "义乌市"}, {"value": "东阳市"}, {"value": "临海市"}, {"value": "温岭市"}, {"value": "瑞安市"}, {"value": "乐清市"}, {"value": "龙泉市"}, {"value": "合肥市"}, {"value": "芜湖市"}, {"value": "蚌埠市"}, {"value": "淮南市"}, {"value": "马鞍山市"}, {"value": "淮北市"}, {"value": "铜陵市"}, {"value": "安庆市"}, {"value": "黄山市"}, {"value": "滁州市"}, {"value": "阜阳市"}, {"value": "宿州市"}, {"value": "六安市"}, {"value": "亳州市"}, {"value": "池州市"}, {"value": "宣城市"}, {"value": "巢湖市"}, {"value": "桐城市"}, {"value": "天长市"}, {"value": "明光市"}, {"value": "界首市"}, {"value": "宁国市"}, {"value": "厦门市"}, {"value": "福州市"}, {"value": "南平市"}, {"value": "三明市"}, {"value": "莆田市"}, {"value": "泉州市"}, {"value": "漳州市"}, {"value": "龙岩市"}, {"value": "宁德市"}, {"value": "福清市"}, {"value": "长乐市"}, {"value": "邵武市"}, {"value": "武夷山市"}, {"value": "建瓯市"}, {"value": "永安市"}, {"value": "石狮市"}, {"value": "晋江市"}, {"value": "南安市"}, {"value": "龙海市"}, {"value": "漳平市"}, {"value": "福安市"}, {"value": "福鼎市"}, {"value": "南昌市"}, {"value": "九江市"}, {"value": "景德镇市"}, {"value": "鹰潭市"}, {"value": "新余市"}, {"value": "萍乡市"}, {"value": "赣州市"}, {"value": "上饶市"}, {"value": "抚州市"}, {"value": "宜春市"}, {"value": "吉安市"}, {"value": "瑞昌市"}, {"value": "共青城市"}, {"value": "乐平市"}, {"value": "瑞金市"}, {"value": "德兴市"}, {"value": "丰城市"}, {"value": "樟树市"}, {"value": "高安市"}, {"value": "井冈山市"}, {"value": "贵溪市"}, {"value": "济南市"}, {"value": "青岛市"}, {"value": "聊城市"}, {"value": "德州市"}, {"value": "东营市"}, {"value": "淄博市"}, {"value": "潍坊市"}, {"value": "烟台市"}, {"value": "威海市"}, {"value": "日照市"}, {"value": "临沂市"}, {"value": "枣庄市"}, {"value": "济宁市"}, {"value": "泰安市"}, {"value": "莱芜市"}, {"value": "滨州市"}, {"value": "菏泽市"}, {"value": "胶州市"}, {"value": "即墨市"}, {"value": "平度市"}, {"value": "莱西市"}, {"value": "临清市"}, {"value": "乐陵市"}, {"value": "禹城市"}, {"value": "安丘市"}, {"value": "昌邑市"}, {"value": "高密市"}, {"value": "青州市"}, {"value": "诸城市"}, {"value": "寿光市"}, {"value": "栖霞市"}, {"value": "海阳市"}, {"value": "龙口市"}, {"value": "莱阳市"}, {"value": "莱州市"}, {"value": "蓬莱市"}, {"value": "招远市"}, {"value": "荣成市"}, {"value": "乳山市"}, {"value": "滕州市"}, {"value": "曲阜市"}, {"value": "邹城市"}, {"value": "新泰市"}, {"value": "肥城市"}, {"value": "郑州市"}, {"value": "开封市"}, {"value": "洛阳市"}, {"value": "平顶山市"}, {"value": "安阳市"}, {"value": "鹤壁市"}, {"value": "新乡市"}, {"value": "焦作市"}, {"value": "濮阳市"}, {"value": "许昌市"}, {"value": "漯河市"}, {"value": "三门峡市"}, {"value": "南阳市"}, {"value": "商丘市"}, {"value": "周口市"}, {"value": "驻马店市"}, {"value": "信阳市"}, {"value": "荥阳市"}, {"value": "新郑市"}, {"value": "登封市"}, {"value": "新密市"}, {"value": "偃师市"}, {"value": "孟州市"}, {"value": "沁阳市"}, {"value": "卫辉市"}, {"value": "辉县市"}, {"value": "林州市"}, {"value": "禹州市"}, {"value": "长葛市"}, {"value": "舞钢市"}, {"value": "义马市"}, {"value": "灵宝市"}, {"value": "项城市"}, {"value": "巩义市"}, {"value": "邓州市"}, {"value": "永城市"}, {"value": "汝州市"}, {"value": "济源市"}, {"value": "武汉市"}, {"value": "十堰市"}, {"value": "襄阳市"}, {"value": "荆门市"}, {"value": "孝感市"}, {"value": "黄冈市"}, {"value": "鄂州市"}, {"value": "黄石市"}, {"value": "咸宁市"}, {"value": "荆州市"}, {"value": "宜昌市"}, {"value": "随州市"}, {"value": "丹江口市"}, {"value": "老河口市"}, {"value": "枣阳市"}, {"value": "宜城市"}, {"value": "钟祥市"}, {"value": "汉川市"}, {"value": "应城市"}, {"value": "安陆市"}, {"value": "广水市"}, {"value": "麻城市"}, {"value": "武穴市"}, {"value": "大冶市"}, {"value": "赤壁市"}, {"value": "石首市"}, {"value": "洪湖市"}, {"value": "松滋市"}, {"value": "宜都市"}, {"value": "枝江市"}, {"value": "当阳市"}, {"value": "恩施市"}, {"value": "利川市"}, {"value": "仙桃市"}, {"value": "天门市"}, {"value": "潜江市"}, {"value": "长沙市"}, {"value": "衡阳市"}, {"value": "张家界市"}, {"value": "常德市"}, {"value": "益阳市"}, {"value": "岳阳市"}, {"value": "株洲市"}, {"value": "湘潭市"}, {"value": "郴州市"}, {"value": "永州市"}, {"value": "邵阳市"}, {"value": "怀化市"}, {"value": "娄底市"}, {"value": "耒阳市"}, {"value": "常宁市"}, {"value": "浏阳市"}, {"value": "津市市"}, {"value": "沅江市"}, {"value": "汨罗市"}, {"value": "临湘市"}, {"value": "醴陵市"}, {"value": "湘乡市"}, {"value": "韶山市"}, {"value": "资兴市"}, {"value": "武冈市"}, {"value": "洪江市"}, {"value": "冷水江市"}, {"value": "涟源市"}, {"value": "吉首市"}, {"value": "广州市"}, {"value": "深圳市"}, {"value": "清远市"}, {"value": "韶关市"}, {"value": "河源市"}, {"value": "梅州市"}, {"value": "潮州市"}, {"value": "汕头市"}, {"value": "揭阳市"}, {"value": "汕尾市"}, {"value": "惠州市"}, {"value": "东莞市"}, {"value": "珠海市"}, {"value": "中山市"}, {"value": "江门市"}, {"value": "佛山市"}, {"value": "肇庆市"}, {"value": "云浮市"}, {"value": "阳江市"}, {"value": "茂名市"}, {"value": "湛江市"}, {"value": "英德市"}, {"value": "连州市"}, {"value": "乐昌市"}, {"value": "南雄市"}, {"value": "兴宁市"}, {"value": "普宁市"}, {"value": "陆丰市"}, {"value": "恩平市"}, {"value": "台山市"}, {"value": "开平市"}, {"value": "鹤山市"}, {"value": "四会市"}, {"value": "罗定市"}, {"value": "阳春市"}, {"value": "化州市"}, {"value": "信宜市"}, {"value": "高州市"}, {"value": "吴川市"}, {"value": "廉江市"}, {"value": "雷州市"}, {"value": "南宁市"}, {"value": "桂林市"}, {"value": "柳州市"}, {"value": "梧州市"}, {"value": "贵港市"}, {"value": "玉林市"}, {"value": "钦州市"}, {"value": "北海市"}, {"value": "防城港市"}, {"value": "崇左市"}, {"value": "百色市"}, {"value": "河池市"}, {"value": "来宾市"}, {"value": "贺州市"}, {"value": "岑溪市"}, {"value": "桂平市"}, {"value": "北流市"}, {"value": "东兴市"}, {"value": "凭祥市"}, {"value": "宜州市"}, {"value": "合山市"}, {"value": "靖西市"}, {"value": "海口市"}, {"value": "三亚市"}, {"value": "三沙市"}, {"value": "儋州市"}, {"value": "文昌市"}, {"value": "琼海市"}, {"value": "万宁市"}, {"value": "东方市"}, {"value": "五指山市"}, {"value": "成都市"}, {"value": "广元市"}, {"value": "绵阳市"}, {"value": "德阳市"}, {"value": "南充市"}, {"value": "广安市"}, {"value": "遂宁市"}, {"value": "内江市"}, {"value": "乐山市"}, {"value": "自贡市"}, {"value": "泸州市"}, {"value": "宜宾市"}, {"value": "攀枝花市"}, {"value": "巴中市"}, {"value": "达州市"}, {"value": "资阳市"}, {"value": "眉山市"}, {"value": "雅安市"}, {"value": "崇州市"}, {"value": "邛崃市"}, {"value": "都江堰市"}, {"value": "彭州市"}, {"value": "江油市"}, {"value": "什邡市"}, {"value": "广汉市"}, {"value": "绵竹市"}, {"value": "阆中市"}, {"value": "华蓥市"}, {"value": "峨眉山市"}, {"value": "万源市"}, {"value": "简阳市"}, {"value": "西昌市"}, {"value": "康定市"}, {"value": "马尔康市"}, {"value": "贵阳市"}, {"value": "六盘水市"}, {"value": "遵义市"}, {"value": "安顺市"}, {"value": "毕节市"}, {"value": "铜仁市"}, {"value": "清镇市"}, {"value": "赤水市"}, {"value": "仁怀市"}, {"value": "凯里市"}, {"value": "都匀市"}, {"value": "兴义市"}, {"value": "福泉市"}, {"value": "昆明市"}, {"value": "曲靖市"}, {"value": "玉溪市"}, {"value": "丽江市"}, {"value": "昭通市"}, {"value": "普洱市"}, {"value": "临沧市"}, {"value": "保山市"}, {"value": "安宁市"}, {"value": "宣威市"}, {"value": "芒市"}, {"value": "瑞丽市"}, {"value": "大理市"}, {"value": "楚雄市"}, {"value": "个旧市"}, {"value": "开远市"}, {"value": "蒙自市"}, {"value": "弥勒市"}, {"value": "景洪市"}, {"value": "文山市"}, {"value": "香格里拉市"}, {"value": "腾冲市"}, {"value": "西安市"}, {"value": "延安市"}, {"value": "铜川市"}, {"value": "渭南市"}, {"value": "咸阳市"}, {"value": "宝鸡市"}, {"value": "汉中市"}, {"value": "榆林市"}, {"value": "商洛市"}, {"value": "安康市"}, {"value": "韩城"}, {"value": "华阴"}, {"value": "兴平"}, {"value": "兰州市"}, {"value": "嘉峪关市"}, {"value": "金昌市"}, {"value": "白银市"}, {"value": "天水市"}, {"value": "酒泉市"}, {"value": "张掖市"}, {"value": "武威市"}, {"value": "庆阳市"}, {"value": "平凉市"}, {"value": "定西市"}, {"value": "陇南市"}, {"value": "玉门市"}, {"value": "敦煌市"}, {"value": "临夏市"}, {"value": "合作市"}, {"value": "西宁市"}, {"value": "海东市"}, {"value": "格尔木市"}, {"value": "德令哈市"}, {"value": "玉树市"}, {"value": "拉萨市"}, {"value": "日喀则市"}, {"value": "昌都市"}, {"value": "林芝市"}, {"value": "山南市"}, {"value": "银川市"}, {"value": "石嘴山市"}, {"value": "吴忠市"}, {"value": "中卫市"}, {"value": "固原市"}, {"value": "灵武市"}, {"value": "青铜峡市"}, {"value": "台北市"}, {"value": "新北市"}, {"value": "桃园市"}, {"value": "台中市"}, {"value": "台南市"}, {"value": "高雄市"}, {"value": "基隆市"}, {"value": "新竹市"}, {"value": "嘉义市"}, {"value": "北京市"}, {"value": "天津市"}, {"value": "上海市"}, {"value": "重庆市"}, {"value": "香港特别行政区"}, {"value": "澳门特别行政区"}, {"value": "乌鲁木齐市"}, {"value": "克拉玛依市"}, {"value": "吐鲁番市"}, {"value": "哈密市"}, {"value": "喀什市"}, {"value": "阿克苏市"}, {"value": "和田市"}, {"value": "阿图什市"}, {"value": "阿拉山口市"}, {"value": "博乐市"}, {"value": "昌吉市"}, {"value": "阜康市"}, {"value": "库尔勒市"}, {"value": "伊宁市"}, {"value": "奎屯市"}, {"value": "塔城市"}, {"value": "乌苏市"}, {"value": "阿勒泰市"}, {"value": "霍尔果斯市"}, {"value": "石河子市"}, {"value": "阿拉尔市"}, {"value": "图木舒克市"}, {"value": "五家渠市"}, {"value": "北屯市"}, {"value": "铁门关市"}, {"value": "双河市"}, {"value": "可克达拉市"}, {"value": "昆玉市"}],
          mobileCode: {
            enable: true,
            counter: 0,
            text: "获取验证码",
            timer: null
          },
          dialog: {
            visible: false
          }
        },
      }
    },
    mounted () {

    },
    beforeDestroy () {

    },
    methods: {
      ...mapActions('d2admin/account', [
        'login'
      ]),
      queryCitySearch(queryString, cb){
        let results = queryString ? this.registerForm.cityOptions.filter((city) => {
          return city.value.indexOf(queryString) >= 0
        }) : this.registerForm.cityOptions;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      getMobileCode(){
        this.registerForm.mobileCode.enable = false;
        this.registerForm.mobileCode.counter = 60
        clearInterval(this.registerForm.mobileCode.timer)
        this.registerForm.mobileCode.timer = setInterval(() => {
          if (this.registerForm.mobileCode.counter-- <= 0) {
            clearInterval(this.registerForm.mobileCode.timer)
            this.registerForm.mobileCode.enable = true
            this.registerForm.mobileCode.text = "获取验证码"
          } else {
            this.registerForm.mobileCode.text = this.registerForm.mobileCode.counter + "秒后重发"
          }
        }, 1000)
      },
      goBack(){
        this.page = 'login'
        this.registerForm.form = {
          userCode: '',
          companyName: '',
          city: '',
          mobileCode: '',
          verifyCode: '',
          userPassword: "",
          password_check: '',
        }
      },
      register(){
        this.$refs.registerForm.validate((valid, error) => {
          if (valid) {
            if (this.registerForm.form.userPassword !== this.registerForm.form.password_check) {
              this.$message.error("两次输入的密码不一致")
            } else if (!this.registerForm.readAgreement) {
              this.$message.error("请阅读并同意协议")
            } else {
              this.registerForm.form.appId = "202008151130"
              this.registerForm.form.sign = this.$md5("ABCDEFGHIJK" + this.registerForm.form.mobileCode).toUpperCase()
              api.AccountRegister(this.registerForm.form).then(res => {

                this.registerForm.dialog.visible = true
              })
            }
          } else {
            let keys = Object.keys(error)
            let message = error[keys[0]][0].message
            this.$message.error(message)
          }
        })
      },


      /**
       * @description 提交表单
       */
      // 提交登录信息
      submit () {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            // 登录
            this.login({
              username: this.loginForm.form.username,
              password: this.loginForm.form.password
            })
              .then(() => {
                // 重定向对象不存在则返回顶层路径
                this.$router.replace(this.$route.query.redirect || '/')
              })
          } else {
            // 登录表单校验失败
            this.$message.error('表单校验失败，请检查')
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .page-login {
    width: 100%;
    height: 100%;

    background: url('./image/background-image.png') no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    .login-form-box {
      width: 811px;
      height: 712px;

      background: url('./image/login-box.png') no-repeat;
      background-size: 100% 100%;
      -moz-background-size: 100% 100%;

      position: relative;
      .login-form {
        position: absolute;
        top: 137px;
        bottom: 125px;
        left: 160px;
        right: 160px;

        .form-title {
          /*display: flex;*/
          /*align-items: center;*/
          text-align: center;

          .logo {
            width: 119px;
            height: 75px;
            background: rgba(135, 208, 255, 1);
            border-radius: 8px;
            opacity: 0.3;

            display: inline-block;
          }
          .title {
            margin-left: 12px;

            font-size: 36px;
            font-weight: 600;
            color: rgba(255, 255, 240, 1);
            line-height: 50px;
          }
        }

        .form-body {
          margin: 47px 20px 0px 20px;

        }

        .form-forget-password {
          display: flex;
          align-items: baseline;
          justify-content: space-between;

          .save-password {
            color: #A4BCD2;
          }

          .forget-password {
            color: #A4BCD2;
          }
        }

        .form-button {
          margin-top: 34px;
          display: flex;
          align-items: baseline;
          justify-content: space-between;

          .custom-button {
            width: 204px;
          }
        }

        .form-register {
          margin-top: 20px;

          display: flex;
          align-items: baseline;
          justify-content: flex-end;
          font-size: 14px;
          color: #D3E0E3;
          .register-button {
            color: #87D0FF !important;
          }
        }
      }
    }

    .register-form-box {
      width: 849px;
      height: 763px;

      background: url('./image/register-box.png') no-repeat;
      background-size: 100% 100%;
      -moz-background-size: 100% 100%;

      position: relative;
      .register-form {
        position: absolute;
        top: 150px;
        bottom: 110px;
        left: 220px;
        right: 220px;

        // 输入框样式
        .custom-input {
          .el-input__inner {
            height: 46px !important;
            line-height: 46px !important;
            padding-left: 15px !important;
            font-size: 14px !important;
          }
        }
        .el-form-item__label {
          font-size: 18px;
          line-height: 46px;
        }

        .el-form-item {
          margin-bottom: 10px;
        }

        .el-form-item__error {
          display: none;
        }

        .form-item-prefix {
          /*display: flex;*/
          /*align-items: center;*/
          .el-image {
            width: 16px;
            height: 16px;
            margin-right: 5px;
          }
        }

        .button-code {
          background: rgba(63, 181, 228, 1);
          border-radius: 5px;
          color: #cdebff;

          margin-top: 4px;
          border: unset;
        }

        .form-button {
          margin-top: 34px;
          display: flex;
          align-items: baseline;
          justify-content: space-between;

          .custom-button {
            border: unset;
            height: 53px;
            width: 150px;
          }
        }
      }

    }

    .register-success-dialog {
      .el-dialog {
        background: transparent;
        margin-top: 30vh !important;
      }

      .el-dialog__header {
        display: none;
      }

      .el-dialog__body {
        width: 502px;
        height: 359px;

        text-align: center;

        background: url('./image/background-dialog.png') no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;

        position: relative;
        .image-close {
          position: absolute;
          top: 40px;
          right: 40px;
          width: 24px;
          height: 24px;
        }
        .image-cloud {
          margin-top: 47px;
          width: 129px;
          height: 74px;
        }
        .text-1 {
          font-size: 18px;
          color: rgba(255, 255, 240, 1);
          line-height: 25px;

          margin-top: 40px;
        }
        .text-2 {
          font-size: 12px;
          color: rgba(255, 255, 240, 1);
          line-height: 17px;

          margin-top: 28px;
        }
      }
    }

    .copyright {
      position: fixed;
      bottom: 68px;
      width: 100%;

      text-align: center;
      font-size: 20px;
      font-weight: 400;
      color: #A6BFCF;
      line-height: 28px;
    }
  }
</style>
