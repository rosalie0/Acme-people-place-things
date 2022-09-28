module.exports = (people, places, things) => `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="stylesheet" href="/style.css" />
		<title>Purchase Souvenir</title>
	</head>
	<body>
  <form method='POST' action="/">
            <select name='personId'>
              ${people
								.map(
									(person) => `
                    <option value=${person.id}>
                      ${person.name}
                    </option>
                  `
								)
								.join('')}
            </select>

            <select name='placeId'>
              ${places
								.map(
									(place) => `
                    <option value=${place.id}>
                      ${place.name}
                    </option>
                  `
								)
								.join('')}
            </select>

            <select name='thingId'>
									${things.map(
										(thing) => `
									<option value=${thing.id}>
										${thing.name}
									</option>`
									)}
						</select>

            <button>Purchase</button>
          </form>
  </body>
</html>

`;
