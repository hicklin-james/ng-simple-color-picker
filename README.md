# ng-simple-color-picker

Sometimes you don't need or want a full colorpicker in your web application. This directive creates a simple bootstrap that allows you to select from a pre-defined list of colors.

![alt text](https://github.com/hicklin-james/ng-simple-color-picker/screenshots/img1.png "Screenshot")

### Dependencies

1. Bootstrap css (tested with 3.3.7)
2. Angular bootstrap (tested with 2.5.0)
3. Angular (tested with 1.4.0)

No guarantees that this directive will work on other (especially older) versions of the dependencies. Note that **jQuery is not required**.

### Installation

#### Bower
```
bower install ng-simple-color-picker
```

#### Custom
If you don't use bower, you can clone the repository and include the JS and CSS files in the `dist` directory of the root folder.

---

Once you have included the files (either through bower or manually), you need to add the `ngSimpleColderPicker` module to your angular app. You are now ready to use the directive.

### Using the directive

#### Simple use
```
<simple-color-picker ng-model="colorhex" color-format="hex"></simple-color-picker>
```

#### Custom colors
```
<simple-color-picker ng-model="colorhex" color-format="hex" selectable-colors="['#abcdef','#fedcba','#cccccc']"></simple-color-picker>
```

#### Append dropdown to body
```
<simple-color-picker ng-model="colorhex" color-format="hex" color-picker-append-to-body="true"></simple-color-picker>
```

#### RGB output
```
<simple-color-picker ng-model="colorrgb" color-format="rgb"></simple-color-picker>
```

#### HSL output
```
<simple-color-picker ng-model="colorhsl" color-format="hsl"></simple-color-picker>
```

### Default values

All possible directive attributes have default values, shown below.

```
color-format: "hex"
valid values are: "hex", "rgb", or "hsl"

color-picker-append-to-body: "false"
valid values are: "true" or "false"

selectable-colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1', '#bfacc8', '#cfd186']
valid values are: any array of hex, RGB, or HSL values. NO color names allowed (e.g. "red")
```