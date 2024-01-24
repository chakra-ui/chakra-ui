const dashCase = (str) => {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

/**
 * @param {import("plop").NodePlopAPI} plop
 */
module.exports = function main(plop) {
  plop.setGenerator('component', {
    description: 'Document a component',
    prompts: [
      {
        type: 'input',
        name: 'component',
        message: 'Enter component name:',
      },
    ],
    actions(answers) {
      const actions = []
      if (!answers) return actions

      const { component } = answers

      actions.push({
        type: 'addMany',
        templateFiles: 'plop/component/**',
        destination: `./content/docs/components/{{dashCase component}}`,
        base: 'plop/component',
        data: { component, componentName: dashCase(component) },
        abortOnFail: true,
      })

      return actions
    },
  })
}
