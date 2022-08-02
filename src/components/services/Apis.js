import axios from 'axios';



const cache = {
    set : (key, data) => {
        localStorage.setItem(key, JSON.stringify({ data : data }));
    },
    get : (key) => {
        const value = localStorage.getItem(key);
        return value != null ? JSON.parse(value) : null;
    }
};

export const useApis = () => {

    const get = (path, isExternal) => {
        const url = isExternal == true ? path : ('https://swapi.dev/api' + (path ?? '/'));

        return new Promise( (resolve, reject) => {
            const cachedData = cache.get(url);
            if (cachedData != null) {
                resolve(cachedData);
            }
            else {
                axios.get(url)
                    .then(
                        (response) => {
                            cache.set(url, response.data);
                            resolve(response);
                        }
                    )
                    .catch(
                        (error) => {
                            reject(Error("Promise rejected"));
                        }
                    );
            }
        } );
    };

    return {
        get : get
    };
};



export const useResources = () => {
    //const apis = useApis();

    const setImagesFromDB = (path, original, key, keyName) => {
        if (key != null) {
            return Object.assign(original, { image : ('https://raw.githubusercontent.com/DiachenkoRoman/SW_Database_prj/master/img/' + path + '/' + ((key).split(' ')).join('') + '.jpg') });
        }
        else {
            return (original ?? [  ]).map((item, index) => ( item.image == undefined ? Object.assign(item, { image : ('https://raw.githubusercontent.com/DiachenkoRoman/SW_Database_prj/master/img/' + path + '/' + ((item[keyName] ?? item.name).split(' ')).join('') + '.jpg') } ) : item ) );
        }
    };

    return {
        people : (original, key) => {
            //return new Promise( (resolve, reject) => {
            //    apis.get('https://akabab.github.io/starwars-api/api/' + (key == null ? 'all.json' : key), true).then(
            //        (extraResult) => {
            //            resolve((original ?? [  ]).map((item, index) => ( Object.assign((extraResult.data[index] ?? {  }), item) )));
            //        },
            //        (e) => {
            //            reject(Error("Promise rejected"));
            //        }
            //    );
            //} );
            return setImagesFromDB('charsCat', original, key);
        },
        planets : (original, key) => {
            //return new Promise( (resolve, reject) => {
            //    resolve(setImagesFromDB('planetsCat', original, key));
            //} );
            return setImagesFromDB('planetsCat', original, key)
        },
        films : (original, key) => {
            //return new Promise( (resolve, reject) => {
            //    resolve(setImagesFromDB('moviesCat', original));
            //} );
            return setImagesFromDB('moviesCat', original, key, 'title')
        },
        starships : (original, key) => {
            //return new Promise( (resolve, reject) => {
            //    resolve(setImagesFromDB('shipsCat', original));
            //} );
            return setImagesFromDB('shipsCat', original, key)
        }
    };
};