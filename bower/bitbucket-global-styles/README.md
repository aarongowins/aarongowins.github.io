# bitbucket-global-styles

This component contains shared LESS variables and mixins used by shared Bitbucket Server/Cloud front-end components.
AUI variables are added as needed, and updated if necessary if upstream AUI updates the variable values. This
component is released according to the semantic versioning rules below.

## Installation

```
> bower install --save bitbucket-global-styles
```

## Usage

When developing a Bitbucket UI (BUI) Shared Component, adding this component as a dependency allows the use of common
AUI/ADG colours, variables and convenience LESS mixins.

## Developing

This is a Bitbucket UI (BUI) Shared Component. It follows the same development patterns as other BUI components.

For more information, see [Development on a Bitbucket UI Shared Component](https://extranet.atlassian.com/x/gCiUkw)

Please also follow [these guidelines](https://extranet.atlassian.com/display/BB/Bitbucket+UI+Shared+Component+API+Guidelines) during your development.

## Semantic Versioning

MAJOR

- renaming of LESS variable names
- changing of LESS variable values
- removal of LESS variable

MINOR

- adding a new LESS variable (or copying from AUI)

PATCH

- changes to anything but LESS e.g. readme files, comments


## Mapping between bitbucket-global-styles and AUI version

| Bitbucket Global Styles Version | AUI version |
| :------------------------------ | :---------- |
| 1.0.0                           | 5.8.11      |
| 1.1.0                           | 5.8.11      |
| 1.2.0                           | 5.8.11      |
| 1.3.0                           | 5.8.11      |
| 1.4.0                           | 5.8.11      |


## How to release

1. Update `bower.json` to a new version number (use [Semantic Versioning](http://semver.org/)). See above for how this applies to LESS styles.
2. (optional) Update the AUI compatibility table in this file if updating all styles to match corresponding values in AUI
3. `git commit` your changes.
4. `git tag {version}` to label this commit as a given version of the component.
5. `git push && git push --tags` to push both your commit and your tag to the central repository.