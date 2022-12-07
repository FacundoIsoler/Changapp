
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { filterByCategory, getCategories } from "../../actions";
//import Cards from "./Cards";


export function FilterByCategory({index}) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories())
    }, []);

    const categories = useSelector(state => state.categories);

    console.log(index)
    const [categoryValue, setCategoryValue] = useState();
   


    function handleChange(e) {
        
        e.preventDefault();
        if(e.target.value === "default") {
            return dispatch(filterByCategory(0))} 
        else dispatch(filterByCategory(e.target.value))

    }
    
    if (categories && categories.length > 1) {
        return (
            <div>
                <label>Filtrar por categoría: </label>
                <select class="form-select" aria-label="Default select example" onChange={(e) => handleChange(e)}>
                    <option value="default" onClick={(e) =>{
                            index(1);
                        }}>
                        -- Selecciona una categoría --
                    </option>
                    {categories.map(category => {
                        return <option key={category.id} value={category.id} onClick={(e) =>{
                            index(1);
                        }}>{category.name}</option>
                    })}
                </select>
            </div>
        )
    } else {
        return (<> Loading Category Filter</>)
    }

}
