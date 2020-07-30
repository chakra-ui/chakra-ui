const sidebar = {
  routes: [
    {
      title: "Getting Started",
      heading: true,
      path: "/docs",
      routes: [
        {
          title: "Installation",
          path: "/getting-started",
        },
        {
          title: "Design Principles",
          path: "/principles",
        },
        {
          title: "Style Props",
          path: "/style-props",
        },
        {
          title: "Color Mode",
          path: "/color-mode",
        },
        {
          title: "Responsive Styles",
          path: "/responsive-styles",
        },
        {
          title: "Guides",
          open: true,
          routes: [
            {
              title: "Validation",
              path: "/docs/guides/validation.md",
            },
            {
              title: "Arrays",
              path: "/docs/guides/arrays.md",
            },
            {
              title: "TypeScript",
              path: "/docs/guides/typescript.md",
            },
            {
              title: "React Native",
              path: "/docs/guides/react-native.md",
            },
            {
              title: "Form Submission",
              path: "/docs/guides/form-submission.md",
            },
          ],
        },
        {
          title: "Examples",
          open: true,
          routes: [
            {
              title: "Basic",
              path: "/docs/examples/basic.md",
            },
            {
              title: "TypeScript",
              path: "/docs/examples/typescript.md",
            },
            {
              title: "Async Submission",
              path: "/docs/examples/async-submission.md",
            },

            {
              title: "Checkboxes",
              path: "/docs/examples/checkboxes.md",
            },
            {
              title: "Radio Group",
              path: "/docs/examples/radio-group.md",
            },
            {
              title: "Dependent Fields",
              path: "/docs/examples/dependent-fields.md",
            },
            {
              title: "Dependent Fields with Async API Request",
              path: "/docs/examples/dependent-fields-async-api-request.md",
            },
            {
              title: "Arrays and Lists",
              path: "/docs/examples/field-arrays.md",
            },
            {
              title: "Instant Feedback",
              path: "/docs/examples/instant-feedback.md",
            },
            {
              title: "More Examples",
              path: "/docs/examples/more-examples.md",
            },
          ],
        },
      ],
    },

    {
      title: "API Reference",
      heading: true,
      routes: [
        {
          title: "connect()",
          path: "/docs/api/connect.md",
        },
        {
          title: "<ErrorMessage />",
          path: "/docs/api/errormessage.md",
        },
        {
          title: "<FastField />",
          path: "/docs/api/fastfield.md",
        },
        {
          title: "<Field />",
          path: "/docs/api/field.md",
        },
        {
          title: "<FieldArray />",
          path: "/docs/api/fieldarray.md",
        },
        {
          title: "<Form />",
          path: "/docs/api/form.md",
        },
        {
          title: "<Formik />",
          path: "/docs/api/formik.md",
        },
        {
          title: "useField()",
          path: "/docs/api/useField.md",
        },
        {
          title: "useFormik()",
          path: "/docs/api/useFormik.md",
        },
        {
          title: "useFormikContext()",
          path: "/docs/api/useFormikContext.md",
        },
        {
          title: "withFormik()",
          path: "/docs/api/withFormik.md",
        },
      ],
    },
  ],
}

export default sidebar
