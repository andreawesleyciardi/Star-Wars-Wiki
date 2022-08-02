import { atom } from 'recoil';



const localStorageEffect = (key) => ({setSelf, onSet}) => {
	const savedValue = localStorage.getItem(key)
	if (savedValue != null) {
		setSelf(JSON.parse(savedValue));
	}

	onSet((newValue, _, isReset) => {
		isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
	});
};

export const favoritesState = atom({
    key : 'Favorites',
    //default : (localStorage.getItem('favorites') != null ? JSON.parse(localStorage.getItem('favorites')) : [  ]),
    default : [  ],
    effects: [
    	localStorageEffect('favorites')
  	]
});