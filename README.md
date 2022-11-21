# 🧑‍⚖️ Sue Your Landlord

Visit https://www.sueyourlandlord.org/

**Team Members:**<br/>
Débora Oliveira (https://github.com/debOliveira)<br/>
Max Hochlenert (https://github.com/drdelayismysenpai)<br/>
Moritz Makowski (https://github.com/dostuffthatmatters)<br/>
Ojas Mandlekar (https://github.com/ojas121).

## Inspiration

Renting in Munich can be chaotic. You don't choose an apartment; an apartment chooses you. With this comes, as usual, **lots of opportunists taking unfair advantage of tenants in need of a roof over their heads.** We want to stop this. There are laws protecting tenants in this city, but we want to make the enforcement of these laws accessible in order to help create a fairer rental market.

![SueYourLandlord_Pitch_page-0002](https://user-images.githubusercontent.com/29046316/202885683-a105b22d-0dc4-44fb-aa72-2957ee8a3437.jpg)

## What it does

It takes the information you have available on your rental property in order to **estimate your maximum lawful rent and helps you take steps towards reaching that amount with your payments**. We then allow the tenants to submit their case to us for further processing and, with the help of lawyers, take further steps, including, for example, taking a landlord to court. This work will be financed by taking a cut of the savings from successful cases.

![SueYourLandlord_Pitch (1)_page-0003](https://user-images.githubusercontent.com/29046316/202933248-86500cc5-488b-4001-9764-38595574b842.jpg)

## How we built it

We used the data from the Mietspiegel and geo-data from the [Open Data project](https://opendata.muenchen.de/). Using this, along with the rental laws and some statistics, we can calculate potential maximum rents for apartments. The web app was built using React.

## Challenges we ran into

1. The primary challenge during the course of this project was with data. One of the most important pieces of data was the "quality" of a neighbourhood, which was [only available presented on a map](https://2019.mietspiegel-muenchen.de/wohnlagenkarte/). This data, however, was not available to us in a raw format, rendering any processing on our side almost impossible. This led us to have to try to create dummy data in a standardised format, allowing the real data to be connected to the system with minimal effort once available.

2. Another issue we ran into was with the data presented in the [Mietspiegel](https://2021.mietspiegel-muenchen.de/broschueren/Mietspiegel_2021_Broschuere.pdf) itself. It involved a lot of convoluted calculations that were quite difficult to extract data out of. There were multiple interpretations and presentations of the same data but no access to the underlying ground data that we would have liked to have.

## Accomplishments that we're proud of

-   Fighting capitalism...
-   Also, maybe a rent reduction for ourselves :wink:

## What we learned

Programming while drinking beer and enjoying free food :blue_heart: Long live HackaTUM!

## What's next!

Give us data! For example, we can overlay other relevant pollution maps (air or noise) and see how eligible you are to request a rental discount for environmental damage. Who knows, we will expand to your city next :smile:
