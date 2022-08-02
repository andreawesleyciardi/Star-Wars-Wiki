import React , { useState , useEffect , useRef } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';

import { useApis } from './../services/Apis';
import category_people from '../../imgs/people.jpeg';
import category_planets from '../../imgs/planets3.jpeg';
import category_films from '../../imgs/films2.png';
import category_species from '../../imgs/species.webp';
import category_vehicles from '../../imgs/vehicles.jpeg';
import category_starships from '../../imgs/starships6.jpeg';
import { Link , Block , Planet } from './../ui/Elements';



const Home = (props) => {
    const firstRenderRef = useRef(true);
    const [categories, setCategories] = useState(null);
    const refBlock = useRef(null);

    const categoriesImgs = {
        people : category_people,
        planets : category_planets,
        films : category_films,
        species : category_species,
        vehicles : category_vehicles,
        starships : category_starships
    }

    const apis = useApis();

    useEffect(() => {
        if (firstRenderRef.current == true) {
            firstRenderRef.current = false;
            setTimeout(function() {
                apis.get().then(
                    (result) => {
                        setCategories(result.data);
                    },
                    (e) => {
                        debugger;
                    }
                );
            }, 3500);
        }
    }, [  ]);

    useEffect(() => {
        if (categories != null) {
            props.setIsLoading(false);
        }
    }, [ categories ]);

    return (
        <>
            {
                categories
                &&
                    (
                        <Block id="categories-carousel-container" variant="black" ref={ refBlock }>
                            <Carousel interval={ null }>
                                {
                                    (Object.keys(categories)).map((key, index) => (
                                        <Carousel.Item key={ key }>
                                            <div className="category-image" style={ { backgroundImage : 'url(' + categoriesImgs[key] + ')' } }>
                                                <Link className="category-image-hover" to={ '/categories/:categorykey/list' } params={ { categorykey : key } } refs={ [ refBlock.current ] }>
                                                    <p>open category</p>
                                                </Link>
                                            </div>
                                            <Carousel.Caption>
                                              <h3 data-descr={ key }>{ key }</h3>
                                            </Carousel.Caption>
                                            
                                            <p className="category-name-background">{ key }</p>
                                        </Carousel.Item>
                                    ))
                                }
                            </Carousel>
                            <Planet variant="small" container={ refBlock.current } />
                            <Planet variant="medium" container={ refBlock.current } />
                            <Planet variant="big" container={ refBlock.current } />
                        </Block>
                    )
            }
            {/*
                <h1 data-descr="TEST TITLE">TEST TITLE H1</h1>
                <h2 data-descr="TEST TITLE">TEST TITLE H2</h2>
                <h3 data-descr="TEST TITLE">TEST TITLE H3</h3>
                <h4 data-descr="TEST TITLE">TEST TITLE H4</h4>
                <h5 data-descr="TEST TITLE">TEST TITLE H5</h5>
                <h6 data-descr="TEST TITLE">TEST TITLE H6</h6>
                <p className="title" data-descr="TEST TITLE">TEST TITLE P</p>
            */}
        </>
    );
};

export default Home;