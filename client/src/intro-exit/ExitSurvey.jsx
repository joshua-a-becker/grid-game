import { usePlayer } from "@empirica/core/player/classic/react";
import React, { useState } from "react";
import { Alert } from "../components/Alert.jsx";
import { Button } from "../components/Button.jsx";

export function ExitSurvey({ next }) {
  const labelClassName = "block text-sm font-medium text-gray-700 my-2";
  const inputClassName =
    "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-empirica-500 focus:border-empirica-500 sm:text-sm";
  const player = usePlayer();

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [race, setRace] = useState("");
  const [education, setEducation] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    player.set("exitSurvey", {
      age,
      gender,
      race,
      education,
    });
    next();
  }

  function handleEducationChange(e) {
    setEducation(e.target.value);
  }

  return (
    <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/*<Alert title="Bonus">
        <p>
          Please submit the following code to receive your bonus:{" "}
          <strong>{player.id}</strong>.
        </p>
        <p className="pt-1">
          Your final <strong>bonus</strong> is in addition of the{" "}
          <strong>1 base reward</strong> for completing the HIT.
        </p>
      </Alert>*/}

      <form
        className="mt-12 space-y-8 divide-y divide-gray-200"
        onSubmit={handleSubmit}
      >
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Exit Survey
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Please answer the following short survey. You do not have to
                provide any information you feel uncomfortable with.
              </p>
            </div>

            <div className="space-y-8 mt-6 max-w-xs">
              <div>
                <label htmlFor="age" className={labelClassName}>
                  Age
                </label>
                <div className="mt-1">
                  <input
                    id="age"
                    name="age"
                    type="number"
                    autoComplete="off"
                    className={inputClassName}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="gender" className={labelClassName}>
                  Gender
                </label>
                <div className="mt-1">
                  <select
                    id="gender"
                    name="gender"
                    className={inputClassName}
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-Binary">Non-Binary</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="race" className={labelClassName}>
                  Race
                </label>
                <div className="mt-1">
                  <select
                    id="race"
                    name="race"
                    className={inputClassName}
                    value={race}
                    onChange={(e) => setRace(e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="White">White</option>
                    <option value="Black">Black</option>
                    <option value="Asian">Asian</option>
                    <option value="Hispanic or Latino/a">Hispanic or Latino/a</option>
                    <option value="Middle Eastern">Middle Eastern</option>
                    <option value="Multiracial">Multiracial</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClassName}>
                  Highest Education Qualification
                </label>
                <div className="grid gap-2">
                  <Radio
                    selected={education}
                    name="education"
                    value="high-school"
                    label="High School"
                    onChange={handleEducationChange}
                  />
                  <Radio
                    selected={education}
                    name="education"
                    value="bachelor"
                    label="US Bachelor's Degree"
                    onChange={handleEducationChange}
                  />
                  <Radio
                    selected={education}
                    name="education"
                    value="master"
                    label="Master's or higher"
                    onChange={handleEducationChange}
                  />
                  <Radio
                    selected={education}
                    name="education"
                    value="other"
                    label="Other"
                    onChange={handleEducationChange}
                  />
                </div>
              </div>

              <div className="mb-12">
                <Button type="submit">Submit</Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export function Radio({ selected, name, value, label, onChange }) {
  return (
    <label className="text-sm font-medium text-gray-700">
      <input
        className="mr-2 shadow-sm sm:text-sm"
        type="radio"
        name={name}
        value={value}
        checked={selected === value}
        onChange={onChange}
      />
      {label}
    </label>
  );
}
