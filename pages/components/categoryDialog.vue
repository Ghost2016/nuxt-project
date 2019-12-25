 <template>
  <el-dialog :title="title" :visible.sync="visible" width="60%" append-to-body :close-on-click-modal="false" @close="hide">
    <div class="dialog_content">
      <el-form ref="form" :model="ruleForm" :rules="rules" :validate-on-rule-change="false">
        <el-row>
          <template v-for="(item, index) in items" >
            <el-col :span="colSpan" :key="index" v-if="!item.hide">
              <el-form-item :label="item.label" :label-width="item.labelWidth || '80px'" :prop="item.property">
                <template v-if="item.type === 'input'">
                  <el-input v-model="item.value" :placeholder="`请输入${item.label}`" @input="onInputChange(item, $event)"></el-input>
                </template>
                <template v-else-if="item.type === 'select'">
                  <el-select
                    v-model="item.value"
                    filterable
                    :placeholder="`请选择${item.label}`">
                    <el-option
                      v-for="(option,option_index) in item.options"
                      :key="option_index"
                      :value="option.value"
                      :label="option.label"/>
                  </el-select>
                </template>
                <template v-else-if="item.type === 'radio'">
                  <el-radio-group v-model="item.value" @change="onRadioChange(item, $event)">
                    <el-radio v-for="(radio, radio_index) in item.radios" :key="radio_index" :label="radio.value">{{radio.label}}</el-radio>
                  </el-radio-group>
                </template>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      visible: false,
      ruleForm: null,
      rules: {},
      items: [],
      id: null,
      // 可配置项目
      title: '新增分类',
      colSpan: 12,
      
    };
  },
  methods: {
    ...mapActions([
      'newCategory',
      'patchCategory',
      'getCategory'
    ]),
    /**
     * @description 输入更新的时候触发
     */
    onInputChange(item, value) {
      this.ruleForm[item.property] = value
    },
    /**
     * @description radio更新的时候触发
     */
    onRadioChange(item, value) {
      this.ruleForm[item.property] = value
    },
    async fetchData(id) {
      let category = {}
      if(id) {
        category = await this.getCategory(id)
      }
      this.items = [
        {
          label: '标题',
          property: 'title',
          type: 'input',
          value: category.title || '',
          rules: [{
            required: true, message: '必填项', trigger: 'change'
          }]
        },
        {
          label: '关键字',
          property: 'keywords',
          type: 'input',
          value: category.keywords || ''
        },
        {
          label: '描述',
          property: 'description',
          type: 'input',
          value: category.description || ''
        },
        {
          label: '是否公开',
          property: 'isShow',
          type: 'radio',
          value: category.isShow || false,
          radios: [
            {
              label: '是',
              value: true
            },
            {
              label: '否',
              value: false
            }
          ]
        },
        {
          label: '排序',
          property: 'sort',
          type: 'input',
          value: category.sort || ''
        },
        {
          label: 'id',
          property: 'id',
          type: 'input',
          value: category.id || '',
          hide: true
        },
      ]
      // 临时对象以处理表单验证相关的逻辑
      let tempRuleForm = {}
      let tempRules = {}
      this.items.map(item => {
        tempRuleForm[item.property] = item.value
        if(!item.hide) {
          tempRules[item.property] = item.rules
        }
      })
      this.ruleForm = tempRuleForm
      this.rules = tempRules
    },
    confirm(){
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          let requestMethod = this.id ? this.patchCategory : this.newCategory
          await requestMethod(this.ruleForm)
          this.hide()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    cancel(){
      this.hide()
    },
    show(id) {
      this.id = id
      this.visible = true;
      this.fetchData(id);
    },
    hide() {
      this.reset()
      this.$emit('change')
      this.visible = false
    },
    reset() {
      this.$refs['form'].resetFields()
      this.ruleForm = null
      this.rules = null
      this.items = null
    }
  }
};
</script>
<style lang="scss" scope>

</style>