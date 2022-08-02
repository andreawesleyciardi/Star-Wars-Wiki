import React , { useState , useEffect , useRef } from 'react';
import { NavLink , useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { useApis , useResources } from './../services/Apis';
import Images from './../services/Images';
import { LoadingDuration , Link , Block , Image , Favorite , Error } from './../ui/Elements';



const List = (props) => {
    const firstRenderRef = useRef(true);
    const [list, setList] = useState(null);
    const [next, setNext] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState(false);
    const refBlock = useRef(null);

    const apis = useApis();
    const resources = useResources();

    let { categorykey } = useParams();

    const handleCall = (url, isFullUrl) => {
        const setStates = (listValue, nextValue) => {
            setList(listValue);
            setNext(nextValue);
        };

        apis.get(url, isFullUrl).then(
            (result) => {
                let fullList = (list ?? [  ]).concat(result.data.results);
                if (resources[categorykey] != null) {
                    setStates(resources[categorykey](fullList), result.data.next);
                }
                else {
                    setStates(fullList, result.data.next);
                }
            },
            (e) => {
                setError(true);
            }
        );
    };

    useEffect(() => {
        if (firstRenderRef.current == true) {
            firstRenderRef.current = false;
            setTimeout(function() {
                handleCall(('/' + categorykey));
            }, LoadingDuration);
        }
    }, [  ]);

    useEffect(() => {
        if (list != null) {
            props.setIsLoading(false);
        }
    }, [ list ]);

    const handleDownloadMore = () => {
        handleCall(next, true);
    };

    const handleMouseEnter = (e) => {
        if (e.target.dataset.image != '') {
            setImagePreview(e.target.dataset.image);
        }
    };

    const handleMouseLeave = (e) => {
        setImagePreview(null);
    };

    return (
        list != null ?
            (
                <Block id="categories-list-container" className="main-block categories-block" variant="black" planets={ [ 'small' , 'medium' , 'big' , 'big' ] } ref={ refBlock }>
                    <div className="category-image" style={ { backgroundImage : 'url(' + Images[categorykey] + ')' } }></div>
                    <h2 className="category-title" data-descr={ categorykey }>{ categorykey }</h2>
                    {
                        imagePreview
                        &&
                            <Image backgroundImage={ imagePreview }></Image>
                    }
                    <div className="scrollabe-container">
                        <NavLink to={ '/categories/list' } className="carousel-control-prev">
                            <span aria-hidden="true" className="carousel-control-prev-icon"></span>
                        </NavLink>
                        <ul className="list-container">
                            {
                                list.map((item, index) => (
                                    <li key={ ((item.title ?? item.name).split(' ')).join('') }>
                                        <div>
                                            {
                                                categorykey == 'people'
                                                &&
                                                    <Favorite value={ item } category={ categorykey } />
                                            }
                                            <Link to={ '/categories/' + categorykey + '/' + (index + 1 + (((categorykey == 'people') && (index >= 16)) ? 1 : 0) ) } refs={ [ refBlock.current ] } onMouseEnter={ handleMouseEnter } onMouseLeave={ handleMouseLeave }>
                                                <p className="title" data-descr={ item.title ?? item.name } data-image={ item.image ?? '' }>{ item.title ?? item.name }</p>
                                            </Link>
                                        </div>
                                    </li>
                                ))
                            }
                            {
                                next != null
                                &&
                                    <li className="next-container">
                                        <Button variant="link" onClick={ (e) => { handleDownloadMore() } }>See more...</Button>
                                    </li>
                            }
                        </ul>
                    </div>
                </Block>
            )
        :
            (
                error == true
                &&
                    <Error categorykey={ categorykey } />
            )
    );
};

export default List;