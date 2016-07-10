import ImageDifferModes from 'bitbucket/internal/image-differ/image-differ-modes';
import Differ from 'bitbucket/internal/image-differ/image-differ';
import _ from 'lodash';
import $ from 'jquery';

function div (className, extraHtml) {
    return function () {
        return `<div class="${className}">${extraHtml || ''}</div>`;
    };
}

window.bitbucket = {
    component: {
        imageDiffer: {
            opacitySlider: div('opacity-slider-container', '<input type="range"/>'),
            imageContainer: div('image-container'),
            splitContainer: div('split-container')
        }
    }
};

var stashLogo128 = "data:image/png;base64,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";
var bitbucketLogo = "data:image/png;base64,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";

QUnit.module('Tests for image-differ', {
    beforeEach: function () { },
    afterEach: function () {
        this.reset();
    },
    reset: function () {
        this.differ && this.differ.destroy();
        $(document.body).empty();
    },
    differFor: function (sinceImg, untilImg) {
        this.reset();

        var $f = $('<div></div>').appendTo(document.body);
        $f.append('<div class="image-differ-toolbar"></div>');
        $f.append('<div class="since-revision"><h5>Since</h5><img src="' + sinceImg + '" /></div>');
        $f.append('<div class="until-revision"><h5>Until</h5><img src="' + untilImg + '" /></div>');
        this.differ = new Differ($f);
        return this.differ;
    }
});

function initTest (imgA, imgB, theEnabledModes) {
    return function (assert) {
        var differ = this.differFor(imgA, imgB);
        var promise = differ.init();
        assert.ok(promise);
        assert.equal(typeof promise.then, 'function');

        var done = assert.async();
        promise.then(function (enabledModes) {
            assert.deepEqual(enabledModes, theEnabledModes, 'Only same size images enable all modes');
            done();
        }, function () {
            assert.ok(false, 'init failed: ' + arguments);
            done();
        });
    };
}

QUnit.test('Differ init - same size', initTest(stashLogo128, stashLogo128, _.values(ImageDifferModes)));
QUnit.test('Differ init - different size', initTest(stashLogo128, bitbucketLogo, [ImageDifferModes.TWO_UP]));

QUnit.test('Switch modes', function (assert) {
    var differ = this.differFor(stashLogo128, stashLogo128);
    var promise = differ.init();
    var done = assert.async();

    promise.then(function () {
        differ.setMode(ImageDifferModes.BLEND);
        assert.ok($('.opacity-slider-container input[type=range]').length, 'Blend adds what it needs');

        differ.setMode(ImageDifferModes.TWO_UP);
        assert.ok(!$('.opacity-slider-container').length, 'Blend cleans up');

        differ.setMode(ImageDifferModes.SPLIT);
        assert.ok($('.split-container').length, 'Split adds what it needs');

        differ.setMode(ImageDifferModes.BLEND);
        assert.ok(!$('.split-container').length, 'Split cleans up');
        assert.ok($('.opacity-slider-container input[type=range]').length, 'Blend adds what it needs');

        differ.setMode(ImageDifferModes.TWO_UP);
        assert.ok(!$('.opacity-slider-container').length, 'Blend cleans up');

        differ.setMode(ImageDifferModes.SPLIT);
        assert.ok($('.split-container').length, 'Split adds what it needs');

        differ.destroy();
        assert.ok(!$('.split-container').length, 'Split cleans up');

        done();
    });
});
