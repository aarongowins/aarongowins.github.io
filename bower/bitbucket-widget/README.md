# bitbucket-widget

> Lifecycled widget for Bitbucket

## Installation

```
> bower install --save bitbucket-widget
```

## Usage

To use the bitbucket widget, you'll want to inherit from it when creating your class.

ES6:

```js
class MyWidget extends BitbucketWidget {
    constructor (options) {
        super(options);
        ...
    }
    myMethod () { ... }
}
MyWidget.defaults = { foo: 'foo' };

// A common pattern for widgets is to pass in a HTMLElement to the constructor of a widget.
// In this case, you only pass along the `options` to the `super()` method and you 
// *must* provide a constructor method in your class because the default constructor 
// will pass along all arguments to `super()`
class MyWidget extends BitbucketWidget {
    constructor (el, options) {
        super(options);
        this.$el = $(el);
    }
}
```

ES5:

```js
function MyWidget(options){ 
    BitbucketWidget.call(this, options);
}
MyWidget.prototype = Object.create(BitbucketWidget.prototype);
MyWidget.prototype.constructor = MyWidget;

MyWidget.defaults = { ... };
MyWidget.prototype.myMethod = function () { ... };
```

## Developing

This is a Bitbucket UI (BUI) Shared Component. It follows the same development patterns as other BUI components.

For example, to run linting and compile output as you develop, you can run:

```
> grunt
```

To run linting checks:

```
> grunt lint
```

To run tests:

```
> grunt test
```

For more information, see [Development on a Bitbucket UI Shared Component](https://extranet.atlassian.com/x/gCiUkw)

Please also follow [these guidelines](https://extranet.atlassian.com/display/BB/Bitbucket+UI+Shared+Component+API+Guidelines) during your development.

## Releasing a new version

1. Ensure your changes are unit tested!!
1. Update `bower.json` to a new version number (use Semantic Versioning to choose the correct next version)
1. Ensure the /dist has been populated by running `grunt release`.
1. `git commit` your changes.
1. `git tag {version}` to label this commit as a given version of the component.
1. `git push && git push --tags` to push both your commit and your tag to the central repository.

## Changes


### 0.1.x

#### 0.1.2

Re-add bower ignores that were removed in 0.1.1

#### 0.1.1

Loosened dep on lodash to be compatible with 3.8.0

#### 0.1.0

Initial release
