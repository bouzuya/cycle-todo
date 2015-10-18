export default function(responses) {
  const { DOM } = responses;
  const actions = {
    click$: DOM.select('.count').events('click'),
    changeTitle$: DOM.select('input.title').events('change')
      .map((e) => e.target.value),
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
