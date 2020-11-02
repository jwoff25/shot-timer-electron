# Shot Timer (Electron)

Steel Challenge Japan is a speed shooting competition for airsofters in Japan.
In order to prepare for the tournament, one will often go to a shooting range
to shoot metal plates as practicing in your own home is impractical both from a
cost and logistics perspective. I started this project to create shot timer
configuration compatible for indoors use. The stop plate (the last steel plate
shot in a series of plates that stops the timer) is made of sponge and felt
with a piezoelectric sensor attached to the back of it and placed into an indoor
target so the BBs fall within the box. The sensor is then connected to an Arduino
Uno, with code written in C to output a "1" when it detects a hit. This app then
receives the serial output from the Arduino and stops the timer when a hit is
detected, thus allowing the user to see how fast they shot the target from ready
position (hands by ears).

The target may be on sale in the future, but this app
is open source and you're free to download it for personal use and make your
own sensor setup as long as the serial output is a "1" when hit is detected.
Also right now it's configured to look for an Arduino, but if you're planning
to use a different microcontroller maker then you'll have to change line 9 of
`src/utils/Serial.js` and put in the appropriate manufacturer.

## Technologies

- Electron
- ReactJS
- Node SerialPort

## How To

You can run this in a dev environment, or build it for production.

### Dev

Open two terminals in the root directory and run the following commands:

- npm run start
- npm run electron

### Prod

Run the following command to create a distributable build (file depends on OS):

- npm run pack
