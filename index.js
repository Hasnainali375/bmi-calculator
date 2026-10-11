function bmi(event) {
  event.preventDefault();
  const weightref = document.querySelector("#weight");
  const weight = Number(weightref.value);
  const feetref = document.querySelector("#feet");
  const feet = Number(feetref.value);
  const inchref = document.querySelector("#inch");
  const inch = Number(inchref.value);
  const ageref = document.querySelector("#age");
  const age = Number(ageref.value);
  const genderref = document.querySelector("#gender");
  const gender = genderref.value;
  const heightinmeter = (feet * 12 + inch) * 0.0254;
  const totalInches = feet * 12 + inch;
  const heightInCm = totalInches * 2.54;
  const activityref = document.querySelector("#activity");
  const activitymultiplier = Number(activityref.value);
  const genderoffset = gender === "male" ? 5 : -161;
  const bmr = 10 * weight + 6.25 * heightInCm - 5 * age + genderoffset;
  const tdee = bmr * activitymultiplier;

  const bmi = weight / (heightinmeter * heightinmeter);
  const divref = document.querySelector("#totalbmi");
  let category = "";
  if (bmi < 18.5) {
    category = "you are underweight";
    const targetweight = 18.5 * (heightinmeter * heightinmeter);
    const weighttogain = targetweight - weight;
    const dailysurplus = (weighttogain * 7700) / 180;
    const targetcalories = Math.round(tdee + dailysurplus);
    const dailycarbs = Math.round(targetcalories * 0.55) / 4;
    //linear regression//
    //linear regression//
    const week = 24;
    const w0 = weight; //intercept
    const w1 = weighttogain / week; //slope

    divref.innerHTML = `
        <p><b>Your Total BMI:</b> ${bmi.toFixed(2)} (${category})</p>
        <hr>
        <h3>🤖 AI Health & Regression Prediction</h3>
        <p>Target Weight to Gain: <b>${weighttogain.toFixed(1)} kg</b></p>
        
        <p><b>🥗 Daily Nutrition Target:</b></p>
        <ul>
            <li>Daily Calories: <b>${targetcalories} kcal/day</b></li>
            <li>Daily Carbohydrates: <b>${dailycarbs} g/day</b></li>
        </ul>

        <p><b>📈 Linear Regression Model:</b></p>
        <p>Formula: <i>Weight(t) = ${w0} + ${w1.toFixed(2)} week</i></p>
        <p>Weekly Target Rate (Slope): <b>+${w1.toFixed(2)} kg/week</b></p>
        <p>🎯 6-Month Target Weight: <b>${targetweight.toFixed(1)} kg</b></p>
    `;
  } else if (bmi >= 18.5 && bmi <= 24.9999) {
    category = "you are normal";
    divref.innerHTML = `
            <p><b>Your Total BMI:</b> ${bmi.toFixed(2)} (${category})</p>
            <p>Aap ka wazan normal hai. Maintenance Calories: <b>${Math.round(tdee)} kcal/day</b></p>
        `;
  } else {
    category = "you are overweight";
    divref.innerHTML = `
            <p><b>Your Total BMI:</b> ${bmi.toFixed(2)} (${category})</p>
            <p>Aap overweight hain. TDEE: <b>${Math.round(tdee)} kcal/day</b></p>
        `;
  }
}
