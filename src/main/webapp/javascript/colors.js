/*
 * A set of functions to work with color.
 * @author Daniil Sorokin <daniil.sorokin@uni-tuebingen.de>
 */

/* Static methods definitions */

/**
 * HSV to RGB color conversion
 *
 * H runs from 0 to 360 degrees
 * S and V run from 0 to 100
 * 
 * Ported from the excellent java algorithm by Eugene Vishnevsky at:
 * http://www.cs.rit.edu/~ncs/color/t_convert.html
 * 
 * @see http://snipplr.com/view/14590
 */
function hsvToRgb(h, s, v) {
    var r, g, b;
    var i;
    var f, p, q, t;
 
    // Make sure our arguments stay in-range
    h = Math.max(0, Math.min(360, h));
    s = Math.max(0, Math.min(100, s));
    v = Math.max(0, Math.min(100, v));
 
    // We accept saturation and value arguments from 0 to 100 because that's
    // how Photoshop represents those values. Internally, however, the
    // saturation and value are calculated from a range of 0 to 1. We make
    // That conversion here.
    s /= 100;
    v /= 100;
 
    if(s == 0) {
        // Achromatic (grey)
        r = g = b = v;
        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }
 
    h /= 60; // sector 0 to 5
    i = Math.floor(h);
    f = h - i; // factorial part of h
    p = v * (1 - s);
    q = v * (1 - s * f);
    t = v * (1 - s * (1 - f));
 
    switch(i) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
 
        case 1:
            r = q;
            g = v;
            b = p;
            break;
 
        case 2:
            r = p;
            g = v;
            b = t;
            break;
 
        case 3:
            r = p;
            g = q;
            b = v;
            break;
 
        case 4:
            r = t;
            g = p;
            b = v;
            break;
 
        default: // case 5:
            r = v;
            g = p;
            b = q;
    }
 
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

/**
 * Converts a separate r,g and b values into a color value.
 * 
 * @param {type} r
 * @param {type} g
 * @param {type} b
 * @returns {String} color
 * @see http://krazydad.com/tutorials/makecolors.php
 */
function RGB2Color(r,g,b)
{
    return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}
/**
 * Converts color component from a numeric value (such as 170) to a hexadecimal 
 * string (such as 'AA').
 * 
 * @param {type} n rgb value
 * @returns {String} Hex value
 * @see http://krazydad.com/tutorials/makecolors.php
 */
function byte2Hex(n)
{
    var nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}

/**
 * 
 * @param {type} hex
 * @returns RGB Array
 * @see http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
 */
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}


/**
 * Generates a set number of distinct colors.
 * 
 * @param {int} count number of distinct colors
 * @returns {Array} array of colors
 * @see http://stackoverflow.com/questions/8987319/distinguishable-color-generation-in-javascript
 */
function distinctColors(count) {
    var colors = [];
    for(hue = 0; hue < 360; hue += 360 / count) {
        colors.push(hsvToRgb(hue, 100, 100));
    }
    return colors;
}


/**
 * Creates a color gradient.
 * 
 * @param {type} frequency1
 * @param {type} frequency2
 * @param {type} frequency3
 * @param {type} phase1
 * @param {type} phase2
 * @param {type} phase3
 * @param {type} center
 * @param {type} width
 * @param {type} len
 * @returns {Array} array of colors
 * @see http://krazydad.com/tutorials/makecolors.php
 */
function makeColorGradient(frequency1, frequency2, frequency3,
                            phase1, phase2, phase3, center, width, len)
{
    var colors = [];
    if (len == undefined)      len = 50;
    if (center == undefined)   center = 128;
    if (width == undefined)    width = 127;
    
    for (var i = 0; i < len; ++i)
    {
        var red = Math.sin(frequency1*i + phase1) * width + center;
        var grn = Math.sin(frequency2*i + phase2) * width + center;
        var blu = Math.sin(frequency3*i + phase3) * width + center;
        colors.push(RGB2Color(red,grn,blu));   
    }
    return colors;
}



function makeColorGradient(frequency1, frequency2, frequency3,
                            phase1, phase2, phase3, center, width, len)
{
    var colors = [];
    if (len == undefined)      len = 50;
    if (center == undefined)   center = 128;
    if (width == undefined)    width = 127;
    
    for (var i = 0; i < len; ++i)
    {
        var red = Math.sin(frequency1*i + phase1) * width + center;
        var grn = Math.sin(frequency2*i + phase2) * width + center;
        var blu = Math.sin(frequency3*i + phase3) * width + center;
        colors.push(RGB2Color(red,grn,blu));   
    }
    return colors;
}

function lightness(color){
    var rgb = hexToRgb(color);
    var value = Math.round(((rgb.r * 299) + (rgb.g * 587) + (rgb.b * 114)) /1000);
    return value;
}

/* Objects definitions */

/**
 * 
 * @param {type} frequency1
 * @param {type} frequency2
 * @param {type} frequency3
 * @param {type} phase1
 * @param {type} phase2
 * @param {type} phase3
 * @returns {colorGenerator}
 */
function ColorGenerator(frequency1, frequency2, frequency3,
                            phase1, phase2, phase3)
{
    this.center = 128;
    this.width = 127;
    this.iteration = 0;
    this.redfrequency = frequency1 == undefined ? 1.666 : frequency1;
    this.grnfrequency = frequency2 == undefined ? 2.666 : frequency2;
    this.blufrequency = frequency3 == undefined ? 3.666 : frequency3;
    this.phase1 = phase1 == undefined ? 0 : phase1;
    this.phase2 = phase2 == undefined ? 0 : phase2;
    this.phase3 = phase3 == undefined ? 0 : phase3;
}

/**
 * 
 * @returns {String}
 */
ColorGenerator.prototype.generateNextColor = function (){
    var red = Math.sin(this.redfrequency*this.iteration + this.phase1) * this.width + this.center;
    var grn = Math.sin(this.grnfrequency*this.iteration + this.phase2) * this.width + this.center;
    var blu = Math.sin(this.blufrequency*this.iteration + this.phase3) * this.width + this.center;
    this.iteration++;
    var color = RGB2Color(red,grn,blu);
    return color;
}
