import { useState } from "react";

function MealForm({ initialFormData, isDisabled, onSubmit }) {
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
      <h2 className="font-extrabold text-4xl lg:text-6xl tracking-tight mb-4">
        <span className="relative">
          To make personal <strong className="text-primary">meals</strong>
        </span>
      </h2>
      <p className="my-2">Fill out the form below to create a new meal.</p>
      <form onSubmit={handleSubmit}>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Cuisine type</span>
          </div>
          <input
            type="text"
            name="cuisineType"
            placeholder="European"
            className="input input-bordered w-full max-w-xs"
            value={formData.cuisineType}
            onChange={handleInputChange}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Pregnancy stage</span>
          </div>
          <select
            name="pregnancyStage"
            className="select select-bordered"
            value={formData.pregnancyStage}
            onChange={handleInputChange}
          >
            <option>First Trimester</option>
            <option>Second Trimester</option>
            <option>Third Trimester</option>
            <option>Not Pregnant</option>
          </select>
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Meal per day</span>
          </div>
          <input
            type="range"
            name="mealCountPerDay"
            className="w-full max-w-xs"
            value={formData.mealCountPerDay}
            onChange={handleInputChange}
            min={1}
            max={5}
            step={1}
          />
          <div className="flex w-full justify-between px-2 text-xs">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">
              Any dietary restrictions, allergies, or food aversions
            </span>
          </div>
          <textarea
            name="allergiesFoodAversionsDietaryRestrictions"
            className="textarea textarea-bordered h-24"
            placeholder="None"
            value={formData.allergiesFoodAversionsDietaryRestrictions}
            onChange={handleInputChange}
          ></textarea>
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Cooking level</span>
          </div>
          <select
            name="cookingLevel"
            className="select select-bordered"
            value={formData.cookingLevel}
            onChange={handleInputChange}
          >
            <option>Easy</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </label>
        <div className="card-actions justify-end mt-6 lg:mt-0">
          <div className="tooltip" data-tip="Paid feature">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isDisabled}
            >
              Get Meal
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default MealForm;
