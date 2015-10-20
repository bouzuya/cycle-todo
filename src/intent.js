function getId(li) {
  const idString = li.className.replace(/^.*item(\d+).*$/, '$1');
  if (!idString) return null;
  return parseInt(idString, 10);
}

export default function(responses) {
  const { DOM } = responses;
  const actions = {
    addTodo$: DOM.select('input.title').events('keydown')
      .filter((e) => {
        const enter = 13;
        return e.keyCode === enter;
      })
      .map(e => e.target.value.trim())
      .filter(i => i.length > 0)
      .map(title => ({ title })),
    clearCompleted$: DOM.select('button.clear').events('click'),
    destroyTodo$: DOM.select('button.destroy').events('click')
      .map(e => {
        const id = getId(e.target.parentNode);
        if (!id) return null;
        return { id };
      })
      .filter(i => i),
    toggleCompleted$: DOM.select('input[type=checkbox]').events('click')
      .map((e) => {
        const id = getId(e.target.parentNode);
        if (!id) return null;
        const completed = e.target.checked;
        return { id, completed };
      })
      .filter(i => i)
  };
  return actions;
}
