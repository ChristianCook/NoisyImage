# NoisyImage

A jQuery plugin that adds animated noise to an image.

## Demo

You can try the [interactive demo](http://cook.as/noisyImage/).

## Dependency

-   [jQuery](https://github.com/jquery/jquery)

## Optional dependency

-   [jQueryNoisy](https://github.com/DanielRapp/Noisy) 

## Install

Download the script and link to the local script:
````html
<script src="jquery.noisyimage.min.js">
````

## Usage

An example showing all the parameters:

````javascript
$('IMG').noisyImage({
    image: 'noise.png'
    opacity: 0.2,
    scale: 1.2,
    speed: 5
});
````

An example showing all the parameters when used with jquery.Noisy

````javascript
$('IMG').noisyImage({
    opacity: 0.2,
    scale: 1.2,
    speed: 5,
    intensity: 0.8,
    size: 250,
    monochrome: true,
    randomColors: true,
    colorChannels: [0, 255],
    fallback: 'noise.png',
    disableCache: false
});
````

See [jQueryNoisy usage](https://github.com/DanielRapp/Noisy#usage) for information about the jQueryNoisy options.
