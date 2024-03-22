import icons from '../../../assets/icons.svg';
import { validateInput, clearInputError, allTrue, resetForm } from '../helpers';
import View from './view';

class StartView extends View {
  _markup = `
    <section class="bg-start-bg md:bg-start-bg-desktop bg-cover bg-center bg-no-repeat flex p-4 items-center justify-center">
      <div class="w-full gap-10 p-8 bg-light-blue rounded-[36px] flex flex-col items-start max-w-[550px]">
        <svg class="aspect-square self-end w-12 md:w-16 bg-black rounded-full p-2 text-white">
          <use href="${icons}#icon-arrow-up"></use>
        </svg>
        <h1 class="text-4xl md:text-5xl font-normal">
          <span class="block italic font-light text-3xl md:text-4xl">Don't just do</span>
          Treat yourself
        </h1>
        <form id="startForm" class="flex w-full has-[input[aria-invalid=true]]:pb-8 relative gap-2 flex-row items-center">
          <div class="w-full">
            <label class="sr-only">Enter your name:</label>
            <input type="text" name="name" id="name" aria-invalid="" aria-errormessage="nameErrorMessage" placeholder="e.g. John Doe" class="peer py-2 px-4 md:py-4 md:px-8 text-base md:text-lg aria-[invalid=true]:animate-wiggle border-solid border-red aria-[invalid=true]:border w-full rounded-md" />
            <p id="nameErrorMessage" aria-live="polite" class="hidden absolute text-red text-sm bottom-0 peer-aria-[invalid=true]:block">
              Please enter a valid name
            </p>
          </div>
          <button type="submit" class="py-2 md:py-4 md:px-8 bg-black text-white text-base md:text-lg px-4 rounded-md">Start</button>
        </form>
      </div>
    </section>
              `;

  _validateForm = () => {
    const regex = /^[a-zA-Z' -]+$/;

    const form = document.querySelector('#startForm');
    const inputs = Array.from(form.querySelectorAll('input'));

    inputs.forEach((input) => {
      validateInput(input, regex, this._formValidArray);
    });
  };

  _monitorForm = (handler, renderHandler) => {
    const form = document.querySelector('#startForm');

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

        resetForm('#startForm', 'input', this._formValidArray);

        renderHandler();
      }
    });
  };

  addHandler = (formHandler, setsViewHandler) => {
    this._renderMarkUp();
    this._monitorForm(formHandler, setsViewHandler);
  };
}

export default new StartView();
