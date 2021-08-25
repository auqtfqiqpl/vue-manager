<template>
  <div class="config" style="height: 79.5vh">
    <el-container>
      <!-- 组件选择区域 -->
      <el-aside class="nav-left" style="width: 200px; height: 79.5vh">
        <vue-custom-scrollbar
          class="scroll-area el-scrollbar__wrap"
          :settings="settings"
          @ps-scroll-y="scrollHanle"
        >
          <div class="el-scrollbar__view">
            <div class="side-nav is-fade" style="opacity: 0.5">
              <ul>
                <li class="nav-item">
                  <a>FORM组件</a>
                  <div class="nav-group">
                    <ul class="pure-menu-list" style="height: auto">
                      <li
                        class="nav-item"
                        v-for="(item, index) in itemList"
                        :key="index"
                      >
                        <a
                          @mouseover="mouseEnter($event, item)"
                          @mouseleave="mouseLevea($event, item)"
                          :style="item.style"
                          :ref="item.name"
                          draggable="true"
                          @dragover.prevent
                          @dragstart="dragestart(item)"
                          ><i
                            :class="`iconfont ${item.icon}`"
                            :style="`font-size: ${item.iconSize}px`"
                          ></i>
                          <span>{{ item.text }}</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li class="nav-item">
                  <a>DATA组件</a>
                  <div class="nav-group">
                    <ul class="pure-menu-list" style="height: auto">
                      <li
                        class="nav-item"
                        v-for="(item, index) in dataList"
                        :key="index"
                      >
                        <a
                          @mouseover="mouseEnter($event, item)"
                          @mouseleave="mouseLevea($event, item)"
                          :style="item.style"
                          :ref="item.name"
                          draggable="true"
                          @dragover.prevent
                          @dragstart="dragestart(item)"
                          ><i
                            :class="`iconfont ${item.icon}`"
                            :style="`font-size: ${item.iconSize}px`"
                          ></i>
                          <span>{{ item.text }}</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </vue-custom-scrollbar>
      </el-aside>
      <!-- 页面配置区域 -->
      <el-container style="height: 79.5vh">
        <el-header style="height: 10vh">
          <el-row>
            <el-col :span="16" :offset="8"
              ><div class="grid-content bg-purple">
                <el-button type="primary" @click="generatePage()"
                  >生成页面</el-button
                >
                <el-button type="primary" @click="preview()">预览</el-button>
                <el-button type="primary" @click="addArea()"
                  >新增区域</el-button
                >
                <el-button type="primary" @click="submitForm()">保存</el-button>
                <el-button>删除</el-button>
              </div></el-col
            >
          </el-row>
        </el-header>
        <el-main
          style="height: 69vh; padding: 0px"
          @dragover.prevent.native
          @drop.native="mainDrop($event)"
        >
          <div style="color: #000; height: auto" ref="configArea">
            <el-form
              :model="dynamicForm"
              :rules="rules"
              ref="dynamicForm"
              label-width="100px"
              style="padding: 0px"
            >
              <el-row
                v-for="(line, index) in lineList"
                :key="index"
                @mouseover.native="mouseEnter($event, line)"
                @mouseleave.native="mouseLevea($event, line)"
                @dragover.prevent.native
                @drop.native="addComponet($event, line)"
                @dragover.native="mouseEnter($event, line)"
                @dragleave="mouseLevea($event, line)"
                :style="line.style"
              >
                <div v-if="line.empty">
                  {{ line.emptyTip }}
                </div>
                <el-col
                  v-for="(field, findex) in line.fieldList"
                  :span="field.span"
                  :key="findex"
                >
                  <el-form-item
                    v-if="field.needLabel"
                    :key="index"
                    :label="field.name"
                    :prop="field.code"
                    :label-width="`${field.lableWidth}px`"
                    :ref="field.code"
                  >
                    <div
                      @mousemove="comMouseMove(field)"
                      @mouseleave="comMouseLeave(field)"
                    >
                      <el-input
                        v-if="field.type == 'input'"
                        v-model="dynamicForm[field.code]"
                        :placeholder="field.tip"
                        @dblclick.native="editCompPro(field, line)"
                        :style="`width:${field.compWidth}%`"
                      >
                      </el-input>
                      <el-input
                        v-if="field.type == 'textarea'"
                        type="textarea"
                        v-model="dynamicForm[field.code]"
                        placeholder="field.tip"
                        :style="`width:${field.compWidth}%`"
                        @dblclick.native="editCompPro(field, line)"
                      ></el-input>
                      <el-input-number
                        v-if="field.type == 'inputNumber'"
                        v-model="dynamicForm[field.code]"
                        :step="field.step"
                        :style="`width:${field.compWidth}%`"
                        @dblclick.native="editCompPro(field, line)"
                      ></el-input-number>

                      <el-select
                        v-if="field.type == 'select'"
                        v-model="dynamicForm[field.code]"
                        placeholder="field.tip"
                        :style="`width:${field.compWidth}%`"
                        @dblclick.native="editCompPro(field, line)"
                      >
                        <el-option
                          v-for="item in field.data"
                          :key="item.value"
                          :label="item.text"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                      <el-cascader
                        v-if="field.type == 'cascader'"
                        v-model="dynamicForm[field.code]"
                        :options="field.data"
                        @change="handleChange($event, field)"
                        :style="`width:${field.compWidth}%`"
                        @dblclick.native="editCompPro(field, line)"
                      ></el-cascader>
                      <el-switch
                        v-if="field.type == 'switch'"
                        v-model="dynamicForm[field.code]"
                        :style="`width:${field.compWidth}%`"
                        @dblclick.native="editCompPro(field, line)"
                      ></el-switch>
                      <el-slider
                        v-if="field.type == 'slider'"
                        v-model="dynamicForm[field.code]"
                        :style="`width:${field.compWidth}%`"
                        @dblclick.native="editCompPro(field, line)"
                      ></el-slider>

                      <el-date-picker
                        v-if="
                          field.type == 'datePicker' && field.dataType == 'date'
                        "
                        :type="field.dataType"
                        v-model="dynamicForm[field.code]"
                        placeholder="field.tip"
                        :style="`width:${field.compWidth}%`"
                        @dblclick.native="editCompPro(field, line)"
                      ></el-date-picker>

                      <el-date-picker
                        v-if="
                          field.type == 'datePicker' &&
                          field.dataType.indexOf('range') > -1
                        "
                        v-model="dynamicForm[field.code]"
                        :type="field.dataType"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :style="`width:${field.compWidth}%`"
                        @dblclick.native="editCompPro(field, line)"
                      >
                      </el-date-picker>

                      <el-time-picker
                        v-if="
                          field.type == 'timePicker' && field.dataType == 'time'
                        "
                        v-model="dynamicForm[field.code]"
                        :picker-options="{
                          selectableRange: '18:30:00 - 20:30:00',
                        }"
                        placeholder="任意时间点"
                        :style="`width:${field.compWidth}%`"
                        @dblclick.native="editCompPro(field, line)"
                      >
                      </el-time-picker>
                      <el-time-picker
                        v-if="
                          field.type == 'timePicker' &&
                          field.dataType == 'timerange'
                        "
                        is-range
                        v-model="dynamicForm[field.code]"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        placeholder="选择时间范围"
                        :style="`width:${field.compWidth}%`"
                        @dblclick.native="editCompPro(field, line)"
                      >
                      </el-time-picker>
                      <el-switch
                        v-if="field.type == 'switch'"
                        v-model="dynamicForm[field.code]"
                        :style="`width:${field.compWidth}%`"
                        @dblclick.native="editCompPro(field, line)"
                      ></el-switch>
                      <el-radio-group
                        v-if="field.type == 'radio'"
                        v-model="dynamicForm[field.code]"
                        :style="`width:${field.compWidth}%`"
                        @dblclick.native="editCompPro(field, line)"
                      >
                        <el-radio
                          v-for="(radio, aindex) in field.data"
                          :key="aindex"
                          :label="radio.code"
                          name="type"
                          >{{ radio.name }}</el-radio
                        >
                      </el-radio-group>
                      <el-checkbox-group
                        v-if="field.type == 'checkBox'"
                        v-model="dynamicForm[field.code]"
                        :style="`width:${field.compWidth}%`"
                        @dblclick.native="editCompPro(field, line)"
                        size="medium"
                      >
                        <el-checkbox
                          v-for="(box, aindex) in field.data"
                          :key="aindex"
                          :label="box.code"
                          border
                          >{{ box.name }}</el-checkbox
                        >
                      </el-checkbox-group>
                      <el-upload
                        v-if="field.type == 'upload'"
                        class="upload-demo"
                        drag
                        action="https://jsonplaceholder.typicode.com/posts/"
                        multiple
                        :style="`width:${field.compWidth}%`"
                        @dblclick.native="editCompPro(field, line)"
                      >
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">
                          将文件拖到此处，或<em>点击上传</em>
                        </div>
                        <div class="el-upload__tip" slot="tip">
                          只能上传jpg/png文件，且不超过500kb
                        </div>
                      </el-upload>
                      <el-rate
                        v-if="field.type == 'rate'"
                        v-model="dynamicForm[field.code]"
                        :style="`width:${field.compWidth}%`"
                        @dblclick.native="editCompPro(field, line)"
                      ></el-rate>
                      <i
                        class="iconfont icon-ziyuan"
                        :style="`font-size: 15px;position:absolute;right:-1px;top:-15px;color:red;display:${field.delStatus}`"
                        @click="delComponent(line, findex)"
                      ></i>
                    </div>
                  </el-form-item>
                  <div v-if="field.type == 'tree'" style="lineHeight:0px">
                  <el-input v-if="field.query"
                    placeholder="输入关键字进行过滤"
                    v-model="field.queryKey">
                     <el-button  slot="append" icon="el-icon-search" @click.native="searchNode(field)"></el-button>
                  </el-input>
                  <el-tree
                    :props="field.props"
                    :data="field.data"
                    :filter-node-method="filterNode"
                    default-expand-all
                    :style="`width:${field.compWidth}%`"
                    :ref="field.code"
                    @dblclick.native="editCompPro(field, line)"
                    @check-change="handleCheckChange"
                  >
                  </el-tree>
                  </div>

                  <el-input  v-if="field.type == 'lazyTree' && field.query"
                    placeholder="输入关键字进行过滤"
                    v-model="field.queryKey">
                     <el-button slot="append" icon="el-icon-search" @click="lazySearch(field,dynamicForm)"></el-button>
                  </el-input>
                  <el-tree
                    v-if="field.type == 'lazyTree'"
                    :node-key="field.nodeKey"
                    :props="field.props"
                    :load="loadNode"
                    :data="[{name:'root'}]"
                    lazy
                    :show-checkbox="field.checkBox"
                    @dblclick.native="editCompPro(field, line)"
                    @check-change="handleCheckChange"
                    :style="`width:${field.compWidth}%`"
                    :ref="field.code"
                  >
                  </el-tree>
                  <table-view
                    v-if="field.type == 'table'"
                    :table="field"
                    @dblclick.native="editCompPro(field, line)"
                  ></table-view>
                </el-col>
              </el-row>
            </el-form>
            <el-row>
        
            
            </el-row>
            <!-- <div><span style=" border: 1px dashed rgb(158 156 156);"  onClick="addArea()">十 扩展区域</span></div> -->
           <div><el-button class="button-new-tag" size="medium" @click="addArea">十 扩展区域</el-button></div>

          </div>
          </el-main>
      </el-container>
    </el-container>
    <el-drawer
      title="属性设置"
      :before-close="drawerClose"
      :visible="drawerVisible"
      :direction="direction"
      custom-class="demo-drawer"
      size="40%"
      ref="drawer"
    >
    <!-- 设置属性区域 -->
      <div class="demo-drawer__content">
        <el-form :model="proForm">
          <el-form-item label="编码" label-width="80px" >
            <el-input
              v-model="proForm.code"
              autocomplete="off"
              style="width: 270px"
            ></el-input>
          </el-form-item>
          <el-form-item label="名称Label" label-width="80px">
            <el-input
              v-model="proForm.name"
              autocomplete="off"
              style="width: 270px"
            ></el-input>
          </el-form-item>
          <el-form-item label="行间宽度" label-width="80px">
            <el-slider
              v-model="proForm.span"
              :max="24"
              style="padding-left: 40px; width: 200px"
            >
            </el-slider>
          </el-form-item>
          <el-form-item label="行间位置" label-width="80px">
            <el-col :span="6" :offset="4"
              ><el-input
                v-model="proForm.linePosition"
                style="width: 50px; display: block"
                placeholder="PX"
              ></el-input
            ></el-col>
            <el-col :span="6"
              ><el-button @click="positionForward(proForm)"
                >前移</el-button
              ></el-col
            >
            <el-col :span="6"
              ><el-button @click="positionBackward(proForm)"
                >后移</el-button
              ></el-col
            >
          </el-form-item>
          <el-form-item label="显示标题" label-width="80px">
            <el-switch v-model="proForm.needLabel"> </el-switch>
          </el-form-item>
          <el-form-item label="标题宽度(PX)" label-width="80px">
            <el-input-number
              v-model="proForm.lableWidth"
              :min="1"
              :max="2000"
              style="width: 270px"
              label="PX"
              placeholder="PX"
              >px</el-input-number
            >
          </el-form-item>
          <el-form-item label="组件宽度(%)" label-width="80px">
            <el-input-number
              v-model="proForm.compWidth"
              :min="1"
              :max="100"
              style="width: 270px"
              label="PX"
              placeholder="PX"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="复选框" label-width="80px">
            <el-switch v-model="proForm.checkBox"> </el-switch>
          </el-form-item>
           <el-form-item label="是否展开" label-width="80px" >
            <el-switch v-model="proForm.expand"> </el-switch>
          </el-form-item>
          <el-form-item label="搜索框" label-width="80px" >
            <el-switch v-model="proForm.query"> </el-switch>
          </el-form-item>
          <div
            style="
              border-top: 1px soild #000;
              height: 5px;
              width: 420px;
              padding-bottom: 25px;
              color: #000;
            "
          >
            规则
          </div>
          <el-form-item label="必填" label-width="80px">
            <el-radio-group
              v-model="proForm.dataRequired"
              @change="dataRequireChange"
            >
              <el-radio :label="false">非必填</el-radio>
              <el-radio :label="true">必填</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="数据类型" label-width="80px">
            <el-radio-group v-model="proForm.dataType" @change="dataTypeChange">
              <el-radio :label="0">文本</el-radio>
              <el-radio :label="1">整数</el-radio>
              <el-radio :label="2">小数</el-radio>
              <el-radio :label="3">手机号码</el-radio>
              <el-radio :label="4">E-MAIL</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="数据范围" label-width="80px">
            <el-input
              v-model="proForm.dataRange"
              style="width: 270px"
              @change.native="changeDataLength(proForm)"
            ></el-input>
          </el-form-item>
          <el-form-item label="校验规则" label-width="80px">
            <el-input
              v-model="proForm.dataCheck"
              autocomplete="off"
              style="width: 270px"
            ></el-input>
          </el-form-item>
          <el-form-item label="校验提示" label-width="80px">
            <el-input
              v-model="proForm.checkTip"
              autocomplete="off"
              style="width: 270px"
            ></el-input>
          </el-form-item>
          
          <div v-if="proForm.type == tree"
            style="
              border-top: 1px soild #000;
              height: 5px;
              width: 360px;
              padding-bottom: 25px;
              padding-left: 10px;
              padding-right: 10px;
              color: #000;
            "
          >
            表头设置
          </div>
          <el-form-item label-width="20px" v-if="proForm.type == tree">
            <table class="table table-striped">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">名称</th>
                  <th scope="col">编码</th>
                  <th scope="col">类型</th>
                  <th scope="col">排序</th>
                  <th>
                    <button class="btn btn-secondary" @click="headerAdd(proForm)">
                      +
                    </button>
                  </th>
                </tr>
              </thead>
              
              <draggable v-if="proForm.type=='table'" v-model="proForm.config.headerList" tag="tbody">
                <tr v-for="(item,headerIndex) in proForm.config.headerList" :key="headerIndex">
                  <td>
                    <el-input
                      v-model="item.name"
                    ></el-input>
                  </td>
                  <td>
                    <el-input
                      v-model="item.code"
                    ></el-input>
                  </td>
                  <td>
                    <el-select
                      v-model="item.type"
                    >
                      <el-option key="time" label="时间" value="time"></el-option>
                      <el-option key="text" label="文本" value="text"></el-option>
                      <el-option key="num" label="数字" value="num"></el-option>

                    </el-select>
                  </td>
                  <td>
                    <el-select
                      v-model="item.sort"
                    >
                      <el-option key="asc" label="升序" value="asc"></el-option>
                      <el-option key="desc" label="降序" value="desc">
                      </el-option>
                    </el-select>
                  </td>
                  <td></td>
                </tr>
              </draggable>
            </table>
          </el-form-item>

          <!-- <rawDisplayer class="col-3" :value="list" title="List" /> -->

          <div
            style="
              border-top: 1px soild #000;
              height: 5px;
              width: 420px;
              padding-bottom: 25px;
              color: #000;
            "
          >
            数据源
          </div>
          <el-form-item label="静态数据" label-width="80px">
            <el-input
              v-model="proForm.dataSource"
              type="textarea"
              style="width: 270px"
              @blur="handleChangeData(proForm)"
            ></el-input>
          </el-form-item>
          
          <el-form-item label="动态数据" label-width="80px">
            <el-select
              v-model="proForm.dyncReqeustWay"
              placeholder="请选择"
              style="width: 90px"
            >
              <el-option key="GET" label="GET" value="GET"> </el-option>
              <el-option key="POST" label="POST" value="POST"> </el-option>
            </el-select>

            <el-input
              v-model="proForm.dyncParam"
              style="width: 180px"
              placeholder="参数"
            ></el-input>
            <el-input
              v-model="proForm.dyncDataSource"
              style="width: 210px"
              placeholder="请求路径"
            ></el-input>
            <el-button
              v-model="proForm.dyncDataSource"
              style="width: 60px"
              placeholder="请求路径"
              type="primary"
              @click="handleChangeDyncData(proForm)"
              >获取</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import vueCustomScrollbar from "vue-custom-scrollbar";
import "vue-custom-scrollbar/dist/vueScrollbar.css";
import TableView from "../../../common/table/TableView";
import draggable from "vuedraggable";
var globalCfgObj = {};

export default {
  name: "QueryView",
  components: {
    vueCustomScrollbar,
    TableView,
    draggable,
  },
  display: "Simple",
  data() {
    return {
      enabled: true,
      headerList: [
      ],
      dragging: false,
      regex: {
        0: { dataCheck: "", checkTip: "请输入文本", regExp: /^/ },
        1: {
          dataCheck: "/^(-|+)?[1-9]d*$/",
          checkTip: "请输入整数",
          regExp: /^(\-|\+)?[1-9]\d*$/,
        },
        2: {
          dataCheck: "/^(-?d+)(.d+)?$/",
          checkTip: "请输入小数",
          regExp: /^(-?d+)(.d+)?$/,
        },
        3: {
          dataCheck: "/^1[3456789]d{9}$/",
          checkTip: "请输入手机号码",
          regExp: /^1[3456789]d{9}$/,
        },
        4: {
          dataCheck: "/^w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*$/",
          checkTip: "请输入电子邮箱",
          regExp: /^w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*$/,
        },
      },
      dynamicForm: {},
      proForm: {
        dyncParam: "{}",
        dyncReqeustWay: "GET",
      },
      rules: {},
      dropType: "",
      currentLine: {},
      currentField: {},
      drawerVisible: false,
      direction: "rtl",
      count: 10,
      loading: false,
      scrollbarHeight: 10,
      scrollbarLocation: 0,
      pointerStyle: "border: 1px solid #FFFFF;",
      settings: {
        suppressScrollY: false,
        suppressScrollX: false,
        wheelPropagation: false,
      },
      nameNumber: {
        input: 1,
        select: 1,
        textarea: 1,
        radio: 1,
        checkBox: 1,
        inputNumber: 1,
        cascader: 1,
        switch: 1,
        slider: 1,
        timePicker: 1,
        datePicker: 1,
        dateTimePicker: 1,
        upload: 1,
        rate: 1,
        tree: 1,
        lazyTree:1,
        table: 1,
        pagination: 1,
      },
      itemList: [
        {
          name: "radio",
          text: "单选框",
          icon: "iconfont icon-danxuankuangxuanzhong",
          iconSize: 21,
          style: "border: 1px solid #FFFFF",
        },
        {
          name: "checkBox",
          text: "复选框",
          icon: "iconfont icon-fuxuankuang",
          iconSize: 21,
          style: "border: 1px solid #FFFFF",
        },
        {
          name: "input",
          text: "输入框",
          icon: "iconfont icon-icon_danhangshurukuang",
          iconSize: 21,
          style: "border: 1px solid #FFFFF",
        },
        {
          name: "textarea",
          text: "文本框",
          icon: "iconfont icon-icon_danhangshurukuang",
          iconSize: 21,
          style: "border: 1px solid #FFFFF",
        },
        {
          name: "inputNumber",
          text: "计数器",
          icon: "iconfont icon-jishuqi",
          iconSize: 21,
          style: "border: 1px solid #FFFFF",
          step: 1,
        },
        {
          name: "select",
          text: "选择器",
          icon: "iconfont icon-xuanzeqi",
          iconSize: 21,
          style: "border: 1px solid #FFFFF",
        },
        {
          name: "cascader",
          text: "级联选择器",
          icon: "iconfont icon-jilianxuanzeqi",
          iconSize: 21,
          style: "border: 1px solid #FFFFF",
        },
        {
          name: "switch",
          text: "开关",
          icon: "iconfont icon-kaiguan",
          iconSize: 21,
          style: "border: 1px solid #FFFFF",
        },
        {
          name: "slider",
          text: "滑块",
          icon: "iconfont icon-huakuai-",
          iconSize: 21,
          style: "border: 1px solid #FFFFF",
        },
        {
          name: "timePicker",
          text: "时间选择器",
          icon: "iconfont icon-shijianxuanzeqi",
          iconSize: 21,
          style: "border: 1px solid #FFFFF",
        },
        {
          name: "datePicker",
          text: "日期选择器",
          icon: "iconfont icon-timeSelector",
          iconSize: 21,
          style: "border: 1px solid #FFFFF",
        },
        {
          name: "dateTimePicker",
          text: "日期时间选择器",
          icon: "iconfont icon-timeSelector",
          iconSize: 21,
          style: "border: 1px solid #FFFFF",
        },
        {
          name: "upload",
          text: "上传",
          icon: "iconfont icon-shangchuan",
          iconSize: 21,
          style: "border: 1px solid #FFFFF",
        },
        {
          name: "rate",
          text: "评分",
          icon: "iconfont icon-score",
          iconSize: 21,
          style: "border: 1px solid #FFFFF",
        },
      ],
      dataList: [
        {
          name: "tree",
          text: "树型组件(同步)",
          icon: "iconfont icon-shuxingkongjian",
          iconSize: 21,
          style: "border: 1px solid #FFFFF",
        },
        {
          name: "lazyTree",
          text: "树型组件(异步)",
          icon: "iconfont icon-shuxingkongjian",
          iconSize: 21,
          style: "border: 1px solid #FFFFF",
        },
        {
          name: "table",
          text: "表格组件",
          icon: "iconfont icon-table",
          iconSize: 21,
          style: "border: 1px solid #FFFFF",
        },
        {
          name: "pagination",
          text: "分页器",
          icon: "iconfont icon-fenyeqi",
          iconSize: 21,
          style: "border: 1px solid #FFFFF",
        },
      ],
      lineList: [{
        style: "border: 1px dashed rgb(158 156 156);height:160px;",
        emptyTip: "行配置区域",
        empty: true,
        fieldList: [],
      },{
        style: "border: 1px dashed rgb(158 156 156);height:100px;",
        emptyTip: "行配置区域",
        empty: true,
        fieldList: [],
      }],

      input: {
        code: "input",
        name: "input",
        width: "100px",
        type: "input",
        tip: "输入信息",
        span: 12,
        needLabel: true,
        delStatus: "none",
        drawer: false,
        direction: "rtl",
        dataRequired: false,
      },
      textarea: {
        code: "textarea",
        name: "textarea",
        width: "100px",
        type: "textarea",
        tip: "输入信息",
        span: 12,
        needLabel: true,
        delStatus: "none",
        drawer: false,
        direction: "rtl",
      },
      select: {
        code: "select",
        name: "select",
        width: "100px",
        type: "select",
        tip: "输入信息",
        span: 12,
        needLabel: true,
        delStatus: "none",
        drawer: false,
        direction: "rtl",
      },
      radio: {
        code: "radio",
        name: "radio",
        width: "100px",
        type: "radio",
        tip: "输入信息",
        span: 12,
        needLabel: true,
        delStatus: "none",
        drawer: false,
        direction: "rtl",
        data: [
          {
            code: "test1",
            name: "test1",
          },
        ],
      },
      checkBox: {
        code: "checkBox",
        name: "checkBox",
        width: "100px",
        type: "checkBox",
        tip: "输入信息",
        span: 12,
        needLabel: true,
        drawer: false,
        direction: "rtl",
        data: [
          {
            code: "checkBox",
            name: "checkBox",
          },
        ],
        checked: ["checkBox"],
      },
      inputNumber: {
        code: "inputNumber",
        name: "inputNumber",
        width: "100px",
        type: "inputNumber",
        tip: "输入信息",
        span: 12,
        needLabel: true,
        delStatus: "none",
        drawer: false,
        direction: "rtl",
      },
      cascader: {
        code: "cascader",
        name: "cascader",
        width: "100px",
        type: "cascader",
        tip: "输入信息",
        span: 12,
        needLabel: true,
        delStatus: "none",
        drawer: false,
        direction: "rtl",
        data: [
          {
            label: "test1",
            value: "test1",
          },
        ],
      },
      datePicker: {
        code: "datePicker",
        name: "datePicker",
        width: "100px",
        type: "datePicker",
        dataType: "daterange",
        tip: "输入信息",
        span: 12,
        needLabel: true,
        delStatus: "none",
      },
      timePicker: {
        code: "timePicker",
        name: "timePicker",
        width: "100px",
        type: "timePicker",
        tip: "输入信息",
        span: 12,
        dataType: "timerange",
        needLabel: true,
        delStatus: "none",
      },
      rate: {
        code: "rate",
        name: "rate",
        width: "100px",
        type: "rate",
        tip: "输入信息",
        span: 12,
        needLabel: true,
        delStatus: "none",
      },
      slider: {
        code: "slider",
        name: "slider",
        width: "100px",
        type: "slider",
        tip: "输入信息",
        span: 12,
        needLabel: true,
        delStatus: "none",
      },
      upload: {
        code: "upload",
        name: "upload",
        width: "100px",
        type: "upload",
        tip: "输入信息",
        span: 12,
        needLabel: true,
        delStatus: "none",
      },
      //data组件
      tree: {
        code: "tree",
        name: "tree",
        width: "100px",
        type: "tree",
        span: 12,
        needLabel: false,
        delStatus: "none",
        props: {
          label: "name",
          children: "children",
        },
        url: "",
        expand:false,
        query : false,
        checkBox:true,
        nodeKey:"id",
        queryKey:'',
        lazy:false,
        data:[{
          id: 1,
          name: '一级 1',
          children: [{
            id: 4,
            name: '二级 1-1',
            children: [{
              id: 9,
              name: '三级 1-1-1'
            }, {
              id: 10,
              name: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          name: '一级 2',
          children: [{
            id: 5,
            name: '二级 2-1'
          }, {
            id: 6,
            name: '二级 2-2'
          }]
        }],
      },
      lazyTree: {
        code: "lazyTree",
        name: "lazyTree",
        width: "100px",
        type: "lazyTree",
        span: 12,
        needLabel: false,
        delStatus: "none",
        props: {
          label: "name",
          children: "children",
        },
        url: "",
        expand:false,
        query : false,
        checkBox:true,
        nodeKey:"id",
        lazy:true,
        queryKey:''

      },
      table: {
        code: "table",
        name: "table",
        width: "100px",
        type: "table",
        span: 24,
        needLabel: false,
        delStatus: "none",
        data: [],
        config: {
          orderKey: "id",
          orderBy: "asc",
          pagePlugin: true,
          total: 10,
          pageSize: 5,
          pageIndex: 1,
          pageSizeList: [5, 10, 20, 30],
          headerList: [
            // {
            //   name: "clo1",
            //   code: "clo1",
            // },
          ],
        },
      },
    };
  },
  beforeMount() {
    //debugger
    let _this = this;
    //_this.dynamicForm.keys(obj).forEach(key => {
    // });
    _this.lineList.forEach((lineItem, lIndex) => {
      lineItem.fieldList.forEach((item, index) => {
        let ruleItem = (_this.rules[item.code] = [
          {
            required: item.dataRequired,
            message: item.checkTip,
          },
        ]);

        let dataRange = item.dataRange;
        let min;
        let max;
        if (dataRange) {
          if (dataRange.indexOf("-") > -1) {
            min = dataRange.split("-")[0];
            max = dataRange.split("-")[1];
          } else {
            max = dataRange;
          }
        }

        if (min) {
          ruleItem[0]["min"] = min;
        }
        if (max) {
          ruleItem[0]["max"] = max;
        }

        if (item.type == "input") {
          ruleItem[0]["trigger"] = "blur";
        } else {
          ruleItem[0]["trigger"] = "change";
        }
      });
    });

    //    this.scrollbar = this.$refs.scrollbar;
    //     _this.scrollbarHeight = this.scrollbar.scrollbarHeight;
    //    this.scrollbar.addEventListener('scroll', _this.handleScroll, true);
  },
  computed: {
    noMore() {
      return this.count >= 20;
    },
    disabled() {
      return this.loading || this.noMore;
    },
  },
  created() {
      globalCfgObj = this;
    //this.$refs.scrollbar__bar.scrollTop = this.$refs.scrollbar__wrap.scrollHeight;
  },
  destroyed() {},
  methods: {
    mainDrop() {
      debugger;
      let _this = this;
      if (_this.lineList.length <= 0) {
        this.$message({
          showClose: true,
          message: "请先添加配置区域",
          type: "warning",
          duration: "2000",
        });
      } else {
        let hasElement = false;
        _this.lineList.forEach((item, index) => {
          if (item.fieldList && item.fieldList.length > 0) {
            hasElement = true;
            return;
          }
        });

        if (!hasElement) {
          this.$message({
            showClose: true,
            message: "请拖动到相应配置区域",
            type: "warning",
            duration: "2000",
          });
        }
      }
    },
    addComponet(event, line) {
      debugger
      let _this = this;
      line.empty = false;
      //let  addComp = _this[this.dropType];
      let addComp = _this.$commonUtils.objCopy(_this[this.dropType]);

      addComp.name = addComp.name + _this.nameNumber[this.dropType];
      addComp.code = addComp.code + _this.nameNumber[this.dropType];
      _this.nameNumber[this.dropType]++;
      addComp.needLabel = addComp.needLabel && !addComp.empty;

      line.fieldList.push(addComp);
      if (this.dropType == "checkBox") {
        _this.dynamicForm[addComp.code] = [];
      }
      _this.buildRule(addComp);
      console.log(this.dropType);
    },
    handleChange(_event, data) {},

    getTouchStart() {
      this.radioState = "block";
    },
    getTouchEnd() {
      radioState;
    },
    scrollHanle(evt) {
      console.log(evt);
    },
    handleScroll(event) {
      //   console.log(event.srcElement);
      //     var scrollTop = this.$parent.$el.scrollTop
      //         if (scrollTop > 135) {
      //             this.positionFlag = true
      //         } else {
      //             this.positionFlag = false
      //         }
    },
    drop(event, data, col) {
      debugger;
    },
    generatePage() {
      alert("正在生成页面");
    },
    preview() {
      alert("正在预览");
    },
    addArea() {
      let _this = this;
      _this.lineList.push({
        style: "border: 1px dashed rgb(158 156 156);height:160px;",
        emptyTip: "行配置区域",
        empty: true,
        fieldList: [],
      });
    },
    dragestart(item) {
      let _this = this;
      _this.dropType = item.name;

      // _this.$refs.configArea.
    },
    submitForm(formName) {
      let _this = this;

      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(
            "url:" +
              _this.$api.moduleAddr.BuildUrl +
              "autoCode" +
              ",params:" +
              JSON.stringify(this.codeForm)
          );
          _this.$api
            .getAPI(
              _this.$api.moduleAddr.BuildUrl + "autoCode",
              _this.codeForm,
              _this.$api.dataType.form
            )
            .then((response) => {
              if (response.status == _this.$status.success) {
                Message.Message(response.message);
              } else {
                Message.error(response.message);
              }
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    load() {
      this.loading = true;
      setTimeout(() => {
        this.count += 2;
        this.loading = false;
      }, 2000);
    },
    mouseEnter(_event, line) {
      console.log(line);

      line.style = "border: 1px dashed rgb(158 156 156);";
    },
    mouseLevea(_event, line) {
      if (!line.empty) {
        line.style = "border: 1px dashed #FFFFFF;";
      }
    },
    //tree
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    comMouseMove(field) {
      field.delStatus = "block";
    },
    comMouseLeave(field) {
      field.delStatus = "none";
    },
    delComponent(line, findex) {
      line.fieldList.splice(findex, 1);
      if (!line.fieldList || line.fieldList.length <= 0) {
        line.empty = true;
        line.style = "border: 1px dashed rgb(158 156 156);height:160px;";
        line.emptyTip = "新配置区域";
      }
    },
    editCompPro(field, line) {
      let _this = this;
     // debugger;
      _this.drawerVisible = true;
      _this.proForm = field;
      _this.currentField = field;
      _this.currentLine = line;
      //将当前的组件的基本属性 赋值
      //表格赋值
      
    },
    drawerClose() {
      let _this = this;
      _this.drawerVisible = false;
      // _this.dataRequireChange(_this.currentField.dataRequired);
      if (_this.currentField.dataCheck) {
        _this.rules[_this.currentField.code][0].validator = (
          rule,
          value,
          callback
        ) => {
          if (value) {
            let pattern = _this.regex[_this.currentField.dataType].regExp;
            if (!pattern.test(value)) {
              callback(new Error("校验规则不通过"));
            }
          }
          callback();
        };
      }
    },
    positionForward(field) {
      let _this = this;
      let currentField = _this.currentLine.fieldList[field.linePosition];
      let preField = _this.currentLine.fieldList[field.linePosition - 1];

      _this.currentLine.fieldList[field.linePosition - 1] = currentField;
      _this.currentLine.fieldList[field.linePosition] = preField;
      currentField.linePosition--;
      preField.linePosition++;
    },
    positionBackward(field) {
      let _this = this;
      let currentField = _this.currentLine.fieldList[field.linePosition];
      let afterField = _this.currentLine.fieldList[field.linePosition + 1];

      _this.currentLine.fieldList[field.linePosition + 1] = currentField;
      _this.currentLine.fieldList[field.linePosition] = afterField;
      currentField.linePosition++;
      afterField.linePosition--;
    },
    dataRequireChange(val) {
      let _this = this;
      if (_this.rules[_this.currentField.code]) {
        _this.rules[_this.currentField.code][0].required = val;
        if (val) {
          _this.$refs[_this.currentField.code][0].$el.classList.add(
            "is-required"
          );
        } else {
          _this.$refs[_this.currentField.code][0].$el.classList.remove(
            "is-required"
          );
          _this.$refs[_this.currentField.code][0].$el.classList.remove(
            "is-error"
          );
        }
        _this.rules[_this.currentField.code][0].required = val;
      } else {
      }
    },
    dataTypeChange(val) {
      let _this = this;
      debugger;
      let regex = _this.regex[val];
      if (regex) {
        _this.proForm.dataCheck = regex.dataCheck;
        _this.proForm.checkTip =
          regex.checkTip +
          "长度：" +
          (!_this.proForm.dataLength ? "未定义" : _this.proForm.dataLength);
      }
    },
    handleChangeData(proForm) {
      debugger;
      let _this = this;
      if(proForm && proForm.type === 'tree'){
        _this.loadNode(proForm.dataSource);
      }else{
        _this.dynamicForm[proForm.code] = proForm.dataSource;
      }
    },
    changeDataLength(proForm) {
      let _this = this;
      let regex = _this.regex[proForm.dataType];
      _this.proForm.checkTip =
        regex.checkTip +
        "长度：" +
        (!_this.proForm.dataLength ? "未定义" : _this.proForm.dataLength);
    },
    handleChangeDyncData(proForm) {
      let _this = this;
      //  debugger
      if (!proForm.dyncParam) {
        proForm.dyncParam = "{}";
      }
      if (proForm.dyncReqeustWay == "POST") {
        _this.$api
          .postAPI(
            proForm.dyncDataSource,
            JSON.parse(proForm.dyncParam),
            _this.$api.dataType.json
          )
          .then((response) => {
            console.log(response);
            if (response.status == _this.$status.success) {
              debugger
              //如果存在data 表明是表格和下拉框。。。复合数据结构
              if (response.data.constructor == Array) {
                proForm.data = response.data;
              } else {
                _this.dynamicForm[proForm.code] = response.data;
              }
            }
          });
      } else if (proForm.dyncReqeustWay == "GET") {
        _this.$api
          .getAPI(
            proForm.dyncDataSource,
            JSON.parse(proForm.dyncParam),
            _this.$api.dataType.form
          )
          .then((response) => {
            console.log(response);
            if (response.status == _this.$status.success) {
              debugger
              //如果存在data 表明是表格和下拉框。。。复合数据结构
              if (response.data.constructor == Array) {
                proForm.data = response.data;
              } else {
                _this.dynamicForm[proForm.code] = response.data;
              }
            }
          });
      }
    },
    // test(field) {
    //  console.log(field.dataRequired);
    //  let  _this = this;
    //  _this.dataRequireChange(field.dataRequired);
    // },
    buildRule(item) {
      let _this = this;
      if (!item) {
        item = _this.currentField;
      }
      if (!item) {
        console.warn("未获取到当前的配置项");
        return;
      }
      let ruleItem = (_this.rules[item.code] = [
        {
          required: item.dataRequired,
          message: item.checkTip,
        },
      ]);

      let dataRange = item.dataRange;
      let min;
      let max;
      if (dataRange) {
        if (dataRange.indexOf("-") > -1) {
          min = dataRange.split("-")[0];
          max = dataRange.split("-")[1];
        } else {
          max = dataRange;
        }
      }

      if (min) {
        ruleItem[0]["min"] = min;
      }
      if (max) {
        ruleItem[0]["max"] = max;
      }

      if (item.type == "input") {
        ruleItem[0]["trigger"] = "blur";
      } else {
        ruleItem[0]["trigger"] = "change";
      }
    },
    headerAdd(field) {
      let _this = this;
      field.config.headerList.push({
        name: "new",
        code: "new",
        type: "文本",
        sort: "升序",
      });
    },
    //tree方法
    loadNode(node,resolve){
    },
    filterNode(value,data){
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    lazySearch(field){

    },
    searchNode(field){
      let _this = this;
      this.$refs[field.code][0].filter(field.queryKey);
    }
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 0px;
}
.scroll-area {
  position: relative;
  margin: auto;
  height: 78.5vh;
  overflow: hidden;
}
.nav-left {
  width: 200px;
  background-color: white;
  border-right: 1px solid #ebebeb;
}
.config {
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  transition: 0.2s;
  line-height: 0px;
  height: 78.5vh;
}
.nav-center {
  overflow: hidden;
}
.page-component .page-component__nav {
  display: block;
  width: 240px;
  position: fixed;
  top: 0px;
  bottom: 0px;
  margin-top: 80px;
  transition: padding-top 0.3s ease 0s;
}
.el-scrollbar {
  position: relative;
}
body,
html {
  height: 100%;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", SimSun, sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  margin: 0px;
  padding: 0px;
}
.page-component__nav > .el-scrollbar__wrap {
  height: 100%;
}
.el-scrollbar__wrap {
  height: 100%;
  overflow: hidden;
}
.side-nav {
  height: 100%;

  width: 100%;
  box-sizing: border-box;
  /* padding-right: 30px; */
  transition: opacity 0.3s ease 0s;
}

.side-nav li {
  list-style: none;
}
li {
  display: list-item;
  text-align: -webkit-match-parent;
  padding-top: 1px;
  padding-bottom: 1px;
}

.side-nav ul {
  padding: 0px;
  margin: 0px;
}

.side-nav .nav-group__title {
  font-size: 12px;
  color: rgb(153, 153, 153);
  line-height: 26px;
  margin-top: 15px;
}
.side-nav > ul > .nav-item > a {
  margin-top: 15px;
  color: #999997 !important;
}
.side-nav .nav-item a {
  font-size: 14px;
  line-height: 30px;
  position: relative;
  margin: 3px;
  padding: 2px;
  margin-right: 10px;
  text-decoration: none;
  text-overflow: ellipsis;
  transition: all 0.15s ease-out 0s;
  cursor: move;
  display: block;
  height: 40px;
  color: rgb(68, 68, 68);
  white-space: nowrap;
  font-weight: 400;
}

a:-webkit-any-link {
  /* color: -webkit-link;
  cursor: pointer; */
  text-decoration: underline;
  margin: 3px;
  padding: 2px;
}
a {
  color: rgb(64, 158, 255);
  margin: 3px;
  padding: 2px;
  text-decoration: none;
}

.side-nav > ul > .nav-item:nth-child(-n + 4) > a {
  margin-top: 0px;
}

ul ul {
  list-style-type: circle;
  margin-block-start: 0px;
  margin-block-end: 0px;
}
ul {
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
}

li.nav-item {
  display: list-item;
  text-align: -webkit-match-parent;
}
/** draggertable */

table {
  border-collapse: collapse;
  -ms-flex-direction: column;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
}
thead {
  display: table-header-group;
  vertical-align: middle;
  border-color: inherit;
}
tr {
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
  border: 1px solid rgba(0, 0, 0, 0.125);
}
.table .thead-dark th {
  color: rgb(145, 142, 142);
  background-color: #dee2e6;
  border-color: 1px solid rgba(0, 0, 0, 0.125);
}

.table thead th {
  vertical-align: bottom;
  border-bottom: 2px solid #dee2e6;
}

.table td,
.table th {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}

th {
  text-align: inherit;
}

tbody {
  display: table-row-group;
  vertical-align: middle;
  border-color: inherit;
}

td {
  display: table-cell;
  vertical-align: inherit;
}
tr:first-child {
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}

/* .table-striped tbody tr:nth-of-type(odd) {
     background-color: rgba(0,0,0,.05);
} */

.table td,
.table th {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}
.table {
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
}
.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
    border: 1px dashed rgb(158 156 156);
  }
</style>