import { Project, Node, ts } from "ts-morph"

const print = (obj: Record<string, unknown> | null) => {
  console.dir(obj, { depth: null })
}

const project = new Project()

project.addSourceFilesAtPaths(
  "../../packages/components/button/dist/index.d.ts",
)

const sourceFiles = project.getSourceFiles()

for (const file of sourceFiles) {
  file.getVariableStatements().map((statement) => {
    const variableDeclaration = statement
      .getDeclarationList()
      .getChildrenOfKind(ts.SyntaxKind.VariableDeclaration)

    variableDeclaration.map((x) => {
      console.log(x?.getName())
      console.log(
        x
          .getTypeNode()
          ?.getDescendantsOfKind(ts.SyntaxKind.TypeReference)
          .map((y) =>
            y
              .getTypeName()
              .getSymbol()
              ?.getMembers()
              .map((member) => member.getName()),
          ),
      )
      // .getTypeArguments()
      // .map((x) => console.log(x.getText()))
    })

    // const description = statement.getJsDocs().map((doc) => doc.getComment())[0]

    // // console.log(x?.getText())
    // // variableDeclaration
    // //   ?.getDescendantsOfKind(ts.SyntaxKind.Identifier)
    // //   .map((x) => console.log(x.getText()))

    // console.log("-------")
    // const result = { name: variableDeclaration?.getName(), description }
    // print(result)
    // return result
    console.log("--------------------------")
  })
}
