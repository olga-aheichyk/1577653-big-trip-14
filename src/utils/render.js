import AbstractClass from '../view/abstract-class';

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const render = (container, child, place) => {
  if (container instanceof AbstractClass) {
    container = container.getElement();
  }

  if (child instanceof AbstractClass) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
  }
};

const replace = (newChild, oldChild) => {
  if (oldChild instanceof AbstractClass) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof AbstractClass) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  parent.replaceChild(newChild, oldChild);
};

const remove = (component) => {
  if (!(component instanceof AbstractClass)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};

const createDOMElementFromMarkup = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstElementChild;
};

export {
  render,
  replace,
  remove,
  RenderPosition,
  createDOMElementFromMarkup
};
