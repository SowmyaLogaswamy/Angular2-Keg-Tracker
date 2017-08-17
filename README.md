# Keg Tracking System
A web page that allows user to keep track of kegs:

## User stories
* As a patron, I want to see a list/menu of all available kegs. For each keg, I need to see its `name`, `brand`, `price` and `alcoholContent` - `DONE`
* As an employee, I want to fill out a form when I tap a new keg to add it to the list. (Don't worry about authenticating employee user accounts yet.) - `DONE`
* As an employee, I want the option to edit a keg's properties after entering them just in case I make a mistake. - `DONE`
* As a patron and/or employee, I want to see how many pints are left in a keg. (Hint: A full keg has roughly 124 pints). - `DONE`
* As an employee, I want to be able to click a button next to a keg whenever I sell a pint of it. This should decrease the number of pints left by 1. - `DONE`
* As an employee, I want to be able to see kegs with less than 10 pints left so I can be ready to change them. - `DONE`
* As a patron, I want to have kegs prices to be color-coded for easy readability. Perhaps based on their price (greater or less than $5 per pint, perhaps) or the particular style of beer or kombucha. - `DONE`
* As a patron, I want to use the alcohol content property to display stronger beers differently than weaker beers. - `DONE`

## Instructions for setup

## Application Structure
Model for export (in `app/keg.model.ts`)

```
export class Keg {
  public pints: number = 124;
  constructor(public name: string, public brand: string,
    public price: number, public alcoholContent: number) { }
}
```

Model, module and components are as follows:

```
Keg Tracker Application
└─ Keg model (app/keg.model.ts)
└─ App module (app/app.module.ts)
    └── App component (app/app.component.ts)
        ├── KegList component (app/keg-list.component.ts)
        ├── EditKeg component (app/edit-keg.component.ts)
        └── NewKeg component (app/new-keg.component.ts)
```
## Steps to take to create

* Create a project directory named `angular2-keg-tracker`
* `cd` into the top level and touch an `index.html` file.
* Copy the following into that file and save:
```
<html>
  <head>
    <title>Angular 2 - Keg Tracker</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="build/js/vendor.min.js"></script>
    <link rel="stylesheet" href="build/css/vendor.css">
    <!-- 1. Load libraries -->
     <!-- Polyfill(s) for older browsers -->
    <script src="node_modules/core-js/client/shim.min.js"></script>
    <script src="node_modules/zone.js/dist/zone.js"></script>
    <script src="node_modules/reflect-metadata/Reflect.js"></script>
    <script src="node_modules/systemjs/dist/system.src.js"></script>
    <!-- 2. Configure SystemJS -->
    <script src="systemjs.config.js"></script>

    <link rel="stylesheet" href="build/css/styles.css">
    <script>
      System.import('app').catch(function(err){ console.error(err); });
    </script>
  </head>
  <!-- 3. Display the application -->
  <body>
    <app-root>Loading...</app-root>
  </body>
</html>
```
* Again at the top level, touch `package.json`, copy the following into it and save:
```
{
  "name": "angular2-keg-tracker",
  "version": "1.0.0",
  "scripts": {
    "start": "tsc && concurrently \"npm run tsc:w\" \"npm run lite\" ",
    "lite": "lite-server",
    "postinstall": "typings install",
    "tsc": "tsc",
    "tsc:w": "tsc -w"
  },
  "license": "MIT",
  "dependencies": {
    "@angular/common": "2.4.0",
    "@angular/compiler": "2.4.0",
    "@angular/core": "2.4.0",
    "@angular/forms": "2.4.0",
    "@angular/http": "2.4.0",
    "@angular/platform-browser": "2.4.0",
    "@angular/platform-browser-dynamic": "2.4.0",
    "@angular/router": "3.4.0",
    "@angular/upgrade": "2.4.0",
    "bootstrap": "3.3.6",
    "angular-in-memory-web-api": "0.3.1",
    "core-js": "2.4.1",
    "reflect-metadata": "0.1.3",
    "rxjs": "5.0.1",
    "zone.js": "0.7.2",
    "systemjs": "0.19.27"
  },
  "devDependencies": {
    "bower-files": "3.11.3",
    "browser-sync": "2.11.1",
    "del": "2.2.0",
    "gulp": "3.9.1",
    "gulp-concat": "2.6.0",
    "gulp-sass": "2.2.0",
    "gulp-shell": "0.5.2",
    "gulp-sourcemaps": "1.6.0",
    "gulp-uglify": "1.5.3",
    "gulp-util": "3.0.7",
    "concurrently": "3.0.0",
    "lite-server": "2.2.2",
    "typescript": "2.2.2",
    "typings":"1.3.2"
  }
}
```
* Again, at the top level, initialize Bower at command line and accept all default prompts: `$ bower init`
* Create a `.gitignore` at the top level with the following:
```
node_modules/
npm-debug.log
bower_components/
app/*.js
app/*.js.map
.DS_Store
build/
```
* At the top level `mkdir resources/images, resources/js, resources/styles`
* At top level create a `tsconfig.json` file:
```
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "moduleResolution": "node",
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "lib": [ "es2015", "dom" ],
    "noImplicitAny": false,
    "suppressImplicitAnyIndexErrors": true
  }
}
```
* ...and a `gulpfile.js`
```
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var lib = require('bower-files')({
  "overrides":{
    "bootstrap" : {
      "main": [
        "less/bootstrap.less",
        "dist/css/bootstrap.css",
        "dist/js/bootstrap.js"
      ]
    }
  }
});

var utilities = require('gulp-util');
var buildProduction = utilities.env.production;
var del = require('del');
var browserSync = require('browser-sync').create();
var shell = require('gulp-shell');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

////////////////////// TYPESCRIPT //////////////////////


gulp.task('tsClean', function(){
  return del(['app/*.js', 'app/*.js.map']);
});

gulp.task('ts', ['tsClean'], shell.task([
  'tsc'
]));

////////////////////// BOWER //////////////////////


gulp.task('jsBowerClean', function(){
  return del(['./build/js/vendor.min.js']);
});

gulp.task('jsBower', ['jsBowerClean'], function() {
  return gulp.src(lib.ext('js').files)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('cssBowerClean', function(){
  return del(['./build/css/vendor.css']);
});

gulp.task('cssBower', ['cssBowerClean'], function() {
  return gulp.src(lib.ext('css').files)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('bower', ['jsBower', 'cssBower']);

////////////////////// SASS //////////////////////

gulp.task('sassBuild', function() {
  return gulp.src(['resources/styles/*'])
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css'));
});

////////////////////// SERVER //////////////////////


gulp.task('serve', ['build'], function() {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });
  gulp.watch(['resources/js/*.js'], ['jsBuild']); // vanilla js changes, reload.
  gulp.watch(['*.html'], ['htmlBuild']); // html changes, reload.
  gulp.watch(['resources/styles/*.css', 'resources/styles/*.scss'], ['cssBuild']);      gulp.watch(['app/*.ts'], ['tsBuild']); // typescript files change, compile then reload.
});

gulp.task('jsBuild', function(){
  browserSync.reload();
});

gulp.task('htmlBuild', function(){
  browserSync.reload();
});

gulp.task('cssBuild', ['sassBuild'], function(){
  browserSync.reload();
});

gulp.task('tsBuild', ['ts'], function(){
  browserSync.reload();
});

////////////////////// GLOBAL BUILD TASK //////////////////////

gulp.task('build', ['ts'], function(){
  // we can use the buildProduction environment variable here later.
  gulp.start('bower');
  gulp.start('sassBuild');
});
```
* On the command line, `mkdir app`
* Touch `app/app.component.ts` and add the following:
```
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <h1>Keg Tracker</h1>
  `
})

export class AppComponent {

}
```
* Touch `app/app.module.ts` and add the following:
```
import { NgModule }      from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { FormsModule }   from '@angular/forms';

@NgModule({
  imports: [ BrowserModule,
                  FormsModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
```
* Touch `app/main.ts` and add the following:

```
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

const platform = platformBrowserDynamic();

platform.bootstrapModule(AppModule);
```
* Back at the top level, we'll need a `systemjs.config.js`

```
/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',
      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      // other libraries
      'rxjs':                       'npm:rxjs',
      'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'angular2-in-memory-web-api': {
        main: './index.js',
        defaultExtension: 'js'
      }
    }
  });
})(this);
```
* At the command line, run:
1. $ npm install
2. $ bower install
3. $ gulp build
4. $ gulp serve

* In the browser, navigate to *localhost:3000*

* `CTRL C` in the command line to stop the server and install bootstrap: `$ bower install bootstrap --save`

* `$ gulp serve` again

* In `app/app.component.ts`, surround the single line of HTML in the template with a bootstrap 'container' class.

* Create `app/keg-list.component.ts`:
```
import { Component } from '@angular/core';

@Component({
  selector: 'keg-list',
  template: `
  `
})

export class KegListComponent {

}
```
* Edit `app/app.module.ts` to import and declare keg-list component:
```
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { FormsModule }  from '@angular/forms';
import { KegListComponent }  from './keg-list.component';


@NgModule({
  imports: [ BrowserModule,
            FormsModule ],
  declarations: [ AppComponent,
                  KegListComponent],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
```

* Add the following to the keg-list component's template:
```
  <ul>
    <li [class]="priceColor(currentKeg)" *ngFor="let currentKeg of childKegList">{{currentKeg.name}} <button (click)="editButtonHasBeenClicked(currentKeg)">Edit!</button></li>
  </ul>
```

*  In the keg-list component (child component) add the priceColor  and editButtonHasBeenClicked methods.
```
  priceColor(currentKeg){
    if (currentKeg.price >= 5){
      return "bg-danger";
    } else {
      return "bg-info";
    }

    editButtonHasBeenClicked(kegToEdit: Keg) {
      this.clickSender.emit(kegToEdit);

    }
  }

```

* In the app component(parent component) add the hard-coded new kegs. Be sure to add Keg objects now to populate list:
```
  kegs: Keg[] = [
    \\add new Keg objects according to the constructor
  ];
```
* In the app component file add the `keg-list` selector under the "Keg Tracker" header in the template:
```
  <keg-list></keg-list>
```

* In the app component AND keg list component files, make sure you have imported BOTH the Component component and the Keg model:
```
import { Component } from '@angular/core';
import { Keg } from './keg.model';

```
* In the keg-list component file, import `Input` as well from core (top line of file after "Component" and a comma), then add the following at the top inside of the `KegListComponent` class:
```
@Input() childKegList: Keg[];
```

* In the app component file, add a sender in the keg-list tags, like so:
```
<keg-list [childKegList]="kegs"></keg-list>
```

* In the keg list component, import `Output` AND `EventEmitter` from core.

* Add the following to the `KegListComponent` class after the `@Input`:
```
@Output() clickSender = new EventEmitter();
```
* In the app component's template, now add another attribute to the `keg-list` tag:
```
(clickSender)="editKeg($event)"
```

* In the app component file, also add `selectedKeg = null;` as a variable at the top inside of the `AppComponent` class and add the following method below the kegs list:
```
  editKeg(clickedKeg) {
    this.selectedKeg = clickedKeg;
  }
```

## Technologies Used
* Angular 2
* Gulp
* Typescript
* Javascript
* HTML
### License
Copyright 2017 Michael Dunlap

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
