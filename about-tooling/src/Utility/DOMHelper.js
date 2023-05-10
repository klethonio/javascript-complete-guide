// export class DOMHelper {
//   // code ...
// }

export function clearEventListeners(element) {
  const clonedElement = element.cloneNode(true);
  element.replaceWith(clonedElement);
  return clonedElement;
}

export function moveElement(elementId, newDestinationSelector) {
  const element = document.getElementById(elementId);
  const destinationList = document.querySelector(newDestinationSelector);
  destinationList.append(element);
  element.scrollIntoView({ behavior: 'smooth' });
}
