const fs = require('fs')
const os = require('os')

const vueDir = './src/views/'
const routerFile = './src/router.js'

fs.readdir(vueDir, function (err, files) {
  if (err) {
    console.error('❌ Could not list the directory.', err)
    return
  }
  const routes = []
  for (const filename of files) {
    if (filename.indexOf('.') < 0) {
      continue
    }
    const [name, ext] = filename.split('.')
    if (ext !== 'vue') {
      continue
    }
    const routeName = name.replace(/-([a-z])/g, (_, match) => match.toUpperCase())
    let routeDescription = ''
    const contentFull = fs.readFileSync(`${vueDir}${filename}`, 'utf-8')
    // get route description from first line comment
    const match = /<!--\s*(.*)\s*-->/g.exec(contentFull.split(os.EOL)[0])
    if (match) {
      routeDescription = match[1].trim()
    }
    routes.push(`  {
    path: '/${name === 'home' ? '' : name}',
    name: '${routeName}',${routeDescription ? `\n    meta: { description: '${routeDescription}' },` : ''}
    component: () => import(/* webpackChunkName: "${routeName}" */ '@/views/${filename}'),
  },`)
  }
  const result =
`// This file is automatically generated by gen-router.js, please do not modify it manually！
import VueRouter from 'vue-router'
import Vue from 'vue'
const packageInfo = require('../package.json')

Vue.use(VueRouter)

const routes = [
${routes.join(os.EOL)}
]

const router = new VueRouter({
  mode: 'hash',
  routes,
})

router.afterEach((to) => {
  document.title = \`\${to.meta?.description} - \${packageInfo.name} \${packageInfo.version}\`
})

export default router
`
  fs.writeFile(routerFile, result, 'utf-8', (err) => {
    if (err) throw err
    console.log(`✅ Router generated successfully in ${routerFile}`)
  })
})
