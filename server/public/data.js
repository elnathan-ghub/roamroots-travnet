/* ============================================================
   RoamRoots TravNet — Shared site data
   Central place for destinations, transport locations,
   attractions, and restaurants used across the search bar
   and other pages. Update here and it reflects everywhere
   that includes this file.
   ============================================================ */

const SITE_DESTINATIONS = [
  "Accra", "Cape Coast", "Cape Coast Castle", "Kakum National Park",
  "Mole National Park", "Wli Waterfalls", "Aburi Gardens", "Nzulezu",
  "Kumasi", "Tamale", "Elmina", "Busua", "Hohoe", "Ho", "Takoradi"
];

const SITE_TRANSPORT_LOCATIONS = [
  "Kotoka International Airport, Accra", "Accra", "Cape Coast", "Kumasi",
  "Tamale", "Wli", "Aburi", "Osu, Accra", "East Legon, Accra",
  "Circle, Accra", "Elmina", "Takoradi"
];

const SITE_ATTRACTIONS = [
  "Cape Coast Castle", "Mole National Park", "Wli Waterfalls",
  "Aburi Gardens", "Nzulezu", "Kakum National Park", "Zimmaziwo Snake Village",
  "Independence Square", "Kwame Nkrumah Mausoleum", "Elmina Castle"
];

const SITE_RESTAURANTS = [
  "Buka Restaurant, Accra", "Chez Clarisse, Accra", "Republic Bar & Grill, Kumasi",
  "Coco Lounge, Cape Coast", "Santoku, Accra", "Osu Night Market, Accra",
  "Chop Bar, Aburi", "KFC, Accra Mall"
];

const GUEST_OPTIONS = [
  "1 Guest",
  "2 Guests",
  "3 Guests — Small Family",
  "4 Guests — Family",
  "5+ Guests — Group"
];

/* Location options per transportation mode — used on the Transportation page
   so pickup/drop-off suggestions match the kind of ride selected. */
const TRANSPORT_MODE_LOCATIONS = {
  "Airport Pickup": [
    "Kotoka International Airport, Accra", "Osu, Accra", "East Legon, Accra",
    "Airport Residential, Accra", "Circle, Accra", "Tema"
  ],
  "Bus": [
    "Accra", "Kumasi", "Cape Coast", "Tamale", "Takoradi", "Ho", "Elmina"
  ],
  "Taxi": [
    "Osu, Accra", "East Legon, Accra", "Circle, Accra", "Airport Residential, Accra",
    "Labadi, Accra", "Madina, Accra", "Kumasi", "Cape Coast"
  ],
  "Car Rental": [
    "Kotoka International Airport, Accra", "Accra City Centre", "Kumasi",
    "Cape Coast", "Takoradi", "Tamale"
  ],
  "Tour Bus": [
    "Accra", "Cape Coast", "Kakum National Park", "Kumasi", "Wli Waterfalls",
    "Mole National Park", "Elmina", "Aburi"
  ]
};
