<template>
  <div class="line-block">
    <el-radio-group v-model="radioChecked" @change="radioChange">
      <div v-for="(item, index) in radioArray" class="radioContain" :class="{level1: index !== radioArray.length - 1}" :keys="index">
        <el-radio :disabled="isDisabled" :label="item.label">{{item.value}}</el-radio>
        <slot :name="`radio${index}`"></slot>
      </div>
    </el-radio-group>
  </div>
</template>
<style lang="stylus" scoped>
  .line-block {
    margin-left 20px
    vertical-align middle
    .level1 {
      margin-bottom 20px
    }
    .radioContain {
      display flex
      flex-grow row nowrap
      align-items center
    }
  }
</style>
<script>
 export default {
   props: {
     value : {
       defalut: ''
     },
     radioArray: {
       type: Array,
       defalut: () => {
         return []
       }
     },
     isDisabled: {
       type: Boolean,
       defalut: () => {
         return false
       }
     },
     changeValue: {
       type: Function,
       default: () => {},
     },
   },
   data() {
     return {
       radioChecked: this.value
     }
   },
   created() {
   },
   watch: {
     value(val, old) {
       if (val !== old) {
         this.radioChecked = val
       }
     },
     radioChecked(val, old) {
       if (old !== '' && val !== old) {
         this.$emit('input', val)
       }
     }
   },
   methods: {
     radioChange(val) {
       this.changeValue(val)
     },
   },
 }
</script>
