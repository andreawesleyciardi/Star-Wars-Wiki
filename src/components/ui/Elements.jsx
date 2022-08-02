import React , { useState , useEffect , useRef } from 'react';
import { useNavigate , NavLink } from 'react-router-dom';
import { Button , Form , InputGroup } from 'react-bootstrap';
import Select from 'react-select';
import { useForm , Controller } from "react-hook-form";
import { useRecoilState } from 'recoil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarFull } from '@fortawesome/free-solid-svg-icons';

import { useApis , useResources } from './../services/Apis';
import { favoritesState } from "../../recoil/Atoms";



export const LoadingDuration = 2500;



const Error = (props) => {
    const refBlock = useRef(null);

    let { content , ...otherProps } = props;

    return (
        <Block id="error-block-container" className="main-block categories-block" variant="black" planets={ [ 'small' , 'medium' , 'big' , 'big' ] } planetsOpacity={ 0.1 } ref={ refBlock }>
            <div>
                {
                    content == undefined ?
                        <p>No results were found { props.itemkey && ('for the index "' + props.itemkey + '"') } { (props.categorykey && 'in the category "' + props.categorykey + '"') }.</p>
                    :
                        <props.content { ...otherProps } />
                }
                {
                    props.showSearch == true
                    &&
                        <Search refBlock={ refBlock } />
                }
            </div>
        </Block>
    );
};

Error.defaultProps = {
    categorykey : null,
    itemkey : null,
    showSearch : true,
    content : null
};

export { Error };



const Search = (props) => {
    const firstRenderRef = useRef(true);
    const [categories, setCategories] = useState(null);

    const { register , handleSubmit , setValue , getValues , watch , getFieldState , setError , clearErrors , trigger , control , formState: { errors , isSubmitting , isValid } } = useForm({ mode : 'onChange' , defaultValues : { categorykey : '' , itemkey : '' } });

    const apis = useApis();
    let navigate = useNavigate();

    useEffect(() => {
        if (firstRenderRef.current == true) {
            firstRenderRef.current = false;
            apis.get().then(
                (result) => {
                    setCategories(result.data);
                },
                (e) => {
                    setCategories([  ]);
                }
            );
        }
    }, [  ]);

    const onSubmit = handleSubmit( (data) => {
        navigate('/categories/' + data.categorykey + (((data.itemkey != null) && (data.itemkey != '')) ? ('/' + data.itemkey) : '/list'));
    } );

    return (
        <form onSubmit={ onSubmit }>
            {
                categories
                &&
                    <div className="search-container">
                        <Controller name="categorykey" control={ control } defaultValue={ '' } render={ ({ field: { onChange, value } }) => (
                            <Select
                                options={ (Object.keys(categories)).map((item, key) => ( { value : item , label : item } )) }
                                onChange={ (e) => { onChange(e.value); } }
                                value={ { value : value , label : value } }
                                className="select-search"
                                placeholder="Category"
                            />
                        ) } />
                        <Controller name="itemkey" control={ control } render={ ({ field }) => (
                            <Form.Control type="number" { ...field } min="1" className="input-search" placeholder="Index" />
                        ) } />
                        <Button variant="link" type="submit" disabled={ ((watch('categorykey') == null) || (watch('categorykey') == '')) }>Search</Button>
                    </div>
            }
        </form>
    );
};

Search.defaultProps = {
    refBlock : null
};

export { Search };



export const Link = (props) => {
    let navigate = useNavigate();

    let { to , params , refs , children , ...otherProps } = props;

    const redirect = (e) => {
        for (let i in refs) {
            (refs[i]).classList.add('fadeout');
        }
        setTimeout(function() {
            navigate(to);
        }, (refs.length > 0 ? 700 : 0));
    };

    return (
        <a { ...otherProps } onClick={ redirect }>
            { children }
        </a>
    );
};



const Block = React.forwardRef((props, ref) => {
    let { id , className , variant , planets , planetsOpacity , refs , children , ...otherProps } = props;

    return (
        <div id={ id ?? Math.random() } className={ 'block-container ' + className } { ...otherProps } ref={ ref }>
            <div className="square"></div>
            <div className="circle circle1"></div>
            <div className="circle circle2"></div>
            <div className={ 'block block-' + variant }>
                { children }
                {
                    planets.map((item, index) => (
                        <Planet variant={ item } container={ ref.current } opacity={ props.planetsOpacity } key={ index } />
                    ))
                }
            </div>
        </div>
    );
});

Block.defaultProps = {
    id : null,
    className : '',
    variant : 'transparent',
    planets : [  ],
    planetsOpacity : null
};

export { Block };



const Planet = (props) => {
    const [position, setPosition] = useState(null);

    const sizes = {
        small : 150,
        medium : 230,
        big : 400
    };

    if (position == null) {
        if (props.container == null) {

        }
        else {
            const min = -(sizes[props.variant] / 2);
            setPosition({ left : (Math.random() * ((props.container.clientWidth - min) + min) + min) , top : ((Math.random() * ((props.container.clientHeight - min - 160) + min) + min)) });
        }
    }

    return (
        position != null ?
            (
                <div className="planet-container" variant={ props.variant } style={ { left : position.left , top : position.top , opacity : props.opacity } }>
                    <div className="moon"></div>
                    <div className="planet"></div>
                </div>
            )
        :
            null
    );
};

Planet.defaultProps = {
    variant : 'small',
    container : null,
    opacity : 0.05
};

export { Planet };



const Cards = (props) => {
    const [list, setList] = useState([  ]);

    const apis = useApis();
    const resources = useResources();

    useEffect(() => {
        if ((props.list ?? [  ]).length > 0) {

            Promise.all(props.list.map( (url, index) => ( apis.get(url, true) ) )).then(
                (results) => {
                    let fullList = [  ];
                    for (let i in results) {
                        fullList.push(resources[props.category] != null ? resources[props.category](results[i].data, results[i].data[props.nameKey]) : results[i].data);
                    }
                    setList(fullList);
                },
                (errors) => {
                    console.log('Error in Cards component')
                }
            );
        }
    }, [ props.list ]);

    return (
        list != null ?
            (
                <div className="cards-container">
                    {
                        list.map((item, index) => {
                            const arrUrl = (item.url).split('/');

                            return (
                                <NavLink className="card-container" to={ '/categories/' + props.category + '/' + arrUrl[arrUrl.length - 2] } key={ ((item[props.nameKey]).split(' ')).join('') }>
                                    {
                                        item.image
                                        && 
                                            <Image classNameContainer="card-image-container" className="card-image" backgroundImage={ item.image } hide={ true }></Image>
                                    }
                                    <p>{ item[props.nameKey] }</p>
                                </NavLink>
                            );
                        })
                    }
                </div>
            )
        :
            null
    );
};

Cards.defaultProps = {
    nameKey : 'name'
};

export { Cards };



const Image = (props) => {
    const [url, setUrl] = useState('');

    const setPlaceholder = (e) => {
        if (url != '') {
            setUrl('');
        }
    };

    const setImage = (e) => {
        if (props.backgroundImage.indexOf('unknown') != -1) {
            setPlaceholder();
        }
        else {
            setUrl(props.backgroundImage);
        }
    };

    return (
        <>
            <div className={ props.classNameContainer } style={ url != '' ? { opacity : props.opacity , display : 'block' } : { opacity : 0 , display : (props.hide == true ? 'none' : 'block') } }>
                <div className={ props.className } style={ url != '' ? { backgroundImage : 'url(' + url + ')' } : {  } }>{ props.children }</div>
            </div>
            <img src={ props.backgroundImage } className="image-tester" alt="props.backgroundImage" onLoad={ setImage } onError={ setPlaceholder } />
        </>
    );
};

Image.defaultProps = {
    classNameContainer : 'preview-container',
    className : 'preview',
    opacity : 0.7,
    hide : false
};

export { Image };



const Favorite = (props) => {
    const [status, setStatus] = useState(false);
    const [favorites, setFavorites] = useRecoilState(favoritesState);

    let { value , category } = props;

    const toggleFavorite = () => {
        let isFavorite = favorites.length == 0 ? false : (favorites.find((favorite) => (((favorite.title ?? favorite.name) == (value.title ?? value.name)) && (favorite.category == category))) != undefined);
        let currentFavorites = ([  ]).concat(favorites);
        if (isFavorite == false) {
            currentFavorites.push(Object.assign({  }, value, { category : category }));
        }
        else {
            currentFavorites = currentFavorites.filter((favorite) => (((favorite.title ?? favorite.name) != (value.title ?? value.name)) || (favorite.category != category)));
        }
        setStatus(!isFavorite);
        setFavorites(currentFavorites);
    };

    useEffect(() => {
        let isFavorite = favorites.length == 0 ? false : (favorites.find((favorite) => (((favorite.title ?? favorite.name) == (value.title ?? value.name)) && (favorite.category == category))) != undefined);
        if (status != isFavorite) {
            setStatus(isFavorite);
        }
    }, [  ]);

    return (
        <Button variant="link" className="btn-favorite" onClick={ (e) => { toggleFavorite() } }>
            <FontAwesomeIcon icon={ status != true ? faStarEmpty : faStarFull } />
        </Button>
    );
};

Favorite.defaultProps = {
    className : ''
};

export { Favorite };

