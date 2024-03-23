import icons from '../../../assets/icons.svg';
import {
  setHash,
  clearHash,
  validateInput,
  clearInputError,
  allTrue,
  resetForm,
  scrollToTop,
  isChecked,
  convertToText,
} from '../helpers';
import View from './view';

class ItemView extends View {
  _deleteSetModalMarkup = `
    <div id="formEditSet" class="relative bg-white w-full max-w-[500px] px-4 py-6 sm:px-8 sm:py-8 flex flex-col items-center gap-6 rounded-2xl min-[426px]:rounded-3xl md:rounded-[30px] h-fit">
      <div class="flex flex-col items-center gap-5">
        <svg class="size-12 text-red">
          <use href="${icons}#icon-warning"></use>
        </svg>
        <p class="text-center">Are you sure you want to delete this set? This action cannot be undone.</p>
        <div class="flex flex-row gap-4 items-center">
          <button type="submit" id="deleteSetBtn" class="py-2 md:py-3 max-[639px]:w-full md:px-5 bg-red text-white text-base md:text-lg px-4 rounded-md">
            Delete
          </button>
          <button type="submit" id="deleteSetModalCloseBtn" class="py-2 md:py-3 max-[639px]:w-full md:px-5 bg-black text-white text-base md:text-lg px-4 rounded-md">
            Cancel
          </button>      
        </div>        
      </div>
    </div> 
          `;

  _generateEditFormMarkUp = (data) => {
    const { title, emoji, color } = data;

    return `
      <form id="formEditSet" class="relative bg-white w-full max-w-[500px] px-4 py-6 sm:px-8 sm:py-8 flex flex-col items-center gap-6 rounded-2xl min-[426px]:rounded-3xl md:rounded-[30px] h-fit">
        <h2 class="font-medium self-start text-2xl sm:text-3xl">Edit set Information</h2>
        <div class="flex flex-col gap-5">
          <div class="relative has-[input[aria-invalid=true]]:pb-6">
            <label class="font-light text-lg sm:text-2xl">Set Title:</label>
            <input type="text" name="title" value="${convertToText(title)}"
             id="title" aria-invalid="" aria-errormessage="titleErrorMessage" placeholder="e.g Weight loss" class="peer mt-2 py-2 px-4 md:py-3 md:px-5 text-base md:text-lg bg-[#F0F0F0] aria-[invalid=true]:animate-wiggle border-solid border-red aria-[invalid=true]:border w-full rounded-md" />
            <p id="titleErrorMessage" aria-live="polite" class="hidden absolute text-red text-sm bottom-0 peer-aria-[invalid=true]:block">
              Please enter a valid title
            </p>
          </div>
          <div class="flex flex-row gap-4">
            <div class="relative has-[input[aria-invalid=true]]:pb-6">
              <label class="font-light text-lg sm:text-2xl">Set Emoji:</label>
              <input type="text" name="emoji" value="${emoji}" id="emoji" aria-invalid="" aria-errormessage="emojiErrorMessage" placeholder="e.g 💪" class="peer py-2 px-4 mt-2 md:py-3 md:px-5 text-base md:text-lg bg-[#F0F0F0] aria-[invalid=true]:animate-wiggle border-solid border-red aria-[invalid=true]:border w-full rounded-md" />
              <p id="emojiErrorMessage" aria-live="polite" class="hidden absolute text-red text-sm bottom-0 peer-aria-[invalid=true]:block">
                Please enter a valid emoji
              </p>
            </div>
            <div class="relative w-[45%]">
              <label class="font-light text-lg sm:text-2xl">Set BG:</label>
              <input type="color" name="color" value="${color}" id="color" placeholder="e.g Weight loss" class="mt-2 h-10 md:h-[3.5rem] w-full rounded-md" />
            </div>
          </div>
          <button type="submit" class="py-2 md:py-3 max-[639px]:w-full md:px-5 bg-black text-white text-base md:text-lg px-4 rounded-md">
            Enter
          </button>
        </div>
        <button id="formEditSetCloseBtn" class="absolute right-4 top-6 sm:right-8 sm:top-8">
          <svg class="w-8 sm:w-10 aspect-square">
            <use href="${icons}#icon-close"></use>
          </svg>
        </button>
      </form> 
          `;
  };

  _generateMarkup = (data) => {
    return `
      <section class="relative grid mx-auto w-full max-w-[1100px] grid-rows-[auto_auto_1fr] sm:p-4 sm:pb-0">

        <div class="grid grid-cols-[auto_auto] grid-rows-2 gap-4 md:gap-6 px-4 pt-6 mb-8 md:mb-12">
          <div class="flex flex-row items-center gap-4">
            <span 
            style="background-color: ${data.color};" 
            class="aspect-square self-end grid place-content-center text-2xl min-[426px]:text-3xl md:text-4xl w-12 min-[426px]:w-14 md:w-[70px] p-1 rounded-full text-white">
              ${data.emoji}
            </span>
            <div class="sm:flex sm:flex-row sm:items-center sm:gap-6 md:gap-10">
              <h1 class="relative lowercase first-letter:capitalize text-lg font-semibold sm:text-2xl md:text-4xl sm:after:content-[''] sm:after:bg-black sm:after:absolute sm:after:-right-4 md:after:-right-6 sm:after:h-full sm:after:w-[2px]">
                ${data.title.replace(/-/g, ' ')}
              </h1>
              <p class="text-sm sm:text-base md:text-lg">
                ${data.completed}/${data.items.length} done!
              </p>
            </div>
          </div>
          <nav class="relative ml-auto">
            <button id="menuBtn" class="lg:hidden">              
              <svg class="w-8 sm:w-10 aspect-square">
                <use href="${icons}#icon-ellipsis"></use>
              </svg>
            </button>
            <menu id="navMenu" class="z-[100] fixed ld:relative w-max right-4 top-6 flex-col items-start gap-2 bg-ashe text-lg font-medium p-2 rounded-md box-shadow-2 hidden lg:flex lg:flex-row lg:bg-[transparent] lg:shadow-none lg:gap-8 lg:items-center">
              <li>
                <button id="editSetBtn" class="p-1">Edit</button>
              </li>
              <li>
                <button id="menuDeleteSetBtn" class="p-1">Delete</button>
              </li>
              <li class="mt-1">
                <button id="backBtn" class="flex flex-row items-center gap-2 py-2 max-[639px]:w-full  bg-black text-white font-normal pl-3 pr-4 rounded-md">
                  <svg class="size-6">
                    <use href="${icons}#icon-back"></use>
                  </svg>
                  <span>Go back</span>
                </button>
              </li>
            </menu>
          </nav>
          <p class="col-start-1 col-end-3 text-base md:text-lg">
            Enter a new task and then a treat to go with it!
          </p>
        </div>

        <form id="formAddNewItem" class="flex flex-col sm:flex-row sm:items-start items-center gap-2 md:gap-4 px-4 mb-8 md:mb-12">
          <h2 class="sr-only">Add a new task item</h2>
          <div class="w-full">
            <div class="relative has-[input[aria-invalid=true]]:pb-6">
              <label class="sr-only">Enter Task:</label>
              <input type="text" name="task" id="task" aria-invalid="" aria-errormessage="taskErrorMessage" placeholder="Finish homework" class="peer py-2 px-4 md:py-3 md:px-5 text-base md:text-lg bg-[#F0F0F0] aria-[invalid=true]:animate-wiggle border-solid border-red aria-[invalid=true]:border w-full rounded-md" />
              <p id="taskErrorMessage" aria-live="polite" class="hidden absolute text-red text-sm bottom-0 peer-aria-[invalid=true]:block">
                Please enter a valid task
              </p>
            </div>
          </div>
          <div class="w-full">
            <div class="relative has-[input[aria-invalid=true]]:pb-6">
              <label class="sr-only">Enter Task:</label>
              <input type="text" name="treat" id="treat" aria-invalid="" aria-errormessage="treatErrorMessage" placeholder="Order a cheeseburger" class="peer py-2 px-4 md:py-3 md:px-5 text-base md:text-lg bg-[#F0F0F0] aria-[invalid=true]:animate-wiggle border-solid border-red aria-[invalid=true]:border w-full rounded-md" />
              <p id="treatErrorMessage" aria-live="polite" class="hidden absolute text-red text-sm bottom-0 peer-aria-[invalid=true]:block">
                Please enter a valid treat
              </p>
            </div>
          </div>
          <button type="submit" class="py-2 md:py-3 max-[639px]:w-full md:px-5 bg-black text-white text-base md:text-lg px-4 rounded-md">Enter</button>
        </form>

        <div id="setItems" class="flex flex-col justify-center sm:flex-row sm:items-start gap-4 sm:gap-6 md:gap-10 md:justify-between items-center p-6 rounded-t-[30px] sm:p-8 md:p-12 bg-[#F1F1F1]">
          <div class="w-full sm:max-w-[400px]">
            <h2 class="rounded-md mb-4 md:mb-6 text-lg md:text-xl font-normal bg-[#DCDCDC] p-2 md:p-3 text-center">
              Tasks
            </h2>
            <ul data-list-type="task" class="flex flex-col gap-3 md:gap-4">
              ${this._generateList(data.items, 'task')}               
            </ul>
          </div>
          <span class="bg-black text-white rounded-full w-full max-w-8 md:max-w-12 md:text-lg aspect-square flex items-center justify-center">&</span>
          <div class="w-full sm:max-w-[400px]">
            <h2 class="rounded-md mb-4 md:mb-6 text-lg md:text-xl font-normal bg-[#DCDCDC] p-2 md:p-3 text-center">
              Treats
            </h2>
            <ul data-list-type="treat" class="flex flex-col gap-3 md:gap-4">
              ${this._generateList(data.items, 'treat')}              
            </ul>
          </div>
        </div>

        <div id="menuOverlay" class="hidden absolute bg-black opacity-0 size-full lg:hidden"></div>

      </section>
                `;
  };

  _showMenuOverlay = (control = true) => {
    const overlay = document.querySelector('#menuOverlay');

    if (control) {
      overlay.classList.remove('hidden');
      overlay.classList.add('block');
      return;
    }

    overlay.classList.remove('block');
    overlay.classList.add('hidden');
  };

  _monitorMenuBtn = () => {
    const menuBtn = document.querySelector('#menuBtn');
    const editSetBtn = document.querySelector('#editSetBtn');
    const menuDeleteSetBtn = document.querySelector('#menuDeleteSetBtn');
    const menu = document.querySelector('#navMenu');
    const overlay = document.querySelector('#menuOverlay');

    menuBtn.addEventListener('click', () => {
      menu.classList.remove('hidden');
      menu.classList.add('flex');
      this._showMenuOverlay();
    });

    [editSetBtn, menuDeleteSetBtn, overlay].forEach((element) => {
      element.addEventListener('click', () => {
        menu.classList.remove('flex');
        menu.classList.add('hidden');
        this._showMenuOverlay(false);
      });
    });
  };

  _generateList = (data, type) => {
    let markup = '';

    if (data.length) {
      markup += data
        .map((item, index) => {
          return `
            <li data-item-index="${index}" class="group grid grid-cols-[1fr_24px] items-start gap-6 relative pl-4 pr-2 py-2 md:py-3 md:pl-5 md:pr-3 rounded-md text-base bg-white text-left">
              <label class="checkbox-wrapper">
                <input type="checkbox" ${
                  item[type].completed ? 'checked' : ''
                } />
                <div class="checkbox-content grid grid-cols-[auto_1fr] items-start gap-3">
                  <span id="checkbox-span"></span>
                  <span class="text-black font-medium group-has-[input:checked]:font-medium group-has-[input:checked]:text-opacity-70 group-has-[input:checked]:line-through text-base md:text-lg">
                    ${item[type].content}
                  </span>
                </div>
              </label>              
              <button class="deleteBtn flex items-center justify-center size-[26px] text-[#334155] rounded-md p-1 hover:bg-[#fef2f2] hover:text-[#ef4444] group-has-[input:checked]:hidden">
                <svg class="w-[26px] aspect-square ">
                  <use href="${icons}#icon-delete"></use>
                </svg>
              </button>                     
            </li>
                `;
        })
        .join('');
    } else {
      markup = this._renderEmptyMarkUp(type);
    }

    return markup;
  };

  _renderMarkUp = (data, update) => {
    this._clearContainer();
    this._containerElement.innerHTML = this._generateMarkup(data);
    if (!update) scrollToTop();
  };

  _renderEmptyMarkUp = (type) => {
    return `
      <div class="w-[calc(100%-2rem)] mx-auto my-4">
        <p class="font-medium text-base text-center italic opacity-50">
          You have no ${type}s 😑, Enter a new ${type} above!
        </p>
      </div>
    `;
  };

  _validateAddNewItemForm = () => {
    const regex = /^(?!\s+$).+/;

    const form = document.querySelector('#formAddNewItem');
    const inputs = Array.from(form.querySelectorAll('input'));

    inputs.forEach((input) => {
      validateInput(input, regex, this._formValidArray);
    });
  };

  _monitorAddNewItemForm = (handler, currSetHandler, renderHandler) => {
    const form = document.querySelector('#formAddNewItem');

    form.addEventListener('input', () => {
      clearInputError(form, this._formValidArray);
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      this._validateAddNewItemForm();

      if (allTrue(this._formValidArray)) {
        const formData = new FormData(form);

        const formDataObject = {};

        formData.forEach((value, key) => {
          formDataObject[key] = value;
        });

        handler(formDataObject);

        resetForm('#formAddNewItem', 'input', this._formValidArray);

        const id = currSetHandler();

        if (id) renderHandler(id, true);
      }
    });
  };

  _monitorBackBtn = () => {
    const btn = document.querySelector('#backBtn');

    btn.addEventListener('click', () => {
      clearHash();
    });
  };

  _updateCheckedItem = (list, listItem, checkbox, handler) => {
    const listType = list.getAttribute('data-list-type');
    const itemIndex = listItem.getAttribute('data-item-index');

    if (!listType || !itemIndex) return;

    const itemUpdate = {
      type: listType,
      index: itemIndex,
      status: isChecked(checkbox),
    };

    handler(itemUpdate);
  };

  _deleteItem = (listItem, handler) => {
    const itemIndex = listItem.getAttribute('data-item-index');

    handler(itemIndex);
  };

  _monitorList = (
    updateHandler,
    deleteHandler,
    currSetHandler,
    renderHandler
  ) => {
    const setItems = document.querySelector('#setItems');

    setItems.addEventListener('click', (e) => {
      const list = e.target.closest('ul');
      const listItem = e.target.closest('li');
      const checkbox = e.target.closest('input');
      const btn = e.target.closest('button');

      if (!list) return;

      if (checkbox)
        this._updateCheckedItem(list, listItem, checkbox, updateHandler);

      if (btn) this._deleteItem(listItem, deleteHandler);

      const id = currSetHandler();

      if (id) renderHandler(id, true);
    });
  };

  _validateEditSetForm = () => {
    const titleRegex = /^(?!\s+$).+/;
    const emojiRegex = /^[\p{Emoji}]{1}$/u;

    this._clearFormValidationArray();

    const form = document.querySelector('#formEditSet');
    const inputs = Array.from(form.querySelectorAll('input'));

    inputs.forEach((input) => {
      if (input.name === 'title') {
        validateInput(input, titleRegex, this._formValidArray);
      }

      if (input.name === 'emoji') {
        validateInput(input, emojiRegex, this._formValidArray);
      }
    });
  };

  _monitorEditSetForm = (handler, currSetHandler, renderHandler) => {
    const form = document.querySelector('#formEditSet');

    form.addEventListener('input', () => {
      clearInputError(form, this._formValidArray);
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      this._validateEditSetForm();

      if (allTrue(this._formValidArray)) {
        const formData = new FormData(form);

        const formDataObject = {};

        formData.forEach((value, key) => {
          formDataObject[key] = value;
        });

        handler(formDataObject);

        resetForm('#formEditSet', 'input[type=text]', this._formValidArray);

        const id = currSetHandler();

        setHash(id);
      }
    });
  };

  _monitorEditSetBtn = (
    currSetHandler,
    setDataHandler,
    editSetHandler,
    renderHandler
  ) => {
    const btn = document.querySelector('#editSetBtn');

    btn.addEventListener('click', () => {
      const currSet = currSetHandler();

      if (!currSet) return;

      const setData = setDataHandler(currSet);

      const editFormMarkup = this._generateEditFormMarkUp(setData);

      this._renderOverlay(editFormMarkup);
      this._monitorEditSetForm(editSetHandler, currSetHandler, renderHandler);
      this._monitorOverlayClose('formEditSetCloseBtn');
    });
  };

  _monitorDeleteSetBtn = (currSetHandler, deleteSetHandler) => {
    const btn = document.querySelector('#deleteSetBtn');

    btn.addEventListener('click', () => {
      const currSet = currSetHandler();

      if (!currSet) return;

      deleteSetHandler(currSet);
      clearHash();
    });
  };

  _monitorMenuDeleteBtn = (currSetHandler, deleteSetHandler) => {
    const btn = document.querySelector('#menuDeleteSetBtn');

    btn.addEventListener('click', () => {
      this._renderOverlay(this._deleteSetModalMarkup);
      this._monitorDeleteSetBtn(currSetHandler, deleteSetHandler);
      this._monitorOverlayClose('deleteSetModalCloseBtn');
    });
  };

  addHandler = (
    data,
    formHandler,
    updateHandler,
    deleteItemHandler,
    setDataLoadHandler,
    editSetHandler,
    currSetHandler,
    deleteSetHandler,
    renderHandler,
    update
  ) => {
    this._renderMarkUp(data, update);
    this._monitorMenuBtn();
    this._monitorAddNewItemForm(formHandler, currSetHandler, renderHandler);
    this._monitorBackBtn();
    this._monitorList(
      updateHandler,
      deleteItemHandler,
      currSetHandler,
      renderHandler
    );
    this._monitorEditSetBtn(
      currSetHandler,
      setDataLoadHandler,
      editSetHandler,
      renderHandler
    );
    this._monitorMenuDeleteBtn(currSetHandler, deleteSetHandler);
  };
}

export default new ItemView();
