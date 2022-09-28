module.exports = (people, places, things, souvs) => `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="stylesheet" href="/style.css" />
		<title>Acme People Places Things</title>
	</head>
	<body>
  <h1>Acme People, Places, and Things</h1>
  <div class="ptp-container">

        <div>
          <h2>People</h2>
          <ul>
              ${people.map((person) => `<li>${person.name}</li>`).join('')}
          </ul>
        </div>

      <div>
        <h2>Places</h2>
        <ul>
            ${places.map((place) => `<li>${place.name}</li>`).join('')}
        </ul>
      </div>

      <div>
        <h2>Things</h2>
        <ul>
            ${things.map((thing) => `<li>${thing.name}</li>`).join('')}
        </ul>
      </div>
  </div>

  
  <h2> Souvenir Purchases </h2>
  <ul>
    ${souvs
			.map(
				(souv) =>
					`<li>${souv.person.name} purchased a ${souv.thing.name} in ${souv.place.name}.
          <form method='POST' action='/${souv.id}?_method=DELETE'>
          <button> Delete </button>
          </form>
          </li>`
			)
			.join('')}
  </ul>
  <a href="/purchase"> Purchase a souvenir? </a>
  </body>
</html>
`;
