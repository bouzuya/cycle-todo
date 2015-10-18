export default function(responses) {
  const { DOM } = responses;
  const actions = {
    addTodo$: DOM.select('input.title').events('keydown')
      .filter((e) => {
        const enter = 13;
        return e.keyCode === enter;
      })
      .map((e) => e.target.value.trim())
      .filter((i) => i.length > 0)
  };
  return actions;
}
