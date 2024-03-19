import icons from '../../../assets/icons.svg';
import View from './view';

class ItemView extends View {
  _generateMarkup = (data) => {
    return `
      <section class="relative grid mx-auto w-full max-w-[1100px] grid-rows-[auto_auto_1fr] sm:p-4 sm:pb-0">
        <div class="flex flex-col gap-4 md:gap-6 px-4 pt-6 mb-8 md:mb-12">
            <div class="flex flex-row items-center gap-4">
                <span style="background-color: ${
                  data.color
                };" class="aspect-square self-end grid place-content-center text-2xl min-[426px]:text-3xl md:text-4xl w-12 min-[426px]:w-14 md:w-[70px] p-1 rounded-full text-white">
                ${data.emoji}
                </span>
                <div class="sm:flex sm:flex-row sm:items-center sm:gap-6 md:gap-10">
                    <h1 class="relative lowercase first-letter:capitalize text-lg font-semibold sm:text-2xl md:text-4xl sm:after:content-[''] sm:after:bg-black sm:after:absolute sm:after:-right-4 md:after:-right-6 sm:after:h-full sm:after:w-[2px]">
                        ${data.name.replace(/-/g, ' ')}
                    </h1>
                    <p class="text-sm sm:text-base md:text-lg">${
                      data.completed
                    }/${data.items.length} done!</p>
                </div>
            </div>
            <p class="text-base md:text-lg">
            Enter a new task and then a treat to go with it!
            </p>
        </div>

        <form class="flex flex-col sm:flex-row sm:items-start items-center gap-2 md:gap-4 px-4 mb-8 md:mb-12">
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

        <div class="flex flex-col justify-center sm:flex-row sm:items-start gap-4 sm:gap-6 md:gap-10 md:justify-between items-center p-6 rounded-t-[30px] sm:p-8 md:p-12 bg-[#F1F1F1]">
            <div class="w-full sm:max-w-[400px]">
                <h2 class="rounded-md mb-4 md:mb-6 text-lg md:text-xl font-normal bg-[#DCDCDC] p-2 md:p-3 text-center">
                Tasks
                </h2>
                <ul class="flex flex-col gap-3 md:gap-4">
                    ${this._generateList(data.items, 'task')}               
                </ul>
            </div>
            <span class="bg-black text-white rounded-full w-full max-w-8 md:max-w-12 md:text-lg aspect-square flex items-center justify-center">&</span>
            <div class="w-full sm:max-w-[400px]">
                <h2 class="rounded-md mb-4 md:mb-6 text-lg md:text-xl font-normal bg-[#DCDCDC] p-2 md:p-3 text-center">
                Treats
                </h2>
                <ul class="flex flex-col gap-3 md:gap-4">
                ${this._generateList(data.items, 'treat')}              
                </ul>
            </div>
        </div>
        <button id="backBtn" class="absolute right-4 top-6 sm:right-8 sm:top-10">
            <svg class="w-8 sm:w-10 aspect-square">
                <use href="${icons}#icon-back"></use>
            </svg>
        </button>
      </section>`;
  };

  _generateList = (data, type) => {
    let markup = '';

    markup += data
      .map((item) => {
        return `
            <li class="rounded-md text-base bg-white text-left">
                <label class="group has-[input:checked]:line-through w-full block px-4 py-2 md:py-3 md:px-5 text-base md:text-lg flex items-center">
                    <input ${
                      item[type].completed ? 'checked' : ''
                    }  type="checkbox" class="absolute opacity-0 w-0 h-0" />
                    <div class="mr-2 md:mr-4 border overflow-hidden p-[2px] border-black w-4 md:w-5 rounded-full aspect-square inline-block">
                        <div class="w-full aspect-square group-has-[input:checked]:bg-black rounded-full bg-white"></div>                                
                    </div>
                    ${item[type].content}
                </label>
            </li> `;
      })
      .join('');

    return markup;
  };

  _renderMarkUp = (data) => {
    this._clearContainer();
    this._containerElement.innerHTML = this._generateMarkup(data);
    this._scrollToTop();
  };

  _monitorBackBtn = (handler) => {
    const btn = document.querySelector('#backBtn');

    btn.addEventListener('click', () => {
      handler();
      window.location.hash = '';
    });
  };

  handleStart = (handler, btnHandler) => {
    document.addEventListener('DOMContentLoaded', () => {
      if (handler()) {
        this._renderMarkUp(handler());
        this._monitorBackBtn(btnHandler);
      }
    });

    window.addEventListener('hashchange', () => {
      if (handler()) {
        this._renderMarkUp(handler());
        this._monitorBackBtn(btnHandler);
      }
    });
  };
}

export default new ItemView();
