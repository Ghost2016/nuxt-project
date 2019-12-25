<template>
  <div class="admin-category">
    <button
      class="primary"
      @click="handleAdd()">添加分类</button>
    <div
      v-for="item in categoryFilter"
      :key="item.id"
      class="category"
    >
      <p class="title"> <span v-if="!item.isShow">[私]</span>{{ item.title }} ({{ item.total }})</p>
      <div class="btns">
        <button
          class="small"
          @click="handleDelete(item)">删除</button>
        <button
          class="small"
          @click="handlePatch(item)">编辑</button>
      </div>
    </div>
    <category-dialog ref="categoryDialog" @change="getCategories()"></category-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import categoryDialog from './components/categoryDialog'
export default {
  layout: 'admin',
  middleware: 'permission',
  components: {
    categoryDialog
  },
  data() {
    return {
      tmp: {},
      categoryId: ''
    }
  },
  computed: {
    ...mapState(['categories']),
    categoryFilter() {
      return this.categories.filter(i => i.title !== '默认分类')
    },
  },
  mounted() {
    this.getCategories()
  },
  methods: {
    ...mapActions([
      'getCategories',
      'deleteCategory',
    ]),
    async handleDelete(item) {
      const val = confirm(`确定删除 ${item.title} 分类吗`)
      if (val) {
        await this.deleteCategory(item.id)
        this.getCategories()
      }
    },
    handleAdd() {
      this.$refs['categoryDialog'].show()
    },
    async handlePatch(item) {
      this.$refs['categoryDialog'].show(item.id)
    }
  },
}
</script>

<style lang="scss" scoped>
.admin-category {
  .item {
    border-radius: 3px;
    margin: 20px 0;
    width: 300px;
    input,
    textarea {
      margin-bottom: 10px;
    }
  }
  .primary {
    color: #333;
    margin-bottom: 20px;
  }
  .category {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
}
</style>
