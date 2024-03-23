import icons from '../../../assets/icons.svg';
import {
  validateInput,
  clearInputError,
  allTrue,
  resetForm,
  capitalizeFirstLetter,
  scrollToTop,
} from '../helpers';
import View from './view';

class SetsView extends View {
  _formMarkUp = `
    <form id="formAddSet" class="relative bg-white w-full max-w-[500px] px-4 py-6 sm:px-8 sm:py-8 flex flex-col items-center gap-6 rounded-2xl min-[426px]:rounded-3xl md:rounded-[30px] h-fit">
      <h2 class="font-medium self-start text-2xl sm:text-3xl">Add a new set</h2>
      <div class="flex flex-col gap-5">
        <div class="relative has-[input[aria-invalid=true]]:pb-6">
          <label class="font-light text-lg sm:text-2xl">Set Title:</label>
          <input type="text" name="title" id="title" aria-invalid="" aria-errormessage="titleErrorMessage" placeholder="e.g Weight loss" class="peer mt-2 py-2 px-4 md:py-3 md:px-5 text-base md:text-lg bg-[#F0F0F0] aria-[invalid=true]:animate-wiggle border-solid border-red aria-[invalid=true]:border w-full rounded-md" />
          <p id="titleErrorMessage" aria-live="polite" class="hidden absolute text-red text-sm bottom-0 peer-aria-[invalid=true]:block">
            Please enter a valid title
          </p>
        </div>
        <div class="flex flex-row gap-4">
          <div class="relative has-[input[aria-invalid=true]]:pb-6">
            <label class="font-light text-lg sm:text-2xl">Set Emoji:</label>
            <input type="text" name="emoji" id="emoji" aria-invalid="" aria-errormessage="emojiErrorMessage" placeholder="e.g 💪" class="peer py-2 px-4 mt-2 md:py-3 md:px-5 text-base md:text-lg bg-[#F0F0F0] aria-[invalid=true]:animate-wiggle border-solid border-red aria-[invalid=true]:border w-full rounded-md" />
            <p id="emojiErrorMessage" aria-live="polite" class="hidden absolute text-red text-sm bottom-0 peer-aria-[invalid=true]:block">
              Please enter a valid emoji
            </p>
          </div>
          <div class="relative w-[45%]">
            <label class="font-light text-lg sm:text-2xl">Set BG:</label>
            <input type="color" name="color" value="#E5FCC2" id="color" placeholder="e.g Weight loss" class="mt-2 h-10 md:h-[3.5rem] w-full rounded-md" />
          </div>
        </div>
        <button type="submit" class="py-2 md:py-3 max-[639px]:w-full md:px-5 bg-black text-white text-base md:text-lg px-4 rounded-md">
          Enter
        </button>
      </div>
      <button id="formCloseBtn" class="absolute right-4 top-6 sm:right-8 sm:top-8">
        <svg class="w-8 sm:w-10 aspect-square">
          <use href="${icons}#icon-close"></use>
        </svg>
      </button>
    </form> 
        `;

  _generateMarkup = (user, data) => {
    return `
      <section id="sectionStart" class="bg-ashe flex flex-col gap-10 md:gap-14 xl:gap-32 px-4 py-8 w-full max-w-[1300px] mx-auto md:px-8 lg:px-16 xl:rounded-[30px] xl:my-12 xl:py-16">
        <div class="flex flex-row justify-between">
          <h1 class="text-4xl md:text-5xl font-semibold">
            <span class="font-light block text-3xl md:text-4xl">Welcome back,</span>
            ${capitalizeFirstLetter(user)}!
          </h1>
          <div class="flex flex-col items-end gap-4 fixed md:relative md:bottom-0 bottom-[3%] md:right-0 right-[5%] text-white text-base">
            <button id="btnAddNewSet-1" class="btnAddNewSet bg-black rounded-xl">
              <svg class="aspect-square w-12 md:w-16 p-2">
                <use href="${icons}#icon-plus"></use>
              </svg>
            </button>
            <p class="hidden md:block text-black">Add a new Set</p>
          </div>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-row lg:flex-wrap gap-4">
          ${this._generateSets(data)}
          <button id="btnAddNewSet-2" class="btnAddNewSet flex w-full lg:max-w-[280px] box-shadow aspect-[1/0.89] items-center justify-center rounded-2xl min-[426px]:rounded-3xl md:rounded-[30px] bg-[#EAEAEA]">
            <svg class="aspect-square w-16 sm:w-28 bg-[#DFDFDF] rounded-full p-2 sm:p-6 text-black">
              <use href="${icons}#icon-plus"></use>
            </svg>
          </button>
        </div>
      </section>
                `;
  };

  _generateSets = (data) => {
    let markup = '';

    markup += data
      .map((set) => {
        return `
          <a 
          href="#${set.title}" 
          class="flex w-full lg:max-w-[280px] box-shadow aspect-[1/0.89] rounded-2xl min-[426px]:rounded-3xl lg:rounded-[30px] bg-white">
            <article class="flex p-3 min-[426px]:p-5 lg:p-7 justify-between flex-col w-full">
              <span 
              style="background-color: ${set.color}" 
              class="self-end grid place-content-center text-2xl min-[426px]:text-3xl md:text-4xl size-10 min-[426px]:w-14 md:size-14 lg:w-[70px] p-1 rounded-full text-white">
                ${set.emoji}
              </span>
              <h2 class="lowercase mt-auto mb-1 first-letter:capitalize text-lg min-[426px]:text-xl md:text-2xl font-semibold">
                  ${set.title.replace(/-/g, ' ')}
              </h2>
              <p class="font-medium text-xs min-[425px]:text-sm md:text-lg">
                ${set.completed}/${set.items.length} done
              </p>
            </article>
          </a>
              `;
      })
      .join('');

    return markup;
  };

  _renderMarkUp = (user, data, update = false) => {
    this._clearContainer();
    this._containerElement.innerHTML = this._generateMarkup(user, data);
    if (!update) scrollToTop();
  };

  _validateForm = () => {
    const titleRegex = /^(?!\s+$).+/;
    const emojiRegex = /^[\p{Emoji}]{1}$/u;

    const form = document.querySelector('#formAddSet');
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

  _monitorForm = (handler, renderHandler) => {
    const form = document.querySelector('#formAddSet');

    form.addEventListener('input', () => {
      clearInputError(form, this._formValidArray);
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      this._validateForm();

      if (allTrue(this._formValidArray)) {
        const formData = new FormData(form);

        const formDataObject = {};

        formData.forEach((value, key) => {
          formDataObject[key] = value;
        });

        handler(formDataObject);

        resetForm('#formAddSet', 'input[type=text]', this._formValidArray);

        renderHandler(true);
      }
    });
  };

  _monitorAddSetBtn = (handler, renderHandler) => {
    const btns = Array.from(document.querySelectorAll('.btnAddNewSet'));
    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        this._renderOverlay(this._formMarkUp);
        this._monitorForm(handler, renderHandler);
        this._monitorOverlayClose('formCloseBtn');
      });
    });
  };

  _addBtnObserver = () => {
    const toHide = document.querySelector('#btnAddNewSet-1');
    const toObserve = document.querySelector('#btnAddNewSet-2');

    const callback = (payload) => {
      if (payload[0].intersectionRatio === 1) toHide.classList.add('hidden');
      else toHide.classList.remove('hidden');
    };

    const options = { threshold: 1 };

    const observer = new IntersectionObserver(callback, options);

    observer.observe(toObserve);
  };

  addHandler = (user, sets, handler, renderHandler, update) => {
    this._renderMarkUp(user, sets, update);
    this._monitorAddSetBtn(handler, renderHandler);
    this._addBtnObserver();
  };
}

export default new SetsView();
