import React from 'react';
import { Routes, Route , Navigate , useLocation } from 'react-router-dom';

import Categories from './../features/Categories';
import List from './../features/List';
import Item from './../features/Item';
import Favorites from './../features/Favorites';
import Developer from './../features/Developer';



const Main = React.memo((props) => {
    let location = useLocation();

    return (
        <main className={ props.isLoading == true ? 'isLoading' : '' }>
            <Routes>
                <Route path="/" element={ <Navigate to="/categories/list" /> } />
                <Route path="/categories/list" element={ <React.Suspense fallback={<></>}> <Categories { ...props } key="categories" /> </React.Suspense> } />
                <Route path="/categories/:categorykey/list" element={ <React.Suspense fallback={<></>}> <List { ...props } key={ location.pathname } /> </React.Suspense> } />
                <Route path="/categories/:categorykey/:itemkey" element={ <React.Suspense fallback={<></>}> <Item { ...props } key={ location.pathname } /> </React.Suspense> } />
                <Route path="/favorites" element={ <React.Suspense fallback={<></>}> <Favorites { ...props } /> </React.Suspense> } />
                <Route path="/developer" element={ <React.Suspense fallback={<></>}> <Developer { ...props } /> </React.Suspense> } />
            </Routes>
        </main>
    );
});

export default Main;
