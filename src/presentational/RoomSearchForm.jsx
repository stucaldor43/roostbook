import React from 'react';

const RoomSearchForm = ({changeHandler, saveHandler}) => {
  return (
    <div>Form
      {/* <div>
        <label>Entire Room
          <input type="checkbox" onChange={changeHandler} name='entire' />
        </label>
      </div> */}
      <div>
        <label className="listing-label">Accommodate
            <select className="listing-control" name="accommodate" onChange={changeHandler}>
            <option value={0} selected>Selected...</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6+</option>
          </select>
        </label>
        <label className="listing-label">Bedrooms
          <select className="listing-control" name="bedrooms" onChange={changeHandler}>
            <option value={0} selected>Selected...</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4+</option>
          </select>
        </label>
        <label className="listing-label">Bathrooms
          <select className="listing-control" name="bathrooms" onChange={changeHandler}>
            <option value={0} selected>Selected...</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4+</option>
          </select>
        </label>
      </div>
      <div>
        <button onClick={() => saveHandler()}>Search</button>
      </div>
    </div>
  );
}
export default RoomSearchForm;