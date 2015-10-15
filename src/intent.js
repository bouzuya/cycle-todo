export default function(responses) {
  const { DOM } = responses;
  const actions = {
    click$: DOM.select('.count').events('click')
  };
  return actions;
}
