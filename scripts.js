const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;
  let checkboxes;
  let buttons;
  let text;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);
    _form.focus();
    checkboxes = Array.from(items.querySelectorAll('.item__checkbox'));
    buttons = Array.from(items.querySelectorAll('.item__button'));
    text = Array.from(items.querySelectorAll('.item__text'));
    var i;
    for(i in checkboxes){
        checkboxes[i].addEventListener('click', finish);
    }
    var i;
    for(i in buttons){
        buttons[i].addEventListener('click', deleteItem);
    }
    var i;
    for(i in text){
        text[i].addEventListener('click', edit);
    }
  }

  function formHandler(e) {
    e.preventDefault();
    var pattern = new RegExp(/\S/gm);

    if(pattern.test(this.elements[0].value)){
        add(this.elements[0].value);
    }
    this.elements[0].value = null;
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    this.parentElement.classList.toggle('item--done');
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    this.parentElement.classList.toggle('item--done', false);
    text_item = el('input', 'item__text');
    text_item_text = this.innerHTML;
    text_item.setAttribute('value', text_item_text);
    this.parentElement.replaceChild(text_item, this);
    text_item.focus();
    text_item.setSelectionRange(text_item_text.length, text_item_text.length);
    text_item.addEventListener('keypress', commit);
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    if (e.key === 'Enter') {
      text_item = el('span', 'item__text', edit);
      newtext = document.createTextNode(this.value);
      text_item.appendChild(newtext);
      this.parentElement.replaceChild(text_item,this);
      if(text_item.parentElement.querySelector('.item__checkbox').checked){
        text_item.parentElement.classList.toggle('item--done', true);
      }
    }
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    list_item = el('li', 'item');

    checkbox_item = el('input', 'item__checkbox', finish);
    checkbox_item.setAttribute('type', 'checkbox');

    text_item = el('span', 'item__text', edit);
    newtext = document.createTextNode(value);
    text_item.appendChild(newtext);

    button_item = el('button', 'item__button', deleteItem);
    deletetext = document.createTextNode('Eyða');
    button_item.appendChild(deletetext);

    list_item.appendChild(checkbox_item);
    list_item.appendChild(text_item);
    list_item.appendChild(button_item);

    items.appendChild(list_item);
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
      items.removeChild(this.parentElement);
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
      const el = document.createElement(type);

      el.setAttribute('class', className);
      if(clickHandler != null) {
          el.addEventListener('click', clickHandler);
      }
      return el;
  }

  return {
    init: init
  }
})();