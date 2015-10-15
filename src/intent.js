export default function(responses) {
  const { DOM } = responses;
  const actions = {
    click$: DOM.select('.count').events('click'),
    changeTitle$: DOM.select('input.title').events('change')
      .map((e) => e.target.value)
  };
  return actions;
}
