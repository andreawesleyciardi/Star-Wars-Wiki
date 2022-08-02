import React , { useState , useEffect , useRef } from 'react';
import { Carousel } from 'react-bootstrap';
import { useRecoilState } from 'recoil';

import Item from './Item';
import { LoadingDuration , Error } from './../ui/Elements';
import { favoritesState } from "../../recoil/Atoms";



const Favorites = (props) => {
    const firstRenderRef = useRef(true);
    const [favorites, setFavorites] = useRecoilState(favoritesState);

    useEffect(() => {
        setTimeout(function() {
            props.setIsLoading(false);
        }, LoadingDuration);
    }, [  ]);

    return (
    	props.isLoading == false
    	&&
            (
                favorites.length > 0 ?
                	(
	                	<Carousel id="favorites-carousel" interval={ null }>
	                        {
		                    	favorites.map((item) => (
		                    		<Carousel.Item key={ ((item.title ?? item.name).split(' ')).join('') }>
							    		<Item categorykey="people" itemkey={ null } item={ Object.assign({  }, item) } categorytitle="Favorites" isLoading={ false } />
							    	</Carousel.Item>
					      		))
					      	}
					    </Carousel>  
                    )
                :
                	<Error showSearch={ false } content={ (props) => ( <p>No favorites were added</p> ) } />
            )
    );
};

export default Favorites;