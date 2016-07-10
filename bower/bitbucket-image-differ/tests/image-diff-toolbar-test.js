import $ from 'jquery';
import _ from 'lodash';
import ImageDifferToolbar from 'bitbucket/internal/image-differ/image-differ-toolbar';
import ImageDifferModes from 'bitbucket/internal/image-differ/image-differ-modes';

var ImageDifferToolbarFixture = '<div><div class="image-differ-toggle">' +
    '<a class="aui-button image-differ-two-up" aria-pressed="true"></a>' +
    '<a class="aui-button image-differ-blend"></a>' +
    '<a class="aui-button image-differ-split"></a>' +
    '</div></div>';


// HACK aui-experimental is busted, so I'm mocking .tooltip https://ecosystem.atlassian.net/browse/AUI-1879
if (!$.fn.tooltip) {
    $.fn.tooltip = function () {
        return this;
    };
}

QUnit.module('Tests for image-differ-toolbar', {
    beforeEach: function () {
        this.toolbar = new ImageDifferToolbar($(ImageDifferToolbarFixture).appendTo(document.body));
    },
    afterEach: function () {
        if (this.toolbar) {
            this.toolbar.destroy();
        }
    },
    clickMode: function (mode) {
        //noinspection JSJQueryEfficiency
        $('.image-differ-' + mode).click();
    }
});

QUnit.test('Adds and removes toolbar to $container', function (assert) {
    //noinspection JSJQueryEfficiency
    assert.ok($('.image-differ-toggle').length);

    this.toolbar.destroy();
    //noinspection JSJQueryEfficiency
    assert.ok(!$('.image-differ-toggle').length);
});

QUnit.test('triggers event when mode clicked - all enabled', function (assert) {
    var newMode;
    var oldMode;
    var fired;
    this.toolbar.on('modeChanged', function (mode) {
        newMode = mode.newMode;
        oldMode = mode.oldMode;
        fired = true;
    });

    this.toolbar.init(_.values(ImageDifferModes));
    assert.equal(oldMode, undefined, 'Old mode is undefined first');
    assert.equal(newMode, ImageDifferModes.TWO_UP, 'TWO_UP event fired on init.');

    this.clickMode(ImageDifferModes.BLEND);
    assert.equal(oldMode, ImageDifferModes.TWO_UP, 'Old mode is correct');
    assert.equal(newMode, ImageDifferModes.BLEND, 'New mode is correct.');

    fired = false;
    this.clickMode(ImageDifferModes.BLEND);
    assert.ok(!fired, "Shouldn't fire when clicking same button.");

    this.clickMode(ImageDifferModes.SPLIT);
    assert.equal(oldMode, ImageDifferModes.BLEND, 'Old mode is correct');
    assert.equal(newMode, ImageDifferModes.SPLIT, 'New mode is correct.');

    this.clickMode(ImageDifferModes.TWO_UP);
    assert.equal(oldMode, ImageDifferModes.SPLIT, 'Old mode is correct');
    assert.equal(newMode, ImageDifferModes.TWO_UP, 'New mode is correct.');
});

QUnit.test('triggers event when mode clicked - two-up enabled', function (assert) {
    var newMode;
    var oldMode;
    var fired;
    this.toolbar.on('modeChanged', function (mode) {
        newMode = mode.newMode;
        oldMode = mode.oldMode;
        fired = true;
    });

    this.toolbar.init([ImageDifferModes.TWO_UP]);
    assert.equal(oldMode, undefined, 'Old mode is undefined first');
    assert.equal(newMode, ImageDifferModes.TWO_UP, 'TWO_UP event fired on init.');

    fired = false;
    this.clickMode(ImageDifferModes.BLEND);
    assert.ok(!fired, "Shouldn't fire when clicking disabled button.");

    fired = false;
    this.clickMode(ImageDifferModes.SPLIT);
    assert.ok(!fired, "Shouldn't fire when clicking disabled button.");

    fired = false;
    this.clickMode(ImageDifferModes.TWO_UP);
    assert.ok(!fired, "Shouldn't fire when clicking same button.");
});

QUnit.test('Can getMode - all enabled', function (assert) {
    this.toolbar.init(_.values(ImageDifferModes));
    assert.equal(this.toolbar.getMode(), ImageDifferModes.TWO_UP, 'starts as two-up mode');
    this.clickMode(ImageDifferModes.BLEND);
    assert.equal(this.toolbar.getMode(), ImageDifferModes.BLEND, 'changes after clicks');
    this.clickMode(ImageDifferModes.SPLIT);
    assert.equal(this.toolbar.getMode(), ImageDifferModes.SPLIT, 'changes after clicks');
    this.clickMode(ImageDifferModes.TWO_UP);
    assert.equal(this.toolbar.getMode(), ImageDifferModes.TWO_UP, 'changes after clicks');
    this.clickMode(ImageDifferModes.TWO_UP);
    assert.equal(this.toolbar.getMode(), ImageDifferModes.TWO_UP, "Doesn't change when clicking same one");
});

QUnit.test('Can getMode - two-up enabled', function (assert) {
    this.toolbar.init([ImageDifferModes.TWO_UP]);
    assert.equal(this.toolbar.getMode(), ImageDifferModes.TWO_UP, 'starts as two-up mode');
    this.clickMode(ImageDifferModes.BLEND);
    assert.equal(this.toolbar.getMode(), ImageDifferModes.TWO_UP, "Doesn't change after clicks");
    this.clickMode(ImageDifferModes.SPLIT);
    assert.equal(this.toolbar.getMode(), ImageDifferModes.TWO_UP, "Doesn't change after clicks");
    this.clickMode(ImageDifferModes.TWO_UP);
    assert.equal(this.toolbar.getMode(), ImageDifferModes.TWO_UP, "Doesn't change after clicks");
    this.clickMode(ImageDifferModes.TWO_UP);
    assert.equal(this.toolbar.getMode(), ImageDifferModes.TWO_UP, "Doesn't change when clicking same one");
});
