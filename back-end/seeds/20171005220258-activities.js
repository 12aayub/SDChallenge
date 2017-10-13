'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Activities',
      [
        {
          name: 'LEARN Academy (Downtown SD)',
          description: 'Home base. Come here to LEARN.',
          address: '704 J St, San Diego, CA 92101',
          latitude: 32.709536,
          longitude: -117.158021,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'La Jolla Cove (La Jolla)',
          description: 'Small stretch of sand tucked between sandstone cliffs for swimmers, snorkelers & scuba divers. Great area to walk around and enjoy the ocean, although on some days the odor of seals and sea lions can be a bit much. Go check out the shops of downtown La Jolla afterward!',
          address: '1160 Coast Blvd, La Jolla, CA 92037',
          latitude: 32.735073,
          longitude: -117.148412,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Hillcrest Farmer\'s Market (Hillcrest)',
          description: 'Visit the Hillcrest Farmer\'s Market on Sunday. If you\'re interest in other farmer\'s markets, look up Little Italy, Carlsbad Village, and North Park!',
          address: '3960 Normal St, San Diego, CA 92103',
          latitude: 32.75055,
          longitude: -117.1492965,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Tacos El Gordo (Chula Vista)',
          description: 'Authentic Tijuana tacos in Chula Vista. Be sure to try the adobada/al pastor!',
          address: '689 H St, Chula Vista, CA 91910',
          latitude: 32.6301861,
          longitude: -117.0932447,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Spruce Street Suspension Bridge (Park West)',
          description: 'An inconspicuous charming footbridge beloved by San Diego locals. The Spruce Street Suspension Bridge was built in 1912 by the City of San Diego, and was designed by Edwin Capps. The bridge was designed as a pedestrian by-way for the local neighborhoods to the Fourth and Fifth Avenue trolley stops.',
          address: 'Spruce St 1st Ave, San Diego, CA 92103',
          latitude: 32.7386961,
          longitude: -117.1661019,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Hotel del Coronado (Coronado)',
          description: 'A historic beachfront hotel in the city of Coronado. It is the second largest wooden structure in the United States (after the Tillamook Air Museum in Tillamook, Oregon) and was designated a National Historic Landmark in 1977 and a California Historical Landmark in 1970. When it opened in 1888, it was the largest resort hotel in the world.',
          address: '1500 Orange Ave, Coronado, CA 92118',
          latitude: 32.7107368,
          longitude: -117.1558866,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'The Flower Fields (Carlsbad)',
          description: 'The Flower Fields is a flower garden found on the Carlsbad Ranch in Carlsbad, California. With nearly fifty acres of Giant Tecolote Ranunculus flowers, it opens up once a year in spring from March 1 through May 10.',
          address: '5704 Paseo Del Norte, Carlsbad, CA 92008',
          latitude: 33.1230447,
          longitude: -117.3175875,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Gaslamp Quarter (Downtown SD)',
          description: 'The Gaslamp Quarter is a lively downtown neighborhood, known for its nightlife. Clubs, dive bars and cocktail lounges draw a young crowd, while theaters have diverse programs of music, comedy and drama. There\'s a mix of chain and independent restaurants in the area, with many global options.',
          address: '600 Fifth Avenue, San Diego, CA 92101',
          latitude: 32.7119326,
          longitude: -117.1604126,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Balboa Park (Downtown SD)',
          description: 'Balboa Park is a 1,200-acre urban cultural park with museums, theaters, and the San Diego Zoo. Plenty of open space areas, natural vegetation zones, green belts, gardens, and walking paths!',
          address: '2250 Pan American Rd E, San Diego, CA 92101',
          latitude: 32.731206,
          longitude: -117.150347,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Black\'s Beach (La Jolla)',
          description: 'A secluded section of Torrey Pines State Beach beneath the bluffs of Torrey Pines in La Jolla. Black’s Beach is known as a nude beach, but officially nudity is allowed only on the northern portion. This is because the northern portion of Black\'s Beach is owned and managed by the California Department of Parks and Recreation, while the southern portion of the beach (officially known as Torrey Pines City Beach) is jointly owned by the city of San Diego and the state park and is managed by the city of San Diego, which does not permit nudity.',
          address: '2800 Torrey Pines Scenic Dr, La Jolla, CA 92037',
          latitude: 32.8898837,
          longitude: -117.2511938,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'The Bier Garden (Encinitas)',
          description: 'If you want to drink SoCal craft beer, make a stop at Bier Garden! All 32 tap handles feature beers from Southern California--they also have a retro cocktail menu. In terms of food, you\'ll be able to enjoy California coastal, local, and bier infused cuisine. After a couple drinks, walk around and enjoy the prototypical southern ambience. Find Moonlight Beach and watch the sunset!',
          address: '641 S Coast Highway 101, Encinitas, CA',
          latitude: 33.0441042,
          longitude: -117.2933546,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Menya Ultra (Convoy St)',
          description: 'The best ramen in San Diego, if you\'re willing to endure the inescapable hour-plus wait.',
          address: '8199 Clairemont Mesa Blvd m, San Diego, CA 92111',
          latitude: 32.8322319,
          longitude: -117.1470856,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Las Americas Outlet Mall (San Ysidro)',
          description: 'Large mall at the border of San Diego and Tijuana. Check out the border wall and the staggering amount of traffic on both sides. If you brought your passport, plan a day in Tijuana--eat lunch at Avenida Revolucion!',
          address: '4211 Camino De La Plaza, San Diego, CA 92173',
          latitude: 32.5438314,
          longitude: -117.0408468,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Cabrillo National Monument (Point Loma)',
          description: 'This historic lighthouse & national monument offers a storied history & views all the way to Mexico.',
          address: '1800 Cabrillo Memorial Dr, San Diego, CA 92106',
          latitude: 32.673631,
          longitude: -117.241105,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    )
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('Activities', null, {})
    }
  }
