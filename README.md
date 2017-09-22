# react-intlstrings
Effortless internationalization for React.js. This library lets you define string translations for an internationalized app, and use them within JSX structures in an easy and flexible way.

## Basic usage

```js
import React from 'react';
import * as Intl from 'react-intlstrings';

// Define our strings

Intl.add('en', {
    'WELCOME_MSG': 'Hey there, welcome.'
});

Intl.add('es', {
    'WELCOME_MSG': 'Hola hola. Bienvenido.'
});

// Create an interface for our app

const Str = Intl.lang('en');

// Use it in react
...
render() {
    return (
        <div>
            <h1><Str id="WELCOME_MSG" /></h1>
        </div>
    );
}
...

```

## Lang structure

This lib was created to use with React.js specifically. So, there's some added sugar to make things a bit more fun within our app.

### Messages can be JSX structures

You can return JSX structures as instead of plain strings:

```js
Intl.add('en', {
    LOGIN: <span><strong>Click here</strong> to login</span>
});
```

### Messages can also be functions

Maybe you want a JSX structure that makes some stuff under the hood before returning the result. You can set a stateless component function:

```js
Intl.add('en', {
    SELECTED_SHIRT: props => <span>You have selected a {props.color} shirt!</span>
});

...
render() {
    return (
        <div className="msg"><Str id="SELECTED_SHIT" color="red" /></div>
    );
}
...
```

### Plain function call

What if you want to pass a localized string via props? Or maybe mix it somewhere in a string? The function retured by `Intl.lang()` is actually an overloaded function. It returns JSX when it's called from a JSX structure, and it returns a plain string when it's called directly. So, you can:

```js
Intl.add('en', {
    BUY: 'Buy now',
    HINT: 'Click here plz'
});

...
render() {
    return (
        <a onClick={this.doStuff} title={Str('HINT')}><Str id="BUY" /></a>
    );
}
...
```

### Passing arguments to a plain function

If you define your message as a function, JSX props will be passed as the first argument. But, what happens when you want to define a function but you're not calling it as a component? There's an optional second argument in the plain call to do that.

```js
Intl.add('en', {
    CART: props => `You have ${props.count} item${props.count === 1 ? '' : 's'} in your cart`
});

...
render() {
    const msg = Str('CART', { count: 5 });

    return (
        <div>{msg}</div>
    );
}
...
```

That's pretty much of it.

## Methods

### add(string code, object strings)

Adds a lang collection just like in the examples.

### extend(string code, string newcode, object strings)

Convenience function that'll copy a lang and mix it with the new `strings`. Useful for partial or slight translations.

### lang(string code)

Returns an overloaded function that can be used as a React component or called directly to retrieve a translated string in the specified language.

#### As a React Component

Let's say we store the overloaded function with the name `Str`. We can use it in JSX as with any other component. The only required prop is `id` (or `string`) to pick the message: `<Str id="HELLO" />`. Any other prop is passed to the message if it's a function/component, or ignored otherwise.

#### As a Plain Function

We can call `Str('HELLO')` directly and get our string. If the message was defined as a function, we can pass an optional options object to it, as in `Str('HELLO', { example: true })`.

That's all, folks.
