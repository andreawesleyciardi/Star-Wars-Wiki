import React , { useState , useEffect , useRef } from 'react';
import { NavLink , useLocation , useParams } from 'react-router-dom';

import { useApis , useResources } from './../services/Apis';
import Images from './../services/Images';
import { LoadingDuration , Link , Block , Cards , Image , Favorite , Error } from './../ui/Elements';



const Item = (props) => {
    const firstRenderRef = useRef(true);
    const [item, setItem] = useState(null);
    const [error, setError] = useState(false);
    const refBlock = useRef(null);

    const apis = useApis();
    const resources = useResources();
    let location = useLocation();

    let { categorykey , itemkey } = useParams();
    if ((props.categorykey != undefined) && (props.item != undefined)) {
        categorykey = props.categorykey;
    }

    useEffect(() => {
        if (firstRenderRef.current == true) {
            firstRenderRef.current = false;
            if (props.item == undefined) {
                setTimeout(function() {
                    apis.get(('vehicles|starships').indexOf(categorykey) == -1 ? ('/' + categorykey + '/' + itemkey) : ('/' + categorykey)).then(
                        (result) => {
                            let resultData = null;
                            if (('vehicles|starships').indexOf(categorykey) == -1) {
                                resultData = result.data;
                            }
                            else {
                                if (result.data.results[parseInt(itemkey) - 1] != undefined) {
                                    resultData = result.data.results[parseInt(itemkey) - 1];
                                }
                                else {
                                    setError(true);
                                }
                            }
                            if (resources[categorykey] != null) {
                                setItem(resources[categorykey](resultData, (resultData.title ?? resultData.name)));
                            }
                            else {
                                setItem(resultData);
                            }
                        },
                        (e) => {
                            setError(true);
                        }
                    );
                }, LoadingDuration);
            }
            else {
                setItem(resources[categorykey](props.item, (props.item.title ?? props.item.name)));
            }
        }
    }, [  ]);

    useEffect(() => {
        if (((item != null) || (error != false)) && (props.isLoading != false)) {
            props.setIsLoading(false);
        }
    }, [ item , error ]);

    return (
        item != null ?
            (
                <Block className="categories-item-container main-block categories-block" variant="black" planets={ [ 'small' , 'medium' , 'big' , 'big' ] } ref={ refBlock }>
                    <div className="category-image" style={ { backgroundImage : 'url(' + Images[categorykey] + ')' } }></div>
                    <h2 className="category-title" data-descr={ props.categorytitle ?? categorykey }>{ props.categorytitle ?? categorykey }</h2>                            
                    {
                        item?.image
                        &&
                            <Image backgroundImage={ item.image }></Image>
                    }
                    <div className="scrollabe-container">
                        {
                            location.pathname.indexOf('favorites') == -1
                            &&                                    
                                <NavLink to={ '/categories/' + categorykey + '/list' } className="carousel-control-prev">
                                    <span aria-hidden="true" className="carousel-control-prev-icon"></span>
                                </NavLink>
                        }
                        <div className="infos-container">
                            <div className="name-container">
                                <h2 data-descr={ item.title ?? item.name }>{ item.title ?? item.name }</h2>
                                {
                                    categorykey == 'people'
                                    &&
                                        <Favorite value={ item } category={ categorykey } />
                                }
                            </div>

                            {/* people / species */}
                            { item.height && <div><label>Height</label><p>{ item.height } cm</p></div> }
                            { item.mass && <div><label>Weight</label><p>{ item.mass } kg</p></div> }
                            { item.birth_year && <div><label>Born (year)</label><p>{ item.birth_year }</p></div> }
                            { item.gender && <div><label>Gender</label><p>{ item.gender }</p></div> }
                            { item.classification && <div><label>Classification</label><p>{ item.classification }</p></div> }
                            { item.designation && <div><label>Designation</label><p>{ item.designation }</p></div> }
                            { item.average_height && <div><label>Average height</label><p>{ item.average_height } cm</p></div> }
                            { item.skin_color && <div><label>Skin color</label><p>{ item.skin_color }</p></div> }
                            { item.hair_color && <div><label>Hair color</label><p>{ item.hair_color }</p></div> }
                            { item.eye_color && <div><label>Eye color</label><p>{ item.eye_color }</p></div> }
                            { item.average_lifespan && <div><label>Average lifespan</label><p>{ item.average_lifespan } years</p></div> }
                            { item.language && <div><label>Language</label><p>{ item.language }</p></div> }

                            {/* planets */}
                            { item.diameter && <div><label>Diameter</label><p>{ item.diameter } km</p></div> }
                            { item.rotation_period && <div><label>Rotation period</label><p>{ item.rotation_period } hours</p></div> }
                            { item.orbital_period && <div><label>Orbital period</label><p>{ item.orbital_period } days</p></div> }
                            { item.gravity && <div><label>Gravity</label><p>{ item.gravity }</p></div> }
                            { item.climate && <div><label>Climate</label><p>{ item.climate }</p></div> }
                            { item.surface_water && <div><label>Has water</label><p>{ (item.surface_water).toString() == '1' ? 'True' : 'False' }</p></div> }
                            { item.terrain && <div><label>Terrain</label><p>{ item.terrain }</p></div> }
                            { item.population && <div><label>Population</label><p>{ item.population }</p></div> }
                            
                            {/* films */}
                            { item.opening_crawl && <div className="w-50 mb-3"><q><em>{ item.opening_crawl }</em></q></div> }
                            { item.release_date && <div><label>Release date</label><p>{ item.release_date }</p></div> }
                            { item.episode_id && <div><label>Episode number</label><p>{ item.episode_id }</p></div> }
                            { item.director && <div><label>Director</label><p>{ item.director }</p></div> }
                            { item.producer && <div><label>Producer</label><p>{ item.producer }</p></div> }
                            
                            {/* starships */}
                            { item.model && <div><label>Model</label><p>{ item.model }</p></div> }
                            { item.manufacturer && <div><label>Manufacturer</label><p>{ item.manufacturer }</p></div> }
                            { item.cost_in_credits && <div><label>Cost in credits</label><p>{ item.cost_in_credits }</p></div> }
                            { item.length && <div><label>Length</label><p>{ item.length }</p></div> }
                            { item.max_atmosphering_speed && <div><label>Max atmosphering speed</label><p>{ item.max_atmosphering_speed }</p></div> }
                            { item.crew && <div><label>Crew</label><p>{ item.crew }</p></div> }
                            { item.passengers && <div><label>Passengers</label><p>{ item.passengers }</p></div> }
                            { item.cargo_capacity && <div><label>Cargo capacity</label><p>{ item.cargo_capacity }</p></div> }
                            { item.consumables && <div><label>Consumables</label><p>{ item.consumables }</p></div> }
                            { item.hyperdrive_rating && <div><label>Hyperdrive rating</label><p>{ item.hyperdrive_rating }</p></div> }
                            { item.MGLT && <div><label>MGLT</label><p>{ item.MGLT }</p></div> }
                            { item.starship_class && <div><label>Class</label><p>{ item.starship_class }</p></div> }

                            { item.homeworld && <div className="card-section-container"><label>Homeworld</label><Cards category="planets" list={ [ item.homeworld ] } /></div> }

                            { item.people && item.people.length > 0 && <div className="card-section-container"><label>People</label><Cards category="people" list={ item.people } /></div> }
                            { item.characters && item.characters.length > 0 && <div className="card-section-container"><label>Characters</label><Cards category="people" list={ item.characters } /></div> }
                            { item.residents && item.residents.length > 0 && <div className="card-section-container"><label>Visitors</label><Cards category="people" list={ item.residents } /></div> }
                            { item.pilots && item.pilots.length > 0 && <div className="card-section-container"><label>Pilots</label><Cards category="people" list={ item.pilots } /></div> }
                            { item.films && item.films.length > 0 && <div className="card-section-container"><label>Films</label><Cards category="films" list={ item.films } nameKey="title" /></div> }
                            { item.species && item.species.length > 0 && <div className="card-section-container"><label>Species</label><Cards category="species" list={ item.species } /></div> }
                            { item.vehicles && item.vehicles.length > 0 && <div className="card-section-container"><label>Vehicles</label><Cards category="vehicles" list={ item.vehicles } /></div> }
                            { item.starships && item.starships.length > 0 && <div className="card-section-container"><label>Starships</label><Cards category="starships" list={ item.starships } /></div> }
                        </div>
                    </div>
                </Block>
            )
        :
            (
                error == true
                &&
                    <Error categorykey={ categorykey } itemkey={ itemkey } />
            )
    );
};

export default Item;