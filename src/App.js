import { diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';

function app(initModel, update, view, node) {
  let model = initModel;
  let currentView = view(dispatch, model);
  let rootNode = createElement(currentView);
  node.appendChild(rootNode);
  function dispatch(msg) {
    model = update(msg, model);
    const updatedView = view(dispatch, model);
    const patches = diff(currentView, updatedView); //determines difference between current and updated view
    rootNode = patch(rootNode, patches); //this passes in rootNode and patches, which are the changes that need to be applied.
    currentView = updatedView;
  }
}

export default app;


