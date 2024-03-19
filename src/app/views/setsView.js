import icons from '../../../assets/icons.svg';
import View from './view';

class SetsView extends View {
  _generateMarkup = (user, data) => {
    return `
    <section  class="bg-ashe flex flex-col gap-10 md:gap-14 xl:gap-32 px-4 py-8 w-full max-w-[1300px] mx-auto md:px-8 lg:px-16 xl:rounded-[30px] xl:my-12 xl:py-16">
        <div class="flex flex-row justify-between">
            <h1 class="text-4xl md:text-5xl font-semibold">
                <span class="font-light block text-3xl md:text-4xl">Welcome back,</span>
                ${user.charAt(0).toUpperCase() + user.slice(1).toLowerCase()}!
            </h1>
            <div class="flex flex-col items-end gap-4 absolute md:relative md:bottom-0 bottom-[3%] md:right-0 right-[5%] text-white text-base">
                <button class="bg-black rounded-xl">
                    <svg class="aspect-square w-12 md:w-16 p-2">
                        <use href="${icons}#icon-plus"></use>
                    </svg>
                </button>
                <p class="hidden md:block text-black">Add a new Set</p>
            </div>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-row lg:flex-wrap gap-4">
            ${this._generateSets(data)}
            <button class="flex w-full lg:max-w-[280px] box-shadow aspect-[1/0.89] items-center justify-center rounded-2xl min-[426px]:rounded-3xl md:rounded-[30px] bg-[#EAEAEA]">
                <svg class="aspect-square w-16 sm:w-28 bg-[#DFDFDF] rounded-full p-2 sm:p-6 text-black">
                    <use href="${icons}#icon-plus"></use>
                </svg>
            </button>
        </div>
    </section>`;
  };

  _generateSets = (data) => {
    let markup = '';

    markup += data
      .map((set) => {
        return `
            <a href="#${
              set.name
            }" class="flex w-full lg:max-w-[280px] box-shadow aspect-[1/0.89] rounded-2xl min-[426px]:rounded-3xl md:rounded-[30px] bg-white">
                <article class="flex p-3 min-[426px]:p-5 md:p-7 justify-between flex-col w-full">
                    <span 
                        style="background-color: ${set.color}" 
                        class="aspect-square self-end grid place-content-center text-2xl min-[426px]:text-3xl md:text-4xl w-10 min-[426px]:w-14 md:w-[70px] p-1 rounded-full text-white">
                        ${set.emoji}
                    </span>
                    <h2 class="lowercase mt-auto mb-1 first-letter:capitalize text-lg min-[426px]:text-xl md:text-2xl font-semibold">
                        ${set.name.replace(/-/g, ' ')}
                    </h2>
                    <p class="font-medium text-xs min-[425px]:text-sm md:text-lg">
                    ${set.completed}/${set.items.length} done</p>
                </article>
            </a>`;
      })
      .join('');

    return markup;
  };

  _renderMarkUp = (user, data) => {
    this._clearContainer();
    this._containerElement.innerHTML = this._generateMarkup(user, data);
  };

  renderView = (data) => {
    const { user, sets } = data;

    this._renderMarkUp(user, sets);
  };

  handleStart = (handler) => {
    const { active, user, sets } = handler();

    if (!active) return;

    this._renderMarkUp(user, sets);
  };
}

export default new SetsView();
