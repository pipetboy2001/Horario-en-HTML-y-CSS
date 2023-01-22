/**
 * Guide here: http://steamcommunity.com/sharedfiles/filedetails/?id=837435817
 * Feel free to learn! ^_^
 * Licensed under CC-BY 4.0
 * -- Michael Fedora, 2017
 */

var tick = 0;
/* must be before you register the audio listener */
if (!window.wallpaperRegisterAudioListener) {
    var wallpaperAudioInterval = null;
    window.wallpaperRegisterAudioListener = function (callback) {
        if (wallpaperAudioInterval) {
            // clear the older interval 
            clearInterval(_wallpaperAudioInterval);
            wallpaperAudioInterval = null;
        }

        // set new interval
        let data = [];
        wallpaperAudioInterval = setInterval(function () {
            tick += 0.050;
            if (tick > 2 * Math.PI) tick -= 2 * Math.PI;
            for (let i = 0; i < 64; i++) {
                let v = Math.abs(Math.sin(tick + i * 81.5));
                data[i] = v;
                data[i + 64] = v;
            }
            callback(data);
        }, 33); // wallpaper engine gives audio data back at about 30fps, so 33ms it is
    };
}

var glob = {
    color1: 'aqua',
    color2: 'lime',
    scale: 12,
    offset: 50,
    bloom: true,
    bloomRadius: 8,
    filter: true,
    normalize: true,
    advanceSmooth: false,
    bgcolor: '#222',
    bgvideo: '',
    bgimage: '',
    bgpixelated: false,
    fpsInterval: 33.333, // I can add a thing to "duplicate" instead of stretch the audio, i.e. up samples, iterate by two, something like that
}

window.wallpaperPropertyListener = {
    applyUserProperties: function (properties) {
        if (properties.color1) glob.color1 = parseColor(properties.color1.value);
        if (properties.color2) glob.color2 = parseColor(properties.color2.value);
        if (properties.scale) {
            glob.scale = properties.scale.value;
            pointScale = canvas.height / glob.scale;
        }
        if (properties.offset) glob.offset = properties.offset.value;
        if (properties.bloom) glob.bloom = properties.bloom.value;
        if (properties.bloomRadius) glob.bloomRadius = properties.bloomRadius.value;
        if (properties.filter) glob.filter = properties.filter.value;
        if (properties.normalize) glob.normalize = properties.normalize.value;
        if (properties.advanceSmooth) glob.advanceSmooth = properties.advanceSmooth.value;
        if (properties.bgcolor) {
            glob.bgcolor = parseColor(properties.bgcolor.value);
            let solidEl = document.getElementById('bgcolor');
            solidEl.style.backgroundColor = glob.bgcolor;
        }

        if (properties.bgimage) glob.bgimage = properties.bgimage.value;
        if (properties.bgvideo) glob.bgvideo = properties.bgvideo.value;

        /** @type {HTMLDivElement} */
        const imageEl = document.getElementById('bgimage');
        /** @type {HTMLVideoElement} */
        const videoEl = document.getElementById('bgvideo');
        /** @type {HTMLSourceElement} */
        const videosourceEl = document.getElementById('bgvideosource');

        if (properties.bgimage || properties.bgvideo) {

            if (glob.bgvideo) {
                videoEl.style.display = 'block';
                videosourceEl.setAttribute('src', 'file:///' + glob.bgvideo);
                videosourceEl.setAttribute('type', 'video/webm');
            } else {
                videoEl.style.display = 'none';
                videosourceEl.removeAttribute('src');
                videosourceEl.removeAttribute('type');
            }


            if (glob.bgimage)
                imageEl.style.backgroundImage = 'url("file:///' + (glob.bgvideo || glob.bgimage) + '")';
            else
                imageEl.style.backgroundImage = '';

        } else {
            if (glob.bgimage && !imageEl.style.backgroundImage)
                imageEl.style.backgroundImage = 'url("file:///' + (glob.bgvideo || glob.bgimage) + '")';

            if (glob.bgvideo && !videosourceEl.style.src) {
                videosourceEl.setAttribute('src', 'file:///' + glob.bgvideo);
                videosourceEl.setAttribute('type', 'video/webm');
            }
        }

        if (properties.bgpixelated) {
            glob.bgpixelated = properties.bgpixelated.value;

            imageEl.style.imageRendering = glob.bgpixelated ? 'pixelated' : '';
        }

        first = true;
    },
    applyGeneralProperties: function (properties) {
        if (properties.fps) glob.fpsInterval = 1000 / properties.fps;
    }
};

function parseColor(value) {
    let c = value.split(' ');
    c = c.map(function (a) { return Math.ceil(+a * 255); });
    return 'rgb(' + c.toString() + ')';
}


/** @type {HTMLCanvasElement} */
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

var pointWidth, pointScale;
function calcPointVars() {
    pointWidth = canvas.width / 128;
    pointScale = canvas.height / glob.scale;
}
calcPointVars();

window.addEventListener('resize', function () {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    calcPointVars();
}, false);

var gData;
if (window.wallpaperRegisterAudioListener) {
    window.wallpaperRegisterAudioListener(function (data) { // @todo: fix so less cpu usage :T

        if (glob.normalize) calibratePeakValue(data);
        //if(glob.normalize) oldCalPeak(data);
        if (glob.filter) correctPinkNoise(data);
        if (glob.advanceSmooth) interpolate(data);
        else motionblur(data);

        if (gData == null) {
            gData = data;
            then = Date.now();
            render();
        } else
            gData = data;
    });
}

var nothing = false, first = true;

var now, then, elapsed;
function render() {
    requestAnimationFrame(render);

    now = Date.now();
    elapsed = now - then;
    if (elapsed < glob.fpsInterval) return;
    if (gData == null) return;
    if (nothing == true && first != true) return;
    first = false;

    then = now - elapsed % glob.fpsInterval;

    // clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.shadowBlur = 0;
    ctx.shadowColor = 'black';
    ctx.imageSmoothingEnabled = false;

    //render

    if (glob.imageData)
        ctx.drawImage(glob.imageData, 0, 0, canvas.width, canvas.height)

    drawStereoLine(ctx, canvas.height * (1 - glob.offset * 0.01), pointWidth, pointScale, gData);
    renderLine(ctx, glob.color2);

    drawStereoLine(ctx, canvas.height * (1 - glob.offset * 0.01), pointWidth, -pointScale, gData);
    renderLine(ctx, glob.color1);
}

function drawStereoLine(ctx, center, width, scale, data, idx) {
    let i, x = 0, y = center + scale * data[0] * 0.33;
    ctx.beginPath();
    ctx.moveTo(x, y);
    for (i = 0; i < 63; i++) {
        x += width;
        y = center + scale * data[i];
        ctx.lineTo(x, y);
    }

    x += width;
    y = center + scale * (data[63] + data[127]) * 0.5;
    ctx.lineTo(x, y);
    x += width;
    y = center + scale * data[126];
    ctx.lineTo(x, y);

    x = 128 * width, y = center + scale * data[64] * 0.33;
    ctx.moveTo(x, y);
    for (i = 64; i < 127; i++) {
        x -= width;
        y = center + scale * data[i];
        ctx.lineTo(x, y);
    }
}

function renderLine(ctx, color) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    if (glob.bloom) {
        ctx.shadowBlur = glob.bloomRadius;
        ctx.shadowColor = color;
    }
    ctx.stroke();
}

// I have left the results as I measured them, but if you use them you might want to pay attention to the first value. 
// It represents the correction for the 26hz. For some reason it feels like that value should be lower as it usually has very low values. 
// Just something to be aware of. 
var pinkNoise = [1.1760367470305, 0.85207379418243, 0.68842437227852, 0.63767902570829, 0.5452348949654,
    0.50723325864167, 0.4677726234682, 0.44204182748767, 0.41956517802157, 0.41517375040002,
    0.41312118577934, 0.40618363960446, 0.39913707474975, 0.38207008614508, 0.38329789106488,
    0.37472136606245, 0.36586428412968, 0.37603017335105, 0.39762590761573, 0.39391828858591,
    0.37930603769622, 0.39433365764563, 0.38511504613859, 0.39082579241834, 0.3811852720504,
    0.40231453727161, 0.40244151133175, 0.39965366884521, 0.39761103827545, 0.51136400422212,
    0.66151212038954, 0.66312205226679, 0.7416276690995, 0.74614971301133, 0.84797007577483,
    0.8573583910469, 0.96382997811663, 0.99819377577185, 1.0628692615814, 1.1059083969751,
    1.1819808497335, 1.257092297208, 1.3226521464753, 1.3735992532905, 1.4953223705889,
    1.5310064942373, 1.6193923584808, 1.7094805527135, 1.7706604552218, 1.8491987941428,
    1.9238418849406, 2.0141596921333, 2.0786429508827, 2.1575522518646, 2.2196355526005,
    2.2660112509705, 2.320762171749, 2.3574848254513, 2.3986127976537, 2.4043566176474,
    2.4280476777842, 2.3917477397336, 2.4032522546622, 2.3614180150678];

function correctPinkNoise(data) {
    for (var i = 0; i < 64; i++) {
        data[i] /= pinkNoise[i];
        data[i + 64] /= pinkNoise[i];
    }
    return data;
}

var historyMax = 2;
var recentWeight = 3;

//var rawMax = 0;
//var peakedMax = 0;

var peakHistory = [];
function calibratePeakValue(data) {
    let max = 0;

    for (let i = 0; i < 128; i++)
        if (data[i] > max) max = data[i];
    if (max > 1)
        for (let i = 0; i < 128; i++)
            data[i] /= max;
    //if(max > rawMax) rawMax = max;
    peakHistory.push(Math.min(max, 1));
    if (peakHistory.length > historyMax * 8)
        peakHistory = peakHistory.slice(peakHistory.length - historyMax * 8, historyMax * 8);

    // @todo: fix so quiet songs look quiet and loud songs look loud
    let peakValue = 0;
    for (let i = 0; i < peakHistory.length; i++)
        peakValue += peakHistory[i];
    peakValue /= peakHistory.length;

    nothing = Math.abs(peakValue) <= 0.001;

    //let calibratedMax = 0;
    for (let i = 0; i < 128; i++) {
        data[i] /= peakValue * 0.92 + 0.08;
        //if(data[i] > calibratedMax) calibratedMax = data[i];
    }
    //if(calibratedMax > peakedMax) peakedMax = calibratedMax;

    //document.getElementById('debug1').textContent = "rawMax: " + rawMax + ", peakedMax:" + peakedMax;
    //document.getElementById('debug2').textContent = "calibratedMax: " + calibratedMax + ", peakValue:" + (peakValue);
}

var dataHistory = [];
function dataInterpAverage(i) {
    let v = 0;
    for (let j = 0; j < dataHistory.length; j++) {
        v += dataHistory[j][i] * (j == 0 ? recentWeight : 1);
    }
    return v / (recentWeight + dataHistory.length - 1);
}
function interpolate(data) {
    let cdata = [];
    for (let i = 0; i < 128; i++)
        cdata[i] = data[i];
    dataHistory.push(cdata);
    if (dataHistory.length > historyMax)
        dataHistory = dataHistory.slice(dataHistory.length - historyMax, historyMax);
    for (let i = 0; i < 128; i++)
        data[i] = dataInterpAverage(i);
}

var prevVal;
function motionblur(data) {
    let oldPrevVal = prevVal;
    prevVal = data;
    if (oldPrevVal) {
        for (let i = 0; i < 128; i++)
            data[i] = oldPrevVal[i] * 0.33 + data[i] * 0.67;
    }
}