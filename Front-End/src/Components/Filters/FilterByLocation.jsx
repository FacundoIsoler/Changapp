import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByLocation, getLocations } from "../../actions";
//import Cards from "./Cards";

import s from "./FilterByLocation.module.css";

export function FilterByLocation() {
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.location);

  useEffect(() => {
    dispatch(getLocations());
  }, [dispatch]);

  function handleChange(e) {
    e.preventDefault();
    dispatch(
      filterByLocation(e.target.value === "default" ? null : e.target.value)
    );
  }

  return (
    <div className={s.general}>
      <label>Filtrar por ubicación:</label>
      <select
        class="form-select"
        aria-label="Default select example"
        onChange={handleChange}
        className={s.select}
      >
        <option value="default">-- Selecciona una ubicación --</option>
        {locations.map((location, i) => {
          return (
            <option key={`location-${i}`} value={location}>
              {location}
            </option>
          );
        })}
      </select>
    </div>
  );
}
