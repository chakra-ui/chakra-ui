import { useId, useOptionalPart, useBoolean } from "@chakra-ui/hooks"

export default function Page() {
  const [error, setError] = useBoolean()
  const id = useId()

  const labelId = `label-${id}`
  const inputId = `input-${id}`
  const feedback = useOptionalPart(`feedback-${id}`)

  return (
    <>
      <div id={id}>
        <label id={labelId} htmlFor={inputId} />
        <input id={inputId} aria-labelledby={feedback.id} />
        {error && (
          <div ref={feedback.ref} id={feedback.id} data-input={inputId}>
            Feedback
          </div>
        )}
      </div>
      <button onClick={setError.toggle}>Toggle</button>
    </>
  )
}
