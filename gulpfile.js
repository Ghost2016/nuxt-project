
var ejs = require("gulp-ejs")
const rename = require('gulp-rename')
// const gulp = require('gulp')
const { src, dest, task, series } = require('gulp');

let config = {
  pageName: 'template',
  elements: [{
    tag: 'textarea',
    vModel: 'title'
  },
  {
    tag: 'div',
    vText: 'title2',
    methods: [{
      event: 'click',
      func: () => {
        this.title = 'modify by gulp001'
      }
    }]
  },
  {
    tag: 'span',
    vText: 'title',
    methods: [{
      event: 'click',
      func: () => {
        this.title = 'modify by gulp002'
      }
    }]
  }]
}
let allMethods = []
let template = config.elements.map((element, index) => {
  
  let _methods = element.methods && element.methods.map(method => {
    let _methodName = method.event + allMethods.length
    allMethods.push((`${_methodName}${method.func}`).replace('=> ',''))
    return `@${method.event}="${_methodName}" `
  })
  let vModel = element.vModel ? `v-model="${element.vModel}"` : ''
  let vValue = element.value ? `:value="${element.value}"` : ''
  let vText = element.vText ? `v-text="${element.vText}"` : ''

  return `<${element.tag} ${vText} ${vValue} ${vModel} ${_methods || ''}></${element.tag}>` 
}).join('')

console.log(allMethods.join(',').replace(',',',\n'))
task('generate-vuepage', async function() {
  await src('./template/vue.ejs').pipe(ejs({
    template: template,
    data: `{title: 1,title2: 2}`,
    methods: allMethods.join(',').split(',\n')
  }))
  .pipe(rename('template.vue'))
　.pipe(dest('./pages/'))
})

task('default', series('generate-vuepage'), (cb) => {
  cb()
})