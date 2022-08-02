import React , { useState , useEffect , useRef } from 'react';
import { Carousel } from 'react-bootstrap';

import { useApis } from './../services/Apis';
import Images from './../services/Images';
import { LoadingDuration , Link , Block , Error } from './../ui/Elements';



const Categories = (props) => {
    const firstRenderRef = useRef(true);
    const [categories, setCategories] = useState(null);
    const [error, setError] = useState(false);
    const refBlock = useRef(null);

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
                        setError(true);
                    }
                );
            }, LoadingDuration);
        }
    }, [  ]);

    useEffect(() => {
        if (categories != null) {
            props.setIsLoading(false);
        }
    }, [ categories ]);

    return (
        categories != null ?
            (
                <Block id="categories-carousel-container" className="main-block" variant="black" planets={ [ 'small' , 'medium' , 'big' ] } ref={ refBlock }>
                    <Carousel interval={ null }>
                        {
                            (Object.keys(categories)).map((key, index) => (
                                <Carousel.Item key={ key }>
                                    <div className="category-image" style={ { backgroundImage : 'url(' + Images[key] + ')' } }>
                                        <Link className="category-image-hover" to={ '/categories/' + key + '/list' } refs={ [ refBlock.current ] }>
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
                </Block>
            )
        :
            (
                error == true
                &&
                    <Error />
            )
    );
};

export default Categories;